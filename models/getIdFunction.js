const Anuncio = require("./Anuncio");
const express = require("express");


async function getIdFunction(req, res, next){
    try {
        const anuncioId = req.params.id;
        let anuncios = await Anuncio.findById(anuncioId);
        
        if(req.originalUrl[1] !== "a"){
            anuncios = [anuncios];
            res.render("index", {resultado: anuncios});
        } else {
            res.json({resultado: anuncios});
        }
        
    } catch (error) {
        next (error);
    }
}

module.exports = getIdFunction;