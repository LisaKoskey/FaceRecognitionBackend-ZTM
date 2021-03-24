const express=require('express');
const bcrypt=require('bcrypt-nodejs')
const app=express()
const cors=require('cors')
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors())
const knex = require('knex');

const routeRegister = require('./RouteControllers/routeRegister');
const routeSignIn = require('./RouteControllers/routeSignin');
const routeProfile = require('./RouteControllers/routeProfile');
const routeImage = require('./RouteControllers/routeImage');

const db=knex({
    client: 'pg',
    connection: {
      //FYI 127.0.0.1 is just localhost
      host : '127.0.0.1',
      user : 'postgres',
      password : '6836',
      database : 'smartbrain'
    }
  });


//added bcrypt to compare pw to hashed pw
app.post('/signIn',(req,res)=>{routeSignIn.handleSignin(req,res,db,bcrypt)})
app.post('/register',(req,res)=>{routeRegister.handleRegister(req,res,bcrypt,db)})
app.get('/profile/:id',(req,res)=>{routeProfile.handleProfile()})
app.put('/image',(req,res)=>{routeImage.handleImage(req,res,db);console.log('atrouteImage')})
app.post('/imageURL',(req,res)=>{routeImage.handleClarifaiAPI(req,res);console.log('atClarifaiAPI')})

app.listen(process.env.PORT||3000,()=>{
    console.log('server is listening on port ${process.env.PORT}')
}) 
