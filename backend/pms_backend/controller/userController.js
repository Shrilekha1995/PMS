var user = require('../model/user');
var jwt = require('jsonwebtoken');
var config = require('../auth/secret');
var checkToken = require('../auth/checkToken')


exports.getUsers = (req, res, next) => {
 
        checkToken.checkToken(req, res, (payload) => {
        console.log(payload);
        if (payload.role == 'manager' ) {
            user.find((err, users) => {
                   if(err){
                    res.json(err);
                   }
                   else{
                        res.json(users);
                   }
            })
        }
        else
        {
            res.status(403).send("Unauthorized");
        }
    })
};

exports.registerUser = (req, res, next) => {
    let newUser = new user({
        id: req.body.id,
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        loginName: req.body.loginName,
        password: req.body.password,
        role: req.body.role,
        status: req.body.status
    });
    newUser.save((err, item) => {
        if (err) {
            res.json(err);
        }
        else {
            res.json({ msg: "user added successfully" });

        }
    });
};

exports.updateUserById = (req, res, next) => {
    user.findOneAndUpdate({ "id": req.params.id }, {
        $set:
        {
            id: req.body.id,
            name: req.body.name,
            phone: req.body.phone,
            email: req.body.email,
            loginName: req.body.loginName,
            password: req.body.password,
            role: req.body.role,
            status: req.body.status

        }
    },
        function (err, result) {
            if (err) {
                res.json(err);
            }
            else {
                res.json({ msg: "user updated successfully" });
            }
        });
}

exports.loginUser = (req, res) => {
    loginName = req.body.loginName
    password = req.body.password
    user.findOne({ 'loginName': loginName, 'password': password }, (err, data) => {
        if (data == null) {
            res.json("Login credentials invalid");
        }
        else {
            console.log("data"+ data);
            console.log(config.secret)
            let token = jwt.sign({ loginName: loginName, password: password,role:data.role}, config.secret, { expiresIn: '1h' });
           
            console.log(token);
            let role=data.role;
            console.log("role"+role);
            let id=data.id;
      
            console.log("loginName"+loginName);
            console.log("id"+id)
            res.json({
                success: true,
                message: 'Authentication successful!',
                token: token,
                role:role,
                loginName:data.loginName,
                id:id

                
            });
        }
    })

};

exports.deleteUserById = (req, res, next) => {
    user.remove({ "id": req.params.id },
        function (err, result) {
            if (err) {
                res.json(err);
            }
            else {
                res.json({ msg: "user deleted successfully by id" });
            }
        });

};
exports.deleteUserByName = (req, res, next) => {
    user.remove({ "name": req.params.name },
        function (err, result) {
            if (err) {
                res.json(err);
            }
            else {
                res.json({ msg: "user deleted successfully by name" });
            }
        });

};