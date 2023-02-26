const Anuncio = require("./Anuncio");

async function putFunction(req, res, next){
    try {
        const anuncioId = req.params.id;
        const anuncioDatos = req.body;
  
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