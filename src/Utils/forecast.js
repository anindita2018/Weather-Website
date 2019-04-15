const request = require('request')

//by using callback
   
const forecast = (latitude, longitude, callback) => 
{ 
    const url = `https://api.darksky.net/forecast/6ba41a377efd5241ad9a654799a5d029/${latitude},${longitude}`; 

    request({ url: url, json: true }, (error, {body}={}) => {
      if(error){
         callback('Unable to connect to the internet',undefined);
       }
      else if(body.error){
         callback('Unable to find proper match',undefined);
      }else{
         callback(undefined,`${body.daily.data[0].summary} It's currently ${body.currently.temperature} degrees out. There is a ${body.currently.precipProbability}% chance of rain.`);
     }
    });
}


module.exports =  forecast;