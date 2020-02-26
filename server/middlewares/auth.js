const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    const token = req.header('x-auth-token');

    if(!token) return res.status.send('Access Denied, No token Provided');
    try {
        const decoded = jwt.verify(token, "jsonPrivateKey")
        req.user = decoded;
        next()
    } catch(ex) {
        res.status(400).send('Invalid Token');
    }
}

module.exports = auth