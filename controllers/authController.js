const User = require("../models/user");
const { handleResponseWithStatus } = require("../helpers/utils");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const login = (req, res) =>{
    console.log(req.body)
    User.findOne({ email: req.body.email }, function (err, docs) {
        if (err){
            console.log(err);
        }
        else{
            if(docs){
                console.log(bcrypt.compareSync(req.body.password, docs.password))
                if(bcrypt.compareSync(req.body.password, docs.password)){
                    // let loginData = { }
                    docs.password=undefined;
                    let token = jwt.sign(docs.toJSON(), process.env.jwt_key);
                    handleResponseWithStatus(res, 200, true, "", { data: docs, token: token, status: "success" });
                }
                else{
                    handleResponseWithStatus(res, 401, false, "Invalid Credentials!", { status: "error", error: "Invalid Credentials!" });
                }
            }
            else{
                handleResponseWithStatus(res, 401, false, "Invalid Credentials!", { status: "error", error: "Invalid Credentials!" });
            }
        }
    });
}

const register = async (req, res)=>{
    try {
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(req.body.password, salt);
        const user = await new User({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: hash,
            creation_date: Date.now()
        })
        await user.save()
        .then(()=>{
            handleResponseWithStatus(res, 200, true, "", { message: 'registered!', status: "success" });
        })
        .catch(err=>{
            console.error(err)
            if(err.code=='11000'){
                handleResponseWithStatus(res, 422, false, "user already exists!", { status: "error", error: "user already exists!" });
            }
            else{
                handleResponseWithStatus(res, 500, false, err, { status: "error", error: err });
            }
        })
    } catch(err){
        handleResponseWithStatus(res, 500, false, err, { status: "error", error: err });   
    }
}

module.exports = {
    login,
    register
}