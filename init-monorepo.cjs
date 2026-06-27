const fs = require('fs');
const path = require('path');

function write(file, content) {
  const dir = path.dirname(file);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(file, content);
}

// Move web app
const webDir = path.join(process.cwd(), 'apps', 'web');
if (!fs.existsSync(webDir)) fs.mkdirSync(webDir, { recursive: true });

for (const name of ['src', 'assets', 'index.html', 'vite.config.ts', 'tsconfig.json']) {
  const srcPath = path.join(process.cwd(), name);
  if (fs.existsSync(srcPath)) {
    fs.renameSync(srcPath, path.join(webDir, name));
  }
}

// Preserve original package.json as apps/web/package.json
const rootPkgRaw = fs.readFileSync('package.json', 'utf8');
write('apps/web/package.json', rootPkgRaw);

// 1. Root package.json
write('package.json', JSON.stringify({
  "name": "derivo-workspace",
  "private": true,
  "scripts": {
    "dev": "turbo run dev",
    "build": "turbo run build",
    "lint": "turbo run lint",
    "typecheck": "turbo run typecheck",
    "test": "turbo run test",
    "format": "prettier --write \\"**/*.{ts,tsx,md,json,js}\\"",
    "clean": "turbo run clean",
    "prepare": "husky"
  },
  "devDependencies": {
    "@commitlint/cli": "^19.3.0",
    "@commitlint/config-conventional": "^19.2.2",
    "eslint": "^9.5.0",
    "husky": "^9.0.11",
    "lint-staged": "^15.2.7",
    "prettier": "^3.3.2",
    "turbo": "^2.0.4",
    "typescript": "^5.4.5"
  },
  "packageManager": "pnpm@9.4.0"
}, null, 2));

// 2. pnpm-workspace.yaml
write('pnpm-workspace.yaml', `packages:
  - 'apps/*'
  - 'packages/*'
  - 'tooling/*'
`);

// 3. turbo.json
write('turbo.json', JSON.stringify({
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    },
    "lint": { "dependsOn": ["^lint"] },
    "typecheck": { "dependsOn": ["^typecheck"] },
    "test": { "dependsOn": ["^test"] },
    "dev": { "cache": false, "persistent": true },
    "clean": { "cache": false }
  }
}, null, 2));

// 4. tooling
write('tooling/typescript-config/package.json', JSON.stringify({
  "name": "@derivo/typescript-config",
  "version": "0.1.0",
  "private": true
}, null, 2));

write('tooling/typescript-config/base.json', JSON.stringify({
  "display": "Base",
  "compilerOptions": {
    "composite": false,
    "declaration": true,
    "declarationMap": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "inlineSources": false,
    "isolatedModules": true,
    "moduleResolution": "node",
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "preserveWatchOutput": true,
    "skipLibCheck": true,
    "strict": true,
    "strictNullChecks": true
  },
  "exclude": ["node_modules"]
}, null, 2));

write('tooling/eslint-config/package.json', JSON.stringify({
  "name": "@derivo/eslint-config",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@eslint/js": "^9.5.0",
    "typescript-eslint": "^7.13.1"
  }
}, null, 2));

write('tooling/eslint-config/index.js', `import js from "@eslint/js";
import tseslint from "typescript-eslint";
export default tseslint.config(js.configs.recommended, ...tseslint.configs.recommended);
`);

write('eslint.config.js', `export { default } from "@derivo/eslint-config";\n`);

write('tsconfig.json', JSON.stringify({
  extends: "@derivo/typescript-config/base.json",
  compilerOptions: {
    baseUrl: ".",
    paths: { "@derivo/*": ["packages/*/src"] }
  },
  include: [],
  exclude: ["node_modules", "dist"]
}, null, 2));

write('.prettierrc', JSON.stringify({
  "semi": true, "singleQuote": true, "tabWidth": 2, "trailingComma": "all", "printWidth": 100
}, null, 2));

write('.prettierignore', `node_modules\ndist\n.turbo\nbuild\n.husky/_\n`);

write('.editorconfig', `root = true\n[*]\ncharset = utf-8\nend_of_line = lf\nindent_size = 2\nindent_style = space\ninsert_final_newline = true\ntrim_trailing_whitespace = true\n`);

