const { Client } = require('pg');
var connectionString = "postgres://postgres:postgres@localhost:5432/maps"; 
const client = new Client({ connectionString: connectionString }); 
client.connect();
var express = require('express');
var router = express.Router();



router.get('/', (req,res) => {
    client.query('INSERT INTO visita (data_visita,completo, casa_id) VALUES ($1,$2,$3)',[req.body.data_visita,false,req.body.id],(err,result)=>{
        if(err){
            console.log('DEU ERRO POW');
        }else{
            client.query('SELECT * FROM casa',(err,re) =>{
                res.render('Cooperativa/copHome',{visita:result.rows[0],casas:re.rows,});
            });
        }
    });

});



exports.module = router;












module.exports= router;
