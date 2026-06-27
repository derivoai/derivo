import fs from 'fs';
import path from 'path';

const packagesDir = path.join(process.cwd(), 'packages');
const packages = fs.readdirSync(packagesDir);

for (const pkg of packages) {
  const pkgDir = path.join(packagesDir, pkg);
  if (!fs.statSync(pkgDir).isDirectory()) continue;

  const tsconfigPath = path.join(pkgDir, 'tsconfig.json');
  fs.writeFileSync(tsconfigPath, JSON.stringify({
    "extends": "@derivo/typescript-config/base.json",
    "compilerOptions": {
      "outDir": "dist",
      "rootDir": "src",
      "declaration": true
    },
    "include": ["src"]
  }, null, 2));

  const srcDir = path.join(pkgDir, 'src');
  if (!fs.existsSync(srcDir)) fs.mkdirSync(srcDir);
  const indexTsPath = path.join(srcDir, 'index.ts');
  if (!fs.existsSync(indexTsPath)) {
    fs.writeFileSync(indexTsPath, `export const name = "@derivo/${pkg}";\n`);
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
    fs.writeFileSync(packageJsonPath, JSON.stringify(pkgJson, null, 2) + '\n');
  }
}

const cliDir = path.join(process.cwd(), 'apps', 'cli');
if (fs.existsSync(cliDir)) {
  const tsconfigPath = path.join(cliDir, 'tsconfig.json');
  fs.writeFileSync(tsconfigPath, JSON.stringify({
    "extends": "@derivo/typescript-config/base.json",
    "compilerOptions": { "outDir": "dist", "rootDir": "src" },
    "include": ["src", "bin"]
  }, null, 2));

  const packageJsonPath = path.join(cliDir, 'package.json');
  if (fs.existsSync(packageJsonPath)) {
    const pkgJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    pkgJson.scripts = { ...pkgJson.scripts, "build": "tsc", "lint": "eslint .", "typecheck": "tsc --noEmit" };
    fs.writeFileSync(packageJsonPath, JSON.stringify(pkgJson, null, 2) + '\n');
  }
}
