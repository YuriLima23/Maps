const { Client } = require('pg');
var connectionString = "postgres://postgres:postgres@localhost:5432/maps"; 
const client = new Client({ connectionString: connectionString }); 
client.connect();
var express = require('express');
var router = express.Router();

router.get('/',(req,res) =>{
    res.render('register');
});

router.post('/cadastrar',(req,res) => {
    client.query('INSERT INTO pessoa (nome,email,senha) VALUES ($1 ,$2 ,$3)',[req.body.username,req.body.email,req.body.pass],(err,result) =>{
        if(err){

                console.log('não deu pra cadastrar na tabela pessoa');
                console.log(err);
        }else {
            console.log('Cadastrou ');
            res.redirect('/login');
        }
    });
    
});





module.exports = router;