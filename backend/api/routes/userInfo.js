let express = require("express")
let router = express.Router()

let {userInfo} = require("../controllers/userInfo")
let {tokenVerify} = require("../middlewares/tokenVerify")
router.get("/account", tokenVerify, userInfo)

module.exports = router