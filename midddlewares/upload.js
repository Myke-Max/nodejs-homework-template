const multer = require('multer')
const path = require('path')
const tempPath = path.join(__dirname, '../temp')

const uploadConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempPath)
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
  limits: {
    filesize: 10048,
  },
})

const fileFilter = (req, file, cb) => {
  const { mimetype } = file
  if (mimetype === 'image/png' || mimetype === 'image/jpg' || mimetype === 'image/jpeg') {
    cb(null, true)
  }
  cb(null, false)
}

const upload = multer({ storage: uploadConfig, fileFilter })

module.exports = upload
