const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var userSchema = new Schema({
    user_id : {type: Schema.Types.ObjectId ,required : true},
    name : { type: String, required: true},

},{timestamps: true});

module.exports = mongoose.model('Task',userSchema);