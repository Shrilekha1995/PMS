var jwt = require('jsonwebtoken');
var config = require('./secret');

exports.checkToken = (req, res, next) => {
    let token = req.headers['authorization'];
    if (token && token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }
    if (token) {
        try {
            payload = jwt.verify(token, config.secret)
            console.log(payload)
            next(payload);
        }
        catch (e) {
            console.log("checking.................")
        }
    }
    else {
        res.send("token not supplied");
    }
}