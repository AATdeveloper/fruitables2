const multer = require("multer")
const fs = require("fs")
const path = require("path")

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("jjfkkk",file.fieldname);

    let filepath = path.join("public",file.fieldname)
    console.log("jhgjhgjhjj",filepath);
    
    fs.mkdir(filepath,{ recursive: true},(err) => {
      if (err) {
        cb(err)
      }
      cb(null, filepath)
})},
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + '-' + file.originalname)
  }
})

const upload = multer({ storage: storage })

module.exports = upload