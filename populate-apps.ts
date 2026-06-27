import fs from 'fs';
import path from 'path';

const appsDir = path.join(process.cwd(), 'apps');
const apps = fs.readdirSync(appsDir);

for (const app of apps) {
  const appDir = path.join(appsDir, app);
  if (!fs.statSync(appDir).isDirectory()) continue;

  if (app === 'cli') {
    const tsconfigPath = path.join(appDir, 'tsconfig.json');
    fs.writeFileSync(tsconfigPath, JSON.stringify({
      "extends": "@derivo/typescript-config/base.json",
      "compilerOptions": {
        "outDir": "dist",
        "rootDir": "src"
      },
      "include": ["src", "bin"]
    }, null, 2));

    const packageJsonPath = path.join(appDir, 'package.json');
    if (fs.existsSync(packageJsonPath)) {
      const pkgJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
      pkgJson.scripts = {
        ...pkgJson.scripts,
        "build": "tsc",
        "dev": "tsc -w",
        "lint": "eslint .",
        "typecheck": "tsc --noEmit"
      };
      fs.writeFileSync(packageJsonPath, JSON.stringify(pkgJson, null, 2) + '\n');
    }
  } else if (app === 'web') {
    const tsconfigPath = path.join(appDir, 'tsconfig.json');
    const existing = JSON.parse(fs.readFileSync(tsconfigPath, 'utf-8'));
    fs.writeFileSync(tsconfigPath, JSON.stringify({
      ...existing,
      extends: "@derivo/typescript-config/base.json"
    }, null, 2));

    const packageJsonPath = path.join(appDir, 'package.json');
    if (fs.existsSync(packageJsonPath)) {
      const pkgJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
      pkgJson.scripts = {
        ...pkgJson.scripts,
        "build": "vite build",
        "dev": "vite dev",
        "lint": "eslint .",
        "typecheck": "tsc --noEmit"
      };
      fs.writeFileSync(packageJsonPath, JSON.stringify(pkgJson, null, 2) + '\n');
    }
  }
}
console.log('Done apps!');
