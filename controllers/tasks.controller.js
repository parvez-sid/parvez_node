var functions = require('../functions');
const tasksSchema = require('../models/tasks.model');
var ObjectId = require('mongodb').ObjectID;

exports.addTask = (req, res) => {
    if(req.session.user){
        tasksSchema.findOne({
            user_id: ObjectId(req.session.user._id),
            _id: req.body._id
        }, (err, result) => {
            if(result){
                var fieldForUpdate = {};
                if (req.body.name) fieldForUpdate.name = req.body.name;
                var query = { _id : req.body._id}
                var data = { $set: fieldForUpdate };
                tasksSchema.updateOne(query, data).exec((err, result) => {
                    if (err) return functions.sendErrorResponse(req, res, 400, err);
                    if (result) {
                        var message = 'Task details updated successfully!';
                        return functions.sendSuccessResponse(req, res, message);
                    }
                })
            }
            else{
                var task_obj = new tasksSchema({
                    name : req.body.name,
                    user_id : ObjectId(req.session.user._id)
                });
            
                task_obj.save((err, result) => {
                    if (err) {
                            return functions.sendErrorResponse(req, res, 400, 'Invalid JSON!')
                    } else {
                        return functions.sendSuccessResponse(req, res, result);
                    }
                })
            }
        })
        }
    else {
        if (err) return functions.sendErrorResponse(req, res, 400, 'Session Expire');
    }
}

exports.getAllTasks = (req, res) => {
    if(req.session.user){
        tasksSchema.find({'user_id' : ObjectId(req.session.user._id)})
        .then(tasks => {
            return functions.sendSuccessResponse(req, res, tasks);
        }).catch(err => {
            return functions.sendErrorResponse(req, res, 500, err);
        });
    }
    else{
        return functions.sendErrorResponse(req, res, 400, 'Session Expire');
    }
}