const path = require("path");
const fs = require("fs");
const solc = require("solc");

const instagramPath = path.resolve(__dirname, "contracts", "Instagram.sol");
const source = fs.readFileSync(instagramPath, "utf-8");

module.exports = solc.compile(source, 1).contracts[":Instagram"];
