const httpStatus = require("http-status-codes");

// catch all errors and respond with a 500 status code
module.exports = { 
    respondInternalError : (error, req, res, next) => {
        let errorCode = httpStatus.INTERNAL_SERVER_ERROR;
        res.status(errorCode);
        console.log(error)
        res.render("500");
    },

    pageNotFoundError : (req, res) => {
        let errorCode = httpStatus.NOT_FOUND;
        res.status(errorCode);
        console.log(errorCode);
        res.render("404");
    }
};
