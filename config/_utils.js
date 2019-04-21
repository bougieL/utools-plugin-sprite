const fs = require('fs')
const os = require('os')
const chalk = require('chalk')
const execSync = require('child_process').execSync

function replaceFileContent(path, searchValue, replaceValue) {
  let fileContent = fs.readFileSync(path, 'utf8')
  fs.writeFileSync(path, fileContent.replace(searchValue, replaceValue))
}

function exec(cmd) {
  const stdout = execSync(cmd, {
    stdio: 'inherit'
  })
  if (stdout) {
    console.log(chalk.green.bold(stdout))
  }
}

function getHostIP() {
  const interfaces = os.networkInterfaces()
  const overall = []
  Object.keys(interfaces)
    .forEach((name) => {
      const infos = interfaces[name]
      Array.prototype.push.apply(overall, infos)
    })
  const cands = overall
    .filter((info) =>
      info.family === 'IPv4' && !info.internal)
  if (cands.length === 0) {
    return undefined
  }
  return cands[0].address
}

module.exports = {
  exec,
  replaceFileContent,
  getHostIP
}