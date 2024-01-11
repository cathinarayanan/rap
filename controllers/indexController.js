const path = require("path");

const indexPage = (req, res) => {
    const indexPath = path.join(__dirname, "../views/index.html");
    res.sendFile(indexPath);
};
  
module.exports = { indexPage };
  