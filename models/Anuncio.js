const mongoose = require("mongoose");

const anuncioSchema = mongoose.Schema({
    nombre: String,
    venta: Boolean,
    precio: Number,
    foto: String,
    tags: Array,
});

anuncioSchema.statics.filtrado = function (filtro, select, skip, limit, sort){

    const query = Anuncio.find(filtro);
    query.select(select);
    query.skip(skip);
    query.limit(limit);
    query.sort(sort);
    return query.exec();

}

const Anuncio = mongoose.model("Anuncio", anuncioSchema);

module.exports = Anuncio;