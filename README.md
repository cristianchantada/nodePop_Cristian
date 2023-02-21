# Nodepop aplication de Cristian Varela Casas.
## Práctica del módulo Fundamentos backend del Bootcamp web 14 de Keepcoding.

### NodeApp

Install dependencies with:

```sh
npm install
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

##### GET /api/anuncios

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