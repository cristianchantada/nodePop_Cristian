const express = require("express");
const router = express.Router();
const Anuncio = require("../../models/Anuncio");

// GET /api/anuncios Listando los anuncios.

router.get("/", async function (req, res, next){
    try {
        
        const anuncios = await Anuncio.find();
        res.json({anuncios: anuncios});

    } catch (error) {
        next (error);
    }
})

module.exports = router;