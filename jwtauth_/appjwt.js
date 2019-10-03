var express = require("express");
var jwt = require("jsonwebtoken");
var app = express();

app.get('/api',function(req,res){

res.json({

	message: 'Welcome to the API'
});

});
//we are going to protect this route,therefore add middleware to it for verifying
app.post('/api/posts',verifyToken,function(req,res){
//(token,secret,function(err,data))
jwt.verify(req.token,'secretkey',(err,authData)=>{

if (err) throw err;

else
	res.json({
		message: 'Post created',
	    authData
	

		});
});
});
app.post('/api/login',function(req,res){
// mock user

	var user = {

		id:1,
		username:'mohit',
		email:'mohitsoodaut@gmail.com'
	}

	//jwt.sign(user,secret,claim,function)->syntax

jwt.sign({user:user},'secretkey',{expiresIn:'120s'},function(err,token){

if(err) throw err;
else
res.json({


	token:token
	
});
});
});
//format of token
//Authorization:Bearer<access_token>

//verify token
//It is a middleware function therfore it calls the next to proceed


function verifyToken(req,res,next)
{
	//Get auth header value

	const bearerHeader = req.headers['authorization'];
		//check if bearer is undefined
		if(typeof bearerHeader !== 'undefined'){
            //split at the space

            const bearer = bearerHeader.split(' ');
            //It is converting string in to the array 
            //Token is starting at the index position [1]
            //get  token from the array
            const bearerToken = bearer[1];
            //set the token
            req.token=bearerToken;
            //Next middleware
            next();


		}
		else
		{
			//forbidden
			res.sendStatus(403);
		}

}












app.listen(3000,function(req,res){

console.log("Youa are listening on the port 3000");
});