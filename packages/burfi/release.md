# RELEASE

## 1. Update Version

Edit `package.json`:

```json
"version": "0.1.0-beta.2"
```

For each beta release, increase the beta number:

```text
0.1.0-beta.1
0.1.0-beta.2
0.1.0-beta.3
```

For a stable release:

```text
0.1.0
```

## 2. Build

Build the complete TypeScript source into JavaScript:

## change the package.json to add content from dev.package.json to package.json, then run the build command

```bash
pnpm run build
```

The compiled package is generated in:

```text
dist/
```

The build uses:

```text
tsconfig.build.json
```

Do not manually edit files inside `dist/`.

## 3. Test the Package

Create the npm package:

```bash
pnpm pack
```

This creates:

```text
burfi-<version>.tgz
```

Install it in the test project:

```bash
cd ../../apps/project
pnpm add ../../packages/burfi/burfi-<version>.tgz
```

Test Burfi:

```bash
pnpm run dev
```

Make sure everything works before publishing.

## 4. Publish Beta

Go back to the Burfi package:

```bash
cd ../../packages/burfi
```

Publish the beta:

```bash
pnpm publish --tag beta
```

Users can install the latest beta with:

```bash
pnpm add burfi@beta
```

## 5. Publish Stable

When Burfi is ready for a stable release:

```bash
pnpm publish
```

Users can install the stable version with:

```bash
pnpm add burfi
```

## Quick Release

For future releases:

```bash
# 1. Update version in package.json

# 2. Build
pnpm run build

# 3. Create package
pnpm pack

# 4. Test the .tgz package

# 5. Publish beta
pnpm publish --tag beta
```
