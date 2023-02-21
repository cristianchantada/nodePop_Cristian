const express = require("express");
const router = express.Router();
const Anuncio = require("../../models/Anuncio");

// GET api/anuncios/ --> Devuelve una lista filtrada de anuncios según los parámetros introducidos en la query string.

    router.get("/", async function (req, res, next){
        try {
            const query = req.query;

            const filterByName = query.nombre;
            const filterBySale = query.venta;
            const filterByPrice = query.precio;
            const filterBytag = query.tag;

            const select = query.select;
            const skip = query.skip;
            const limit = query.limit;
            const sort = query.sort;


            const anuncios = await Anuncio.find();
            res.json({anuncios: anuncios});

        } catch (error) {
            next (error);
        }
    })

// GET /api/anuncios/:id --> Devuelve un anuncio buscado desde la url por id.

router.get("/:id", async function (req, res, next){
    try {
        const anuncioId = req.params.id;
        const anuncioDevuelto = await Anuncio.findById(anuncioId);
        res.json({anuncio: anuncioDevuelto});

    } catch (error) {
        next (error);
    }
})

// POST /api/anuncios --> Inserción de anuncio desde el request body.

router.post("/", async function(req, res, next){
    try {
        const anuncioDatos = req.body;
        const anuncio = new Anuncio(anuncioDatos);

        const resultado = await anuncio.save();

        res.json({Anuncio_añadido: resultado});
        
    } catch (error) {
        next(error);
    }
});

// PUT /api/anuncios  --> Actualización de anuncio desde el request body (el ides enviado en la ruta).

router.post("/:id", async function(req, res, next){
    try {
        const anuncioId = req.params.id
        const anuncioDatos = req.body;

        const anuncioUpdated = await Anuncio.findByIdAndUpdate(anuncioId, anuncioDatos, {new: true});

        res.json({result: anuncioUpdated});
        
    } catch (error) {
        next(error);
    }
});

// DELETE /api/anuncios/:id --> Borrado de anuncio desde la query string.

router.post("/:id", async function(req, res, next){
    try {
        const anuncioId = req.params.id;
        
        await Anuncio.deleteOne({_id: anuncioId});

        res.json({delete: true});
        
    } catch (error) {
        next(error);
    }
});


module.exports = router;