const { User } = require('../../model/auth')
const fs = require('fs/promises')
const { successResponse } = require('../../helpers')
const multer = require('multer')
const path = require('path')

const usersImageDir = path.join(__dirname, '../', 'public/users')

const updateImages = async (req, res, next) => {
  const { id } = req.params
  const { path: tempDir, originalname } = req.file
  console.log(req.body)
  try {
    const resultUpload = path.join(usersImageDir, originalname)
    await fs.rename(tempDir, resultUpload)
    const image = path.join('/users', originalname)
    const result = await User.findByIdAndUpdate(id, { image })
    successResponse(res, { result })
  } catch (error) {
    fs.unlink(tempDir)
    next(error)
  }
}
module.exports = updateImages
