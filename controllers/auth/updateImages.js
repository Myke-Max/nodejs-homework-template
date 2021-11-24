const { User } = require('../../model/auth')
const fs = require('fs/promises')
const { successResponse } = require('../../helpers')
const path = require('path')
const jimp = require('jimp')
const tempDir = path.join(__dirname, '../../temp')

const usersImageDir = path.join(__dirname, '../../', 'public/users')
const updateImages = async (req, res, next) => {
  const { id } = req.params
  const { path: tempPath, originalname } = req.file
  // console.log(req.file)

  try {
    const resultUpload = path.join(usersImageDir, `${id} ${originalname}`)
    await fs.rename(tempPath, resultUpload)
    const newAvatarURL = path.join('/avatars', `${id} ${originalname}`)
    const resizeAvatar = await jimp.read(resultUpload)
    resizeAvatar.resize(256, 256).write(resultUpload)
    await User.findByIdAndUpdate(id, { newAvatarURL }, { new: true })
    successResponse(res, newAvatarURL)

    fs.rmdir(tempDir)
  } catch (error) {
    next(error)
  }
}
module.exports = updateImages