write('.npmrc', `link-workspace-packages=true\nstrict-peer-dependencies=false\n`);

write('.husky/pre-commit', `#!/usr/bin/env sh\n. "$(dirname -- "$0")/_/husky.sh"\n\npnpm lint-staged\n`);
write('.husky/commit-msg', `#!/usr/bin/env sh\n. "$(dirname -- "$0")/_/husky.sh"\n\nnpx --no -- commitlint --edit "$1"\n`);
write('commitlint.config.js', `export default { extends: ["@commitlint/config-conventional"] };\n`);
write('.lintstagedrc.json', JSON.stringify({
  "*.{ts,tsx,js,jsx}": ["eslint --fix", "prettier --write"],
  "*.{json,md,yml,yaml}": ["prettier --write"]
}, null, 2));

write('.github/workflows/ci.yml', `name: CI
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v3
        with: { version: 9 }
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: 'pnpm' }
      - run: pnpm install --frozen-lockfile
      - run: pnpm run lint
      - run: pnpm run typecheck
      - run: pnpm run build
      - run: pnpm run test
`);

// Setup all packages
const packagesDir = path.join(process.cwd(), 'packages');
const packages = fs.existsSync(packagesDir) ? fs.readdirSync(packagesDir) : [];

for (const pkg of packages) {
  const pkgDir = path.join(packagesDir, pkg);
  if (!fs.statSync(pkgDir).isDirectory()) continue;

  write(path.join(pkgDir, 'tsconfig.json'), JSON.stringify({
    "extends": "@derivo/typescript-config/base.json",
    "compilerOptions": { "outDir": "dist", "rootDir": "src", "declaration": true },
    "include": ["src"]
  }, null, 2));

  const indexTsPath = path.join(pkgDir, 'src', 'index.ts');
  if (!fs.existsSync(indexTsPath)) {
    write(indexTsPath, `export const name = "@derivo/${pkg}";\n`);
  }

  const packageJsonPath = path.join(pkgDir, 'package.json');
  if (fs.existsSync(packageJsonPath)) {
    const pkgJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    pkgJson.main = "dist/index.js";
    pkgJson.types = "dist/index.d.ts";
    pkgJson.scripts = {
      ...pkgJson.scripts,
      "build": "tsc",
      "dev": "tsc -w",
      "lint": "eslint .",
      "typecheck": "tsc --noEmit"
    };
    write(packageJsonPath, JSON.stringify(pkgJson, null, 2) + '\n');
  } else {
    // Some packages might be missing package.json, like project-detector
    write(packageJsonPath, JSON.stringify({
      "name": \`@derivo/\${pkg}\`,
      "version": "0.1.0",
      "main": "dist/index.js",
      "types": "dist/index.d.ts",
      "scripts": {
        "build": "tsc",
        "dev": "tsc -w",
        "lint": "eslint .",
        "typecheck": "tsc --noEmit"
      }
    }, null, 2) + '\n');
  }
}

const cliDir = path.join(process.cwd(), 'apps', 'cli');
if (fs.existsSync(cliDir)) {
  write(path.join(cliDir, 'tsconfig.json'), JSON.stringify({
    "extends": "@derivo/typescript-config/base.json",
    "compilerOptions": { "outDir": "dist", "rootDir": "src" },
    "include": ["src", "bin"]
  }, null, 2));

  const packageJsonPath = path.join(cliDir, 'package.json');
  if (fs.existsSync(packageJsonPath)) {
    const pkgJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    pkgJson.scripts = { ...pkgJson.scripts, "build": "tsc", "lint": "eslint .", "typecheck": "tsc --noEmit" };
    write(packageJsonPath, JSON.stringify(pkgJson, null, 2) + '\n');
  }
}

// Make sure apps/web uses the shared tsconfig
const webTsConfig = path.join(webDir, 'tsconfig.json');
if (fs.existsSync(webTsConfig)) {
  try {
    const webTs = JSON.parse(fs.readFileSync(webTsConfig, 'utf8'));
    webTs.extends = "@derivo/typescript-config/base.json";
    write(webTsConfig, JSON.stringify(webTs, null, 2));
  } catch(e){}
}

console.log("Monorepo initialization complete.");
