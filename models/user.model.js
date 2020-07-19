const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var userSchema = new Schema({
    email : { type: String, trim: true, lowercase: true, unique: true, required: 'Email address is required', match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']},
    username : {type : String, required: true},
    password : {type : String, minlength : 8},
    is_logged_in : {type : Boolean , default:false},
   
},{timestamps: true});

userSchema.pre('save', function(next){
    this.password = bcrypt.hashSync(this.password,bcrypt.genSaltSync(10));
    next();
});

// Comparing Passwords
userSchema.methods.comparePassword = function(password,hash){
    return bcrypt.compareSync(password,hash);
}

module.exports = mongoose.model('User',userSchema);