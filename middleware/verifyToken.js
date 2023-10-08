const jwt = require("jsonwebtoken");

const verifyToken = (req, res) => {
    
        const token = req.headers.authorization.split(" ")[1];
        console.log(token);
        const verifiedToken = jwt.verify(token, process.env.TOKEN_KEY)
        req.userInfo = verifiedToken
        if (verifiedToken){
            next();

        }
        else{
            return res.status(401).send("Access Denied"); 
        }
}

module.exports = { verifyToken }