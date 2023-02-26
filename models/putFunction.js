const Anuncio = require("./Anuncio");
const express = require("express");

async function putFunction(req, res, next){
    try {
        const anuncioId = req.params.id
        console.log(anuncioId);
        const anuncioDatos = req.body;
        console.log(anuncioDatos)
  
        var anuncios = await Anuncio.findByIdAndUpdate(anuncioId, anuncioDatos, {new: true});
  
        if(req.originalUrl[1] !== "a"){
            anuncios = [anuncios];
            res.render("index", {resultado: anuncios});
        } else {
            res.json({resultado: anuncios});
        }
        
    } catch (error) {
        next(error);
    }
}

module.exports = putFunction;