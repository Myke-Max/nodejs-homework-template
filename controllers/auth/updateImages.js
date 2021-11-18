const { User } = require('../../model/auth')
const fs = require('fs/promises')
const { successResponse } = require('../../helpers')
const path = require('path')

const usersImageDir = path.join(__dirname, '../../', 'public/users')
const updateImages = async (req, res, next) => {
  const { id } = req.params
  const { path: tempDir, originalname } = req.file

  try {
    const resultUpload = path.join(usersImageDir, `${id} ${originalname}`)
    await fs.rename(tempDir, resultUpload)
    const image = path.join('/avatars', `${id} ${originalname}`)
    const result = await User.findByIdAndUpdate(id, { image })

    successResponse(res, result)
  } catch (error) {
    fs.unlink(tempDir)
    next(error)
  }
}
module.exports = updateImages
