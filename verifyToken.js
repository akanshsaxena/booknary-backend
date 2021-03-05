const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const token = req.header('auth-token');
    if (!token) {
        res.send(false);
        console.log("access denied")
    } else {
        try {
            const validate = jwt.verify(token, process.env.PAYLOAD_STRING)
            req.user = validate
            next();
        } catch (err) {
            res.send(false);
        }
    }
}