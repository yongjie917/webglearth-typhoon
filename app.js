/**
 * app entry
 */
'use strict'

const path=require('path');
const express=require('express');
const bodyParser=require('body-parser');
const Typhoon=require('node-typhoon');
const app=express();

app.set('port',(process.env.PORT || 3000));

app.use('',express.static(path.join(__dirname,'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// Additional middleware which will set headers that we need on each request.
app.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Disable caching so we'll always get the latest comments.
    res.setHeader('Cache-Control', 'no-cache');
    next();
});
//get real-time typhoon information 
app.get('/api/typhoonActivity',(req,res)=>{
	Typhoon.typhoonActivity().then(info=>{
		res.send(info);
	}).catch(err=>{
		res.send(err);
	});
});
//get historical typhoon information 
app.get('/api/typhoonList',(req,res)=>{
	let year=new Date().getFullYear();
	Typhoon.typhoonList(year).then(info=>{
		res.send(info);
	}).catch(err=>{
		res.send(err);
	});
});

app.listen(app.get('port'),()=>{
	console.log('Server started: http://localhost:'+app.get('port')+'/');
});