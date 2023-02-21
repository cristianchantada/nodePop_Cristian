const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

mongoose.connect("mongodb://127.0.0.1:27017/anuncios");

mongoose.connection.on("error", err => {
    console.log("Error de conexión con la base de datos", err)
});

mongoose.connection.once("open", () => {
    console.log("Conexión establecida con la BD en", mongoose.connection.name);
});

module.exports = mongoose.connection;