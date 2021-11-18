const { User } = require('../../model/auth')
const fs = require('fs/promises')
const { successResponse } = require('../../helpers')
const path = require('path')
const jimp = require('jimp')

const usersImageDir = path.join(__dirname, '../../', 'public/users')
const updateImages = async (req, res, next) => {
  const { id } = req.params
  const { path: tempDir, originalname } = req.file

  try {
    const resultUpload = path.join(usersImageDir, `${id} ${originalname}`)
    await fs.rename(tempDir, resultUpload)
    const image = path.join('/avatars', `${id} ${originalname}`)
    const resizeAvatar = await jimp.read(resultUpload)
    resizeAvatar.resize(256, 256).write(resultUpload)
    await User.findByIdAndUpdate(id, { image })
    req.user.avatarURL = image
    successResponse(res, image)
  } catch (error) {
    fs.unlink(tempDir)
    next(error)
  }
}
module.exports = updateImages
