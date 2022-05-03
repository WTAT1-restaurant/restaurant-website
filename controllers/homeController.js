// homeController to store the routes' callback function

const { path } = require("express/lib/application");

// create a function to handle route-specific requests
exports.homePage = (req, res) => {
    
    // error on how to get to the directory
    res.sendFile(path.join(__dirname, "../views/index.html"));
    // res.sendFile(path.join(__dirname , '../public', 'views', 'index.html'));
}