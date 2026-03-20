# WEB-ISW-233


### Add Lint
Step 1 — Install ESLint and TypeScript plugin
Run this inside packages/first-demo/:

```
cd packages/first-demo
npm install --save-dev eslint @eslint/js typescript-eslint
```

Step 2 — Create ESLint config

Create packages/first-demo/eslint.config.js:

```
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommended
);
```
Note: Since package.json uses "type": "commonjs", you'd need to either rename the file to eslint.config.cjs, or change "type" to "module". The .cjs approach is safest since it won't break your existing build.

If you keep "type": "commonjs", use eslint.config.cjs with CommonJS syntax instead:

```
// eslint.config.cjs
const eslint = require("@eslint/js");
const tseslint = require("typescript-eslint");

module.exports = tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommended
);
```
Step 3 — Add the lint script

In packages/first-demo/package.json, add:

```
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "build": "tsc",
  "lint": "eslint src"
}
```

Step 4 — Run it
```
npm run lint
```