const httpStatus = require("http-status-codes");

// catch all errors and respond with a 500 status code
exports.respondInternalError = (error, req, res, next) => {
    let errorCode = httpStatus.INTERNAL_SERVER_ERROR;
    res.status(errorCode);

    // using html file
    // res.sendFile(`./public/${errorCode}.html`, {
    //     root: "./"
    // });

    // using ejs
    res.render("500");
};

