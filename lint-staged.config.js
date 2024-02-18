/** @type {import("lint-staged").Config} */
export default {
  "**/*.{js,ts}": "eslint",
  "**/*.ts": "tsc-files --noEmit",
  "**/*.{js,ts,css,md}": "prettier --write",
};
