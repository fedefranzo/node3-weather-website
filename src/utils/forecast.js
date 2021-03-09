const request = require ("request");

const forecast = (lat, long, callback) =>{
    const url = "http://api.weatherstack.com/current?access_key=65866d858632864c4fb0991f3467d9f8&query="+lat+","+long;
    request ({url, json: true}, (err,{body})=>{
        if(err){
            callback("Imposible conectarse al servicio Weather Stack", undefined);
        }else if(body.error){
            callback("Imposible encontrar la locacion", undefined);
        }else{
            callback(undefined, body.current.weather_descriptions + ". La temperatura actual es de: " + body.current.temperature + "°C. La sensacion termica es de: " + body.current.feelslike + "°C. La humedad es del " + body.current.humidity + " % y el viento es de " + body.current.wind_speed + " Km/h.")
        }
    })
}

module.exports = forecast;