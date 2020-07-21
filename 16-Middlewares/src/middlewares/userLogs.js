const fs = require("fs");
const path = require("path");

const userLogs = (req, res, next) => {
    const userLogsFile = path.join(__dirname, "..", "logs", "userLogs.txt");
    fs.appendFileSync(userLogsFile, `El usuario ingresó a la ruta: ${req.path}\n`);
    next();
};

module.exports = userLogs;