exports.userNameGenerator = function(email) {
    var name   = email.substring(0, email.lastIndexOf("@"));
    return name;
};

function sendErrorResponse(req, res, statusCode, message) {
    res.status(statusCode).send({ message: message, statusCode: statusCode }).end();
}
exports.sendErrorResponse = function (req, res, statusCode, message) {
    sendErrorResponse(req, res, statusCode, message);
};

exports.sendSuccessResponse = function(req, res, message) {
    res.status(200).send(message).end();
};