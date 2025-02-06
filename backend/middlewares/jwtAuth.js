const jwt = require('jsonwebtoken');
const jwtAuth = (req, res, next)=>{
    try {
        const token = req.cookies.token;
        console.log("token : ",token);
        if(!token){
            return res.status(401).json({message: "Unauthorized"});
        }
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = payload.userId;
        next();
    } catch (error) {
        console.log("Unauthorized : ",error);
        return res.status(401).json({message: "Unauthorized"});
    }
}

module.exports = jwtAuth;