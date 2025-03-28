// Middleware for handling auth
const jwt=require("jsonwebtoken")
const JWT_SECRET="TESTJWTADMIN"
function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected

    const token=req.headers.authorization
    const word=token.split(" ")
    const jwtToken=word[1]
    const decodedJwt=jwt.verify(jwtToken,JWT_SECRET)
    if(decodedJwt.username){
        next()
    }
    else{
        res.status(403).json({msg:"You are not authenticated"})
    }
    
}

module.exports = adminMiddleware;