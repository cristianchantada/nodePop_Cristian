"use strict";

const Anuncio = require("../models/Anuncio");
const connection = require("../lib/connectMongoose");

async function initAnuncios (){
    const deleted = await Anuncio.deleteMany();

    console.log(`Se han borrado un total de ${deleted.deletedCount} documentos`)

    const insert = [
        {nombre: "Caja de melocotones", venta: false, precio: 9.99 , foto: "melocotones.jpg", tags: [" lifestyle"]},
        {nombre: "Patinete viejo", venta: true, precio: 23.00 , foto: "patinete.jpg", tags: [" motor", " lifestyle"]},
        {nombre: "Chupa-chups caducados", venta: true, precio: 9.99 , foto: "chupa-chups.jpg", tags: [" lifestyle"]},
        {nombre: "Bragas 'vintage' de mi abuela, poco uso", venta: true, precio: 4.99, foto: " bragas.jpg", tags: [" lifestyle"]},
        {nombre: "Fragoneta nueba", venta: true, precio: 9500, foto: "fragoneta.jpg", tags: [" motor", " work"]},
        {nombre: "Amigos", venta: false, precio: 10, foto: "amigos.jpg", tags: ["lifestyle"]},
        {nombre: "Reloges y mobiles y jollas rovadas", venta: true, precio: 150, foto: "relojes.jpg", tags: [ " lifestyle", " mobile"]}
    ];

    const inserted = await Anuncio.insertMany(insert);

    console.log(`Han sido insertados ${insert.length} documentos en la colección.`)
    
}

async function main (){
    await initAnuncios();
    connection.close();
}

main().catch(err => console.log("Ha habido un error en la inicialización de la BD", err))