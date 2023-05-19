# Aplicación Nodepop de Cristian Varela Casas.
## Práctica del módulo Fundamentos backend del Bootcamp web 14 de Keepcoding.

### Notas Javier práctica Backend AVANZADO:

Puedes realizar login también desde el web site, lo he dejado igual a hacerlo por postman, es decir, verás que tan solo te devuelve el token

### NodeApp

Install dependencies with:

```sh
npm install
```

Copy .env.example to .env and customize your variables.

```sh
cp .env.example .env
```

Initialize the database with:

```sh
npm run initDB
```

Start in development mode:

```sh
npm run dev
```

#### General info

Application created with:

```sh
npx express-generator nodeapp --ejs
```

#### Start a MongoDB Server in Macos or Linux

In the console go to MongoDB folder and:

```sh
./bin/mongod --dbpath ./data
```

#### API Methods

Usted necesitará una base de datos MongoDB.

La conexión se localiza en .lib/connectMongoose.js

##### GET /api/anuncios/tags --> Devuelve la lista de tags permitidos en Nodepop.

{
    "tags_permitidos": [
        "lifestyle",
        "work",
        "mobile",
        "motor"
    ]
}

##### GET /api/anuncios   o    GET "/api/anuncios/:id  --> Devuelve todos / o el anuncio filtrado por su iD.

{
    "anuncios": [
        {
            "_id": "63f4b073ec1b7490eb8f9bc6",
            "nombre": "Caja de melocotones",
            "venta": true,
            "precio": 9.99,
            "foto": "melocotones.jpg",
            "tags": [
                "lifestyle"
            ],
            "__v": 0
        }
    ]
}

##### POST "/api/anuncios"

Devuelve JSON con el anuncio insertado en la API.

##### PUT "/api/anuncios"

Devuelve JSON del anuncio actualizado.

##### DELETE "/api/anuncios/:id"

Confirma borrado de anuncio.

---------------------------------------------------------------------

#### WEB Methods:

##### GET "/tags"

Devuelve la lista de los tags permitidos en Nodepop.

##### GET "/"

Devuelve una lista filtrada de anuncios según los parámetros introducidos en la query string.

##### GET "/:id"

Devuelve un anuncio buscado desde la url por id.

##### POST "/"

Inserción de anuncio desde el request body.

##### PUT "/"

Actualización de anuncio desde el request body (el ides enviado en la ruta).

##### DELETE "/:id"

Borrado de anuncio desde la query string.
