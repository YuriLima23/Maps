const { Client } = require('pg');
var connectionString = "postgres://postgres:postgres@localhost:5432/maps"; 
const client = new Client({ connectionString: connectionString }); 
client.connect();
var express = require('express');
var router = express.Router();

router.get('/', (req,res,next) =>{
	res.render('login',{msg:""});	
	
});

router.get('/login', (req,res) =>{
	res.render('login',{msg:""});
	
});

router.post('/sign', (req,res) => {
	var pass = req.body.pass;
	var email = req.body.email;
	
	if(email != "cooperativa_recicla@hotmail.com"){
	
	var user = client.query ('SELECT * FROM pessoa WHERE email = $1 and senha =$2',[email,pass],
	 (err,result) => {
		if(err){
			console.log(err);
		}
		if (result.rowCount > 0){
			req.session.sucess = true;
			req.session.user = result.rows[0];
			res.redirect('home');
			
		}
		else{
			req.session.sucess = false;
			res.render('login', {msg:"user invalid, try again"});
			return;
		}
	
	});
}else{
	 client.query ('SELECT * FROM pessoa WHERE email = $1 and senha =$2',[email,pass],(er,re) => {
		if(er){
			console.log("não funcionou ");
			req.session.sucess = false;
		}
		else{
			req.session.sucess = true;
			req.session.user = re.rows[0];
			client.query('SELECT * FROM CASA',(e,rs) =>{
				if(e){
					console.log(" tem algo errado");
				}else{
					res.render('Cooperativa/copHome');
				}
				
			});
			
		}
	 });

}

	


	

});





module.exports= router;
