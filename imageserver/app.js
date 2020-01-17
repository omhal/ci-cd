const path = require("path")
const express = require("express")
const bodyParser = require('body-parser')
const cors = require("cors")
const PORT = 9001
const move = require("./helpers/move")

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))

app.use("/", express.static(path.join(__dirname, 'publics')))

app.get("/move/recogtounrecog/:date/:id", function(req, res) {
  move(`./publics/images/recognize/${req.params.date}/${req.params.id}`, `./publics/images/unrecognize/${req.params.date}/${req.params.id}`, function(err) {
    if(err) {
      res.status(400).send({
        status: 400,
        msg: err
      })
    } else {
      res.status(200).send({
        status: 200,
        msg: `success move ${req.params.id} from recognize to unrecognize`
      })
    }
  })
})

app.get("/move/unrecogtorecog/:date/:id", function(req, res) {
  move(`./publics/images/unrecognize/${req.params.date}/${req.params.id}`, `./publics/images/recognize/${req.params.date}/${req.params.id}`, function(err) {
    if(err) {
      console.log(err)
      res.status(400).send({
        status: 400,
        msg: err
      })
    } else {
      res.status(200).send({
        status: 200,
        msg: `success move ${req.params.id} from unrecognize to recognize`
      })
    }
  })
})

app.listen(PORT, () => {
  console.log("image server running on " + PORT)
})