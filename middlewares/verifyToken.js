const jwt = require("jsonwebtoken");
const { handleResponseWithStatus } = require("../helpers/utils");



const verifyToken = (req, res, next)=>{
    const token = req.headers.token;
    if(token!=undefined){
        jwt.verify(token, process.env.jwt_key, function(err, decoded) {
            if(err){
                console.log(err)
                handleResponseWithStatus(res, 401, false, err, { status: "error", error: 'Unauthorized User!' });
            }
            else{
                if(decoded!=undefined){
                    res.locals = decoded;
                    next();
                }
                else{
                    handleResponseWithStatus(res, 401, false, "", { status: "error", error: 'Unauthorized User!' });
                }
            }
        });
    }
    else{
        console.log("Token not found!")
        handleResponseWithStatus(res, 401, false, "", { status: "error", error: 'Unauthorized User!' });
    }
}

module.exports = verifyToken;