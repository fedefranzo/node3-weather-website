const request = require("request");

const geocode = (address, callback) =>{
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiZmVkZWZyYW56byIsImEiOiJja2xzMHU2ZHUwNGd2Mm9uNXU0ODdhOTl1In0.wg60rMvjt_igGAZMa9hZ1Q&limit=1"
    request ({ url, json: true}, (err, {body})=>{
    if (err){
        callback("Imposible conectarse al servicio de localizacion", undefined)
    } else if(body.features.length === 0){
        callback("Imposible encontrar la ubicacion, pruebe buscando nuevamente", undefined)  
    }else{
        callback(undefined, {
            latitude: body.features[0].center[1],
            longitude: body.features[0].center[0],
            location: body.features[0].place_name
        })
    }
    })
}

module.exports = geocode;