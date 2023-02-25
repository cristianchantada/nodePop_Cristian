var express = require('express');
const getFilterFunction = require("../models/modelQueries")
const getFunction = require("../models/modelQueries2")
var router = express.Router();
const Anuncio = require("../models/Anuncio");

// GET "/tags" --> Devuelve la lista de los tags permitidos en Nodepop.

router.get("/tags", (req, res, next) => {
  res.send({tags_permitidos: ["lifestyle", "work", "mobile", "motor"]});
});

// GET "/" --> Devuelve una lista filtrada de anuncios según los parámetros introducidos en la query string.

router.get("/", function (req, res, next){
  getFilterFunction(req, res, next);
})

// GET "/:id" --> Devuelve un anuncio buscado desde la url por id.

router.get("/:id", function (req, res, next){
  getFunction(req, res, next);
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

// PUT "/:id" --> Actualización de anuncio desde el request body (el ides enviado en la ruta).

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
