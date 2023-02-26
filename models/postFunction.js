const Anuncio = require("./Anuncio");
const express = require("express");

async function postFunction(req, res, next){
    try {

        const anuncioDatos = req.body;
        const anuncioDevuelto = new Anuncio(anuncioDatos);

        console.log("Me voy por el POST");

        let anuncios = await anuncioDevuelto.save();

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

module.exports = postFunction;