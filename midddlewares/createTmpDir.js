const path = require('path')
const fs = require('fs/promises')
const tempPath = path.join(__dirname, '../temp')

const createTmpDir = async (req, res, next) => {
  try {
    await fs.mkdir(tempPath)
    next()
  } catch (error) {
    console.log(error.message)
  }
}
module.exports = createTmpDir
