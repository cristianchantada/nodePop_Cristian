const Anuncio = require("./Anuncio");

async function postFunction(req, res, next){
    try {

        const anuncioDatos = req.body;
        const anuncioDevuelto = new Anuncio(anuncioDatos);

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