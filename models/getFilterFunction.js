const Anuncio = require("./Anuncio");
const express = require("express");

function filtrado (queryData){
    let filterByName = queryData.nombre;
    let filterBySale = queryData.venta;
    let filterByPrice = queryData.precio;
    let filterByTags = queryData.tags;

    const filtro = {};

    if (filterByName) {
        filtro.nombre = new RegExp('^' + queryData.nombre, "i");
    }
    
    if (filterBySale) {
    filtro.venta = filterBySale;
    }

    if (filterByPrice) {
    filtro.precio = filterByPrice;
    }

    if (filterByTags) {

    // Filtrado de tags para que solo sean válidos: lifestyle, work, mobile y motor.

    if(typeof filterByTags !== "object"){
        filterByTags = [filterByTags];
    }

    filterByTags.forEach(item =>{
        const tagsPermitidos = ["lifestyle", "work", "mobile", "motor"];
        if(tagsPermitidos.includes(item) === false){
        res.send("Ha introducido alguna tag no válida en NodeApp; Solo se admiten 'lifestyle', 'motor', 'work' y 'mobile'");
        }
    });

    filtro.tags = filterByTags;
    }

    return filtro;

}

async function getFilterFunction (req, res, next){

    let queryData = req.query;
    const filtro = filtrado(queryData);

    try {
        const anuncios = await Anuncio.filtrado(queryData, filtro);
        
        if(req.originalUrl[1] !== "a"){
            res.render("index", {resultado: anuncios});
        } else {
            res.json({resultado: anuncios});
        }
        
    } catch (error) {
        next (error);
    }
}




module.exports = getFilterFunction;
