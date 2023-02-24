const express = require("express");
const router = express.Router();
const Anuncio = require("../../models/Anuncio");

// GET "/api/anuncios/tags" --> Devuelve la lista de los tags permitidos en Nodepop.

router.get("/tags", (req, res, next) => {
    res.json({tags_permitidos: ["lifestyle", "work", "mobile", "motor"]});
  });

// GET "/api/anuncios/" --> Devuelve una lista filtrada de anuncios según los parámetros introducidos en la query string.

router.get("/", async function (req, res, next){
    try {
        const filterByName = req.query.nombre;
        const filterBySale = req.query.venta;
        const filterByPrice = req.query.precio;
        const filterByTags = req.query.tags;

        const select = req.query.select;
        const skip = req.query.skip;
        const limit = req.query.limit;
        const sort = req.query.sort;

        const filtro = {};

        if (filterByName) {
            filtro.nombre = new RegExp('^' + req.query.nombre, "i");
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
            filterByTags = [filterByTags]
        }

        filterByTags.forEach(item =>{
            const tagsPermitidos = ["lifestyle", "work", "mobile", "motor"];
            if(tagsPermitidos.includes(item) === false){
            res.send("Ha introducido alguna tag no válida en NodeApp; Solo se admiten 'lifestyle', 'motor', 'work' y 'mobile'")
            }
        });

        filtro.tags = filterByTags;
        }

        const anuncios = await Anuncio.filtrado(filtro, select, skip, limit, sort);
        res.json({resultado: anuncios});

    } catch (error) {
        next (error);
    }
})

// GET "/api/anuncios/:id" --> Devuelve un anuncio buscado desde la url por id.

router.get("/:id", async function (req, res, next){
    try {
        const anuncioId = req.params.id;
        var anuncios = await Anuncio.findById(anuncioId);
        res.json({resultado: [anuncios]});

    } catch (error) {
        next (error);
    }
})

// POST "/api/anuncios" --> Inserción de anuncio desde el request body.

router.post("/", async function(req, res, next){
    try {
        const anuncioDatos = req.body;
        const anuncioDevuelto = new Anuncio(anuncioDatos);

        var anuncios = await anuncioDevuelto.save();

        res.json({resultado: [anuncios]});
        
    } catch (error) {
        next(error);
    }
});

// PUT "/api/anuncios"  --> Actualización de anuncio desde el request body (el ides enviado en la ruta).

router.put("/:id", async function(req, res, next){
    try {
        const anuncioId = req.params.id
        const anuncioDatos = req.body;

        var anuncios = await Anuncio.findByIdAndUpdate(anuncioId, anuncioDatos, {new: true});

        res.json({resultado: [anuncios]});
        
    } catch (error) {
        next(error);
    }
});

// DELETE "/api/anuncios/:id" --> Borrado de anuncio desde la query string.

router.delete("/:id", async function(req, res, next){
    try {
        const anuncios = req.params.id;
        
        await Anuncio.deleteOne({_id: anuncios});

        res.json({resultado: [{delete: true}]});
        
    } catch (error) {
        next(error);
    }
});

module.exports = router;

