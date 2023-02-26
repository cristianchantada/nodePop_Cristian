const Anuncio = require("./Anuncio");

async function deleteFunction (req, res, next){
try {
    let anuncios = req.params.id;
    
    await Anuncio.deleteOne({_id: anuncios});

    if(req.originalUrl[1] !== "a"){
        anuncios = [anuncios];
        res.send("El anuncio ha sido borrado con éxito");
    } else {
        res.json("El anuncio ha sido borrado con éxito");
    }
    
} catch (error) {
    next(error);
}

}

module.exports = deleteFunction;