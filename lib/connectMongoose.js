const mongoose = require("mongoose");
require('dotenv').config();

mongoose.set("strictQuery", false);

console.log(process.env.MONGODB_CONNECTION_STR)

mongoose.connect(process.env.MONGODB_CONNECTION_STR);

mongoose.connection.on("error", err => {
    console.log("Error de conexión con la base de datos", err)
});

mongoose.connection.once("open", () => {
    console.log("Conexión establecida con la BD en", mongoose.connection.name);
});

module.exports = mongoose.connection;