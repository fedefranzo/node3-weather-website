const path = require("path");
const express = require ("express");
const hbs = require("hbs");
const forecast = require("./utils/forecast");
const geocode =require("./utils/geocode");

const app = express(); 

//Definicion de Path para la configuracion de Express
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join (__dirname, "../templates/partials");

//setup Handlebars engine and view location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath)

//Setup static drectory serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
    res.render("index", {
        title: "Weather",
        name: "Fede Franzo"
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "Sobre mi",
        name: "Fede Franzo"
    });
});

app.get("/help", (req, res) => {
    res.render("help", {
        message: "Soy tu ayuda",
        title: "Help",
        name: "Fede Franzo"
    });
});

app.get("/weather", (req, res) => {
    const address = req.query.address;
    if (!address){
        return res.send({error: "Debe proveer una localización"})
    }; 
    geocode (address, (err, {latitude, longitude, location}={})=>{
        if(err){
            return res.send ({error: err});
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(err){
                return res.send ({error: err});
            }
            res.send ({
                location,
                forecastData,
                address
            });
        });
    });
});

app.get("/products", (req, res) =>{
if(!req.query.search){
    return res.send({
        error: "Debes proveer un termino de busqueda"
    });
};

    console.log(req.query.search);
    res.send({
        products: []
    });
});

app.get("/help/*", (req, res) => {
    res.render("404", {
        title: 404,
        errorMessage: "Articulo de ayuda no encontrado",
        name: "Fede Franzo"
    });
});

app.get("*", (req, res) => {
    res.render("404", {
        title: 404,
        errorMessage: "Pagina no encontrada",
        name: "Fede Franzo"
    });
});

app.listen(3000, () => {
    console.log("Servidor corriendo en el puerto 3000");
});