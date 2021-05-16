
let ALL_MODELS = require("../utilites/all_models")

exports.userInfo = async (req, res) => {
    let user = await ALL_MODELS.user.findOne({
        "_id" : req.userId
    })
    return res.send(user)
}