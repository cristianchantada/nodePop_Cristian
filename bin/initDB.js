"use strict";

const Anuncio = require("../models/Anuncio");
const connection = require("../lib/connectMongoose");

async function initAnuncios (){
    const deleted = await Anuncio.deleteMany();

    console.log(`Se han borrado un total de ${deleted.deletedCount} documentos`)

    const insert = [
        {nombre: "Caja de melocotones", venta: true, precio: 9.99 , foto: "melocotones.jpg", tags: ["lifestyle"]},
        {nombre: "Patinete viejo", venta: true, precio: 23.00 , foto: "patinete.jpg", tags: ["motor"]},
        {nombre: "Chupa-chups caducados", venta: true, precio: 9.99 , foto: "chupa-chups.jpg", tags: ["lifestyle"]},
        {nombre: "Bragas 'vintage' de mi abuela, poco uso", venta: true, precio: 4.99, foto: "bragas.jpg", tags: ["lifestyle"]} 
    ];

    const inserted = await Anuncio.insertMany(insert);

    console.log(`Han sido insertados ${insert.length} documentos en la colección.`)
    
}

async function main (){
    await initAnuncios();
    connection.close();
}

main().catch(err => console.log("Ha habido un error en la inicialización de la BD", err))