schemaAnuncio.statics.lista = async function(filtro, skip, limit, sort, fields) {

    if(Object.keys(filtro).toString() === 'nombre'){
      const aaa = await Anuncio.find()

      const filt = []
      const bbb = aaa.forEach(a => {
        if(a.nombre.startsWith(filtro.nombre)){
        filt.push(a.nombre)

        return filt
      }
      })
      const query = Anuncio.find({ nombre : filt }); 
      query.skip(skip);
      query.limit(limit);
      query.sort(sort);
      query.select(fields);
      return query.exec();

    }
    else {
      const query = Anuncio.find(filtro); 
      query.skip(skip);
      query.limit(limit);
      query.sort(sort);
      query.select(fields);
      return query.exec();
    }
  }