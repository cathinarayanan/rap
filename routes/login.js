const loginRoutes = require('express').Router();
const verifyIfAuthenticated = require('../middleware/auth');
const { comparePassword } = require ('../util/encrypt');
const User = require ('../dao/user');
const { generateAccessToken } = require ('../middleware/auth');
const { hashPassword } = require('../util/encrypt');

loginRoutes.post("/login", (req, res) => {


    let userDataPromise = User.findOne({where: {
        email: req.body.email
        }});

    userDataPromise.then(data => {
        console.log(data);

        let isMatching = comparePassword(req.body.pwd, data.pwd);

        isMatching.then(isIt => {
            if(isIt){
                let generatedjwttoken =generateAccessToken(data.email);
                let responseData = {
                    email: data.email,
                    token : generatedjwttoken
                }

                res.status(200).send(responseData);
            }else{
                res.status(401).send('pwd not matching');

            }
        });

    }).catch(error => {
        console.error(error);
        res.status(500).send("internal server error");
    })








});


loginRoutes.post("/register", (req, res) =>{

    let userId = req.body.email;
    let pwd = req.body.pwd;
    let hashedPwdPromise = hashPassword(pwd);



    hashedPwdPromise.then( hashedPwd => {

        let userData = {
            email: userId,
            pwd : hashedPwd
        }


        let createUserPromise = User.create(userData);

        createUserPromise.then(data => {
            let token = generateAccessToken(userData.email, userData.pwd);
            userData.token = token;
            res.status(201).json({ message: "User added successfully", userData });
        }).catch( error => {
            console.error('error', error);
            res.status(500).json({ message: "internal server error"});
        })

    })



})

module.exports = loginRoutes;