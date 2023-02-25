const Anuncio = require("./Anuncio");
const express = require("express");


async function getFunction(req, res, next){
    try {
        const anuncioId = req.params.id;
        var anuncios = await Anuncio.findById(anuncioId);

        if(req.originalUrl[1] !== "a"){
            res.render("index", {resultado: anuncios});
        } else {
            res.json({resultado: anuncios});
        }
        
    } catch (error) {
        next (error);
    }
}

module.exports = getFunction;