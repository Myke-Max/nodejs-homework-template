const multer = require('multer')
const path = require('path')
const tempDir = path.join(__dirname, '../temp')
const uploadConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(tempDir)
    cb(null, tempDir)
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
