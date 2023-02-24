var express = require('express');
var router = express.Router();
const Anuncio = require("../models/Anuncio");

// GET "/tags" --> Devuelve la lista de los tags permitidos en Nodepop.

router.get("/tags", (req, res, next) => {
  res.send({tags_permitidos: ["lifestyle", "work", "mobile", "motor"]});
});

// GET "/" --> Devuelve una lista filtrada de anuncios según los parámetros introducidos en la query string.

router.get("/", async function (req, res, next){
  try {

/*  const filterByName = new RegExp('^' + req.query.nombre, "i"); */

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
        filtro.nombre = filterByName;
      }
    
    if (filterBySale) {
    filtro.venta = filterBySale;
    }

    if (filterByPrice) {
    filtro.precio = filterByPrice;
    }

    if (filterByTags) {

/*       // Filtrado de tags para que solo sean válidos: lifestyle, work, mobile y motor.
      filterByTags.forEach(item =>{
        const tagsPermitidos = ["lifestyle", "work", "mobile", "motor"];
        if(tagsPermitidos.includes(item) === false){
          next(`El tag no está permitido en Nodepop`);
        }
      }) */

      filtro.tags = filterByTags;
    }


      const anuncios = await Anuncio.filtrado(filtro, select, skip, limit, sort);
      res.render("index", {resultado: anuncios});

  } catch (error) {
      next (error);
  }
})

// GET "/:id" --> Devuelve un anuncio buscado desde la url por id.

router.get("/:id", async function (req, res, next){
  try {
      const anuncioId = req.params.id;
      var anuncios = await Anuncio.findById(anuncioId);
      res.render("index", {resultado: [anuncios]});

  } catch (error) {
      next (error);
  }
})

// POST "/" --> Inserción de anuncio desde el request body.

router.post("/", async function(req, res, next){
  try {
      const anuncioDatos = req.body;
      const anuncioDevuelto = new Anuncio(anuncioDatos);

      var anuncios = await anuncioDevuelto.save();

      res.render("index", {resultado: [anuncios]});
      
  } catch (error) {
      next(error);
  }
});

// PUT "/" --> Actualización de anuncio desde el request body (el ides enviado en la ruta).

router.put("/:id", async function(req, res, next){
  try {
      const anuncioId = req.params.id
      const anuncioDatos = req.body;

      var anuncios = await Anuncio.findByIdAndUpdate(anuncioId, anuncioDatos, {new: true});

      res.render("index", {resultado: [anuncios]});
      
  } catch (error) {
      next(error);
  }
});

// DELETE "/:id" --> Borrado de anuncio desde la query string.

router.delete("/:id", async function(req, res, next){
  try {
      const anuncios = req.params.id;
      
      await Anuncio.deleteOne({_id: anuncios});

      res.send("Anuncio borrado correctamente");
      
  } catch (error) {
      next(error);
  }
});

module.exports = router;
