"use strict";

const Anuncio = require("../models/Anuncio");
const connection = require("../lib/connectMongoose");
const anunciosJson = require("./anuncios.json")

async function initAnuncios (){
    const deleted = await Anuncio.deleteMany();

    console.log(`Se han borrado un total de ${deleted.deletedCount} documentos`)

    const insert = anunciosJson.anuncios
        
    await Anuncio.insertMany(insert);

    console.log(`Han sido insertados ${insert.length} documentos en la colección.`)
    
}

async function main (){
    await initAnuncios();
    connection.close();
}

main().catch(err => console.log("Ha habido un error en la inicialización de la BD", err))