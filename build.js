const fs = require("fs");
const path = require("path");

const rootPath = path.resolve(__dirname, "src");
const ignoreFiles = new Set(["index.ts"]);
const ignore = (fileName) => !ignoreFiles.has(fileName);

const fileNames = fs
  .readdirSync(rootPath)
  .filter(ignore)
  .map((name) => path.basename(name, ".ts"));

const indexContent = fileNames
  .map((file) => `export { default as ${file} } from "./${file}"`)
  .join("\n");

fs.writeFileSync(path.resolve(rootPath, "index.ts"), indexContent);
console.log("Build index.ts success");
