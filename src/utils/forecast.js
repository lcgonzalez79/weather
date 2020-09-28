request = require ('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=38fb9302f8198ef51ce70f267253c6f0&query='+ longitude +','+ latitude;
    console.log(url)
    request ( {url, json:true}, (error, {body}={}) => {
        if(error){
            callback('Unable to connect to location services',undefined);
        }else if(body.error){
            callback('Please specify a valid location!',undefined);
        }else{
            callback(undefined,{
                description: body.current.weather_descriptions[0],
                temperature: body.current.temperature,
                feels: body.current.feelslike,
                humidity: body.current.humidity
            })
        }
    })

}

module.exports = forecast

