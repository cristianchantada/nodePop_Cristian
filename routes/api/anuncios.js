const express = require("express");
const getFilterFunction = require("../../models/getFilterFunction");
const getIdFunction = require("../../models/getIdFunction");
const postFunction = require("../../models/postFunction");
const putFunction = require("../../models/putFunction");
const deleteFunction = require("../../models/deleteFunction");
const router = express.Router();
const Anuncio = require("../../models/Anuncio");

// GET "/api/anuncios/tags" --> Devuelve la lista de los tags permitidos en Nodepop.

router.get("/tags", (req, res, next) => {
    res.json({tags_permitidos: ["lifestyle", "work", "mobile", "motor"]});
  });

// GET "/api/anuncios/" --> Devuelve una lista filtrada de anuncios según los parámetros introducidos en la query string.

router.get("/", function (req, res, next){
    getFilterFunction(req, res, next);
});

// GET "/api/anuncios/:id" --> Devuelve un anuncio buscado desde la url por id.

router.get("/:id", async function (req, res, next){
    getIdFunction(req, res, next);
})

// POST "/api/anuncios" --> Inserción de anuncio desde el request body.

router.post("/", async function(req, res, next){
    postFunction(req, res, next);
});

// PUT "/api/anuncios/:id"  --> Actualización de anuncio desde el request body (el ides enviado en la ruta).

router.put("/:id", async function(req, res, next){
    putFunction(req, res, next);
});

// DELETE "/api/anuncios/:id" --> Borrado de anuncio desde la query string.

router.delete("/:id", async function(req, res, next){
    deleteFunction(req, res, next);
});

module.exports = router;

