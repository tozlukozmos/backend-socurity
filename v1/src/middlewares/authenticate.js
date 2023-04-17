const JWT = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if(token == null) return res.status(401).send({ error: "you must login to do that firstly!"});

    JWT.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, (err, user) => {
        if(err) return res.status(403).send({ error: "token is over time."})
        req.user = user?._doc;
        next();
    })
};

module.exports = authenticateToken;