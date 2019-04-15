const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./Utils/geocode');
const forecast = require('./Utils/forecast');


const app = express();

//Define paths for Express config
const publicDirPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname, 'templates/views');
// const viewsPath = path.join(__dirname, '/templates');
//above both the above lines will yield same output
const partialsPath = path.join(__dirname, '/templates/partials');

//Setup handlebar engines and views location
app.set('view engine','hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirPath));

 

app.get('',(req,res) => {
    res.render('index', {
        title : 'Weather',
        name : 'Anindita Chattopadhyay'
    });
     }
    //render the template. This is done by defining a new route and calling res.render with the template name. The “.hbs” file extension can be left off.
    // The second argument is an object that contains all the variables the template should have access to when rendering. 
);


//app is  used to set up the server
// //The code above uses app.get to set up a handler for an HTTP GET request. 
// //when we hit the path ('') in browser, then the function will get executed
// //First argument - req - short form of request - path to set the handler for
// //Second argument - res - short form of response - function to run when the path is visited
// 


app.get('/about',(req, res)=>{
    res.render('about', {
        title : 'Weather',
        name : 'Anindita Chattopadhyay',
        imgSrc : '/pics/me.jpg'
    });
})

app.get('/help',(req, res)=>{
    res.render('help', {
        title : 'Weather',
        name : 'Anindita Chattopadhyay'
    });
})



// Applying Query String for Weather page - localhost:3000/weather
app.get('/weather', (req,res) => {

    console.log(req.query.address);

    if(!req.query.address){
        return res.send({
            error : 'Please provide a search item for address'
        });
    }

    geocode(req.query.address, (error, {latitude, longitude, location} ={}) => {

        if (error) {
          return res.send({error});  
        }
        forecast(latitude, longitude, (error, forecastData) => {
    
          if (error) {
            return res.send({error});  
          }

        res.send({
            location: location,
            forecast : forecastData,
            address : req.query.address
        })

        });
    
      });
});


//wildcard character *  -- match anything that has not been matched yet
app.get('/help/*',(req,res)=> {
    res.render('404Error', {
        title : 404,
        errorMsg : 'Help page not found',
        name : 'Anindita Chattopadhyay'
    });
})

app.get('*',(req,res)=>{
    res.render('404Error',{
        title : 404,
        errorMsg : 'Page not found',
        name : 'Anindita Chattopadhyay'
    });
});


// start the server. This is done by calling app.listen with the port you want to listen on
app.listen(3000,()=>{
    console.log('server is up on port 3000');
});