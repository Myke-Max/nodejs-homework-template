const multer = require('multer')
const path = require('path')
const fs = require('fs')
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

const upload = multer({ storage: uploadConfig })

module.exports = upload
