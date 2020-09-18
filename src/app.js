const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app =  express()

//Define paths for Express config
const dirIndex=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//set static directory to serve
app.use(express.static(dirIndex))


app.get('',(req,res) =>{
    res.render('index',{
        title: 'Weather',
        name: 'LCGG'
    })
})

app.get('/weather',(req,res)=> {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term!'
        })
    }
    geocode(req.query.search,(error, {latitude,longitude,location}={}) => {
        if (error) {
            return res.send({ error })
        } 
        forecast(latitude,longitude,(error,forecastData) => {
                if (error) {
                    res.send({ error })
                }
                res.send({
                    forecast : forecastData,
                    location:  location,
                    address: req.query.search     
                })
            })
        
    })
    /* res.send({
        forecast: 'It is snowing',
        location: 'Philadelphia',
        address: req.query.search
    }) */
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:' About Me',
        name: 'LCGG'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help page',
        name: 'LCGG'
    })
})

/* app.get('/products',(req,res)=> {

    if(!req.query.search){
        return res.send({
            error: 'Yoy must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
}) */
/* app.get('',(req,res)=>{
    res.send('Hello express!')

}) */
/* app.get('/help',(req,res)=>{
    res.send('Help page!')

}) */
/* app.get('/about',(req,res)=>{
    res.send('<h1>About page!</h1>')
}) */
/*  */
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: '404 help page',
        text: 'Non existent help page',
        name:'LCGG'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title: '404',
        text: 'Non existent page',
        name: 'LCGG'
    })
})

app.listen(3000,()=>{
    console.log('Server is up on port 3000.')
})