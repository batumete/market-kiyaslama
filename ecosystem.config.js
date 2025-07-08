module.exports = {
  apps: [{
    name: "server",
    script: "npx",
    args: "ts-node --esm server/index.ts",
    watch: false
  }]
}
