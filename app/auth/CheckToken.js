const jwt = require("jsonwebtoken");

module.exports = function(req, res, next) {
    const token = req.header('auth-token');
    if (!token) return res.status(401).send({
        status: 401,
        success: false,
        message: "Please login to access"
    })
    try {
        const checkToken = jwt.verify(token, 'password');
        req.user = checkToken;
        next();
    } catch (err) {
        res.status(400).send({
            status: 400,
            success: false,
            message: "Invalid token"
        });
    }
}