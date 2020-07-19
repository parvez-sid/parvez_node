var functions = require('../functions');
const userSchema = require('../models/user.model');
var Q = require('q');
var ObjectId = require('mongodb').ObjectID;


exports.registerUser = (req, email, password, res) => {
    var deferred = Q.defer();
    var Newuser = new userSchema({
        email: email,
        password: password,
        username : functions.userNameGenerator(email),
    });
    
    Newuser.save((err, result) => {
        if (err) {
            if (err.code == 11000) {
                data = { status: 501, msg: 'Email is already exists, Please try login.' }
                deferred.reject(data);
            } else {
                data = { status: 501, msg: err.message }
                deferred.reject(data);
            }
        }
        else {
            data = {
                status: 200,
                msg: 'Successfully registered', result,
            }
            deferred.resolve(data);
        }
    })
    return deferred.promise;
};

//Login
exports.loginUser = (req, email, password, res) => {
    var deferred = Q.defer();
    userSchema.findOne({ "email": email }, (err, response) => {
        if (response) {
            var valid = response.comparePassword(password, response.password)
            if (valid) {
                userSchema.updateOne({ '_id': ObjectId(response._id) }, { $set: { 'is_logged_in': true } }).exec((err, login) => {
                    if (login) {
                        data = { status: 200, response }
                        deferred.resolve(data);
                    } else {
                        data = { status: 501, message: 'Error in login' }, deferred.reject(data);
                    }
                })
            } else {
                data = { status: 501, msg: 'Password is incorrect.' }, deferred.reject(data);
            }
        }
        else { data = { status: 501, msg: 'Email is incorrect.' }, deferred.reject(data); }
    });
    return deferred.promise;
};