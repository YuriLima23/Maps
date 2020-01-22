const { Client } = require('pg');
var connectionString = "postgres://postgres:postgres@localhost:5432/maps"; 
const client = new Client({ connectionString: connectionString }); 
client.connect();
const express = require('express');
const router = express.Router();


router.get('/',(req,res) =>{
    client.query('SELECT * FROM casa where dono_id = $1',[req.session.user.id],(err,result) =>{
        if(err){
            console.log("Encontrou um erro na busca de casas do  dono : ", err);
        }
       if (result.rowCount > 0){
           res.redirect('/mapa');
       }else{
        res.render('home');   
       }
    
    });

});

router.post('/cadastrar',(req,res) =>{
    client.query('SELECT * FROM casa where dono_id = $1',[req.session.user.id],(err,result) =>{
        if(err){
            console.log("Encontrou um erro na busca de casas do  dono : ", err);
        }
       if (result.rowCount > 0){
           res.redirect('/mapa');
       }
       else{
        var endereco = req.body.endereco;
        var num = req.body.numeroCasa;
        var bairro = req.body.bairro;
        client.query('INSERT INTO casa (endereco,numcasa,bairro,dono_id,andamento) VALUES ($1,$2,$3,$4,$5)',[endereco,num,bairro,req.session.user.id,false],(err,result) => {
            if(err){
                console.log("não deu pra cadastrar a casa");
            }else{
                req.session.casa = result.rows[0];
                res.redirect('/mapa');
            }
            
        });
     
       }
    })
  
    
});
  


module.exports = router;