const request = require('request')

//by using callback
   
const geocode = (address, callback) => 
{ 
   const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+ encodeURIComponent(address) +".json?access_token=pk.eyJ1IjoiYW5pbmRpdGFjIiwiYSI6ImNqdHFxb3g2NDBnbGg0ZGxsbWdnczdjb28ifQ.l1a8Qn_3yNqJHPOYDYWpDQ";    
   
   request({ url, json: true }, (error, {body}={}) => {
      if(error){
         callback('Unable to connect to the internet',undefined);
       }
      else if(body.features === undefined || body.features.length === 0){
         callback('Unable to find proper match',undefined);
      }else{
         callback(undefined, {
            latitude : body.features[0].center[1],
            longitude : body.features[0].center[0],
            location : body.features[0].place_name
         });
     }
    });
}

module.exports =  geocode;