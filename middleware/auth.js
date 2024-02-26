const jwt = require ("jsonwebtoken");
const model = require("../database/models");

module.exports = (req, res, next) => {
    let token = req.headers.token;
    if (token) {
        let verify = jwt.verify(token, process.env.JWT_KEY_SECRET);

        model.User.findOne({
            where: {
                id: verify.id,
            },
        }). then(function (result){
            if (result) {
                req.decoded = verify;
                next();
            } else {
                res.status(401).json ({
                    message: "Kamu tak punya aksess",
                })
            }
        }).cacth(function (error){
            res.json({ error: error });
        })
    } else {
        res.status(401).json({
            message:"Silakan login terlebih dahulu"
        });
    }
}