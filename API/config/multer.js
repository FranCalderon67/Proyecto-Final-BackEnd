const multer = require('multer')
const uniqid = require('uniqid')
const path = require('path')

const storage = multer.diskStorage({
    destination: path.join(process.cwd(), "public", "uploads"),
    filename: (_req, file, callback) => {
        const filename = uniqid(
            "avatar-",
            file.originalname.toLowerCase().split(" ")
        )
        callback(null, filename)
    }
})

const uploadFile = multer({
    storage: storage
})


module.exports = uploadFile