const jwt = require("jsonwebtoken");

function verifyLoggedIn(req, res, next) {
    if(!req.headers.authorization) return res.status(401).send("אתה לא מחובר");

    const token = req.headers.authorization.split(" ")[1];
    if(!token) return res.status(401).send("אתה לא מחובר");

    jwt.verify(token, config.jwtKey, (err, payload) => {
        if(err && err.message === "jwt expired") {
            return res.status(403).send("פג תוקף ההתחברות , אנא התחבר מחדש !");
        }
        if(err) return res.status(401).send("אתה לא מחובר");
        // req.headers.userDetails = payload.payload;
        next();
    });
}

module.exports = verifyLoggedIn;