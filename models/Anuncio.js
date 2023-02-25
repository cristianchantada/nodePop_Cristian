const mongoose = require("mongoose");

const anuncioSchema = mongoose.Schema({
    nombre: String,
    venta: Boolean,
    precio: Number,
    foto: String,
    tags: [String],
});

anuncioSchema.statics.filtrado = function (queryData, filtro){

    const query = Anuncio.find(filtro);
    query.select(queryData.select);
    query.skip(queryData.skip);
    query.limit(queryData.limit);
    query.sort(queryData.sort);
    return query.exec();

}

const Anuncio = mongoose.model("Anuncio", anuncioSchema);

module.exports = Anuncio;