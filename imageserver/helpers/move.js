const fs = require('fs')
const path = require("path")

module.exports = function(oldPath, newPath, callback) {

    fs.access(oldPath, fs.constants.F_OK, (err) => {
        if(err) {
            callback(`File ${path.basename(oldPath)} not found`)
        }
        else {
            fs.mkdir(path.dirname(newPath), { recursive: true }, function(err) {
                fs.rename(oldPath, newPath, function(err) {
                    if (err) {
                        if (err.code === 'EXDEV') {
                            copy()
                        } else {
                            callback(`Failed move ${path.basename(oldPath)}`)
                        }
                        return
                    }
            
                    callback()
                })
            }) 
        }
    })

    function copy() {
        let readStream = fs.createReadStream(oldPath)
        let writeStream = fs.createWriteStream(newPath)

        readStream.on("error", callback)
        writeStream.on("error", callback)

        readStream.on('close', function () {
            fs.unlink(oldPath, callback)
        })

        readStream.pipe(writeStream)
    }
}