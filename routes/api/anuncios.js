const express = require("express");
const router = express.Router();
const Anuncio = require("../../models/Anuncio");

// GET api/anuncios/ --> Devuelve una lista filtrada de anuncios según los parámetros introducidos en la query string.

    router.get("/", async function (req, res, next){
        try {

            const filterByName = req.query.nombre;
            const filterBySale = req.query.venta;
            const filterByPrice = req.query.precio;
            const filterByTags = req.query.tag;

            const select = req.query.select;
            const skip = req.query.skip;
            const limit = req.query.limit;
            const sort = req.query.sort;

            const filtro = {};

            if (filterByName) {
                filtro.nombre = filterByName;
              }
            
            if (filterBySale) {
            filtro.venta = filterBySale;
            }

            if (filterByPrice) {
            filtro.precio = filterByPrice;
            }

            if (filterByTags) {
            filtro.tag = filterByTags;
            }


            const anuncios = await Anuncio.filtrado(filtro, select, skip, limit, sort);
            res.render("index", {resultado: anuncios});

        } catch (error) {
            next (error);
        }
    })

// GET /api/anuncios/:id --> Devuelve un anuncio buscado desde la url por id.

router.get("/:id", async function (req, res, next){
    try {
        const anuncioId = req.params.id;
        const anuncioDevuelto = await Anuncio.findById(anuncioId);
        res.render("index", {resultado: [anuncioDevuelto]});

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

        res.render("index", {resultado: [resultado]});
        
    } catch (error) {
        next(error);
    }
});

// PUT /api/anuncios  --> Actualización de anuncio desde el request body (el ides enviado en la ruta).

router.put("/:id", async function(req, res, next){
    try {
        const anuncioId = req.params.id
        const anuncioDatos = req.body;

        const anuncioUpdated = await Anuncio.findByIdAndUpdate(anuncioId, anuncioDatos, {new: true});

        res.render("index", {resultado: [anuncioUpdated]});
        
    } catch (error) {
        next(error);
    }
});

// DELETE /api/anuncios/:id --> Borrado de anuncio desde la query string.

router.delete("/:id", async function(req, res, next){
    try {
        const anuncioId = req.params.id;
        
        await Anuncio.deleteOne({_id: anuncioId});

        res.render("index", {resultado: [{delete: true}]});
        
    } catch (error) {
        next(error);
    }
});

module.exports = router;