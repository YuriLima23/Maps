const { Client } = require('pg');
var connectionString = "postgres://postgres:postgres@localhost:5432/maps"; 
const client = new Client({ connectionString: connectionString }); 
client.connect();
const express = require('express');
const fs =require('fs');
const router = express.Router();
var local = " ";
// AIzaSyAUu47m3VkanIHgkgaZKHBVBTGjnJL5FC8


router.get('/', (req,res) =>{
    client.query('SELECT * FROM CASA WHERE DONO_ID = $1',[req.session.user.id],(err,result) =>{
        res.render('mapa',result.rows[0]);
    });
});

router.get('/mapa/confirmar/:lat&lng',(req,res) =>{

});


// router.get('/',(req,res) =>{
//     client.query('SELECT * FROM casa where dono_id = $1',[req.session.user.id], (err,result) =>{
//         if(err){
//             console.log('Tem um erro aqui na query do mapa');
//         }else{
//             client.query('SELECT * FROM itens where casa_id = $1', [result.rows[0].id],(er,r)=>{
//                 if(er){
//                     console.log("não conseguiu o item");
//                 }else{
//             req.session.casa = result.rows[0];
//             res.render('mapa.ejs',{casa:result.rows[0] , obj:r.rows[0]});
//                 }
//             });
//     }
    
//     } );
      
  
    
// });

// router.get('/confirmar/:lat&:lng',(req,res) =>{
//     client.query('UPDATE casa SET lat = $1 ,lng= $2 WHERE dono_id = $3',[req.params.lat,req.params.lng,req.session.user.id], (error,result) =>{
//         if(error){
//             throw error;
            
//         }else{
//             client.query('SELECT * FROM casa WHERE dono_id = $1',[req.session.user.id],(err,re) =>{
//                 client.query('SELECT * FROM itens where casa_id = $1', [re.rows[0].id],(er,r)=>{
//                     if(er){
//                         console.log("não conseguiu o item");
//                     }
//                     else{
//                         req.session.itens = r.rows[0];
//                         req.session.casa = re.rows[0];
//                         res.render('mapa.ejs',{casa:re.rows[0],obj:re.rows[0]});
//                     }
                    
//                 });
             
//             });
           
//     }
//     });
    
   
// });

// router.post('/reciclar', (req,res) =>{

//     var g1 = req.body.grupo1;
//     var g2= req.body.grupo2;
//     var g3 = req.body.grupo3;
//     console.log("ENTORUU NO RECICLAR");
//     console.log(req.body);
//     client.query('INSERT INTO itens (grupo1,grupo2,grupo3,casa_id) VALUES ($1,$2,$3,$4)',[g1,g2,g3,req.session.casa.id],(err,result) =>{
//         if (err){
//             console.warn("NÂO FUNCIONOU");
//         }else{
//             res.render('mapa.ejs',{casa:req.session.casa, obj:" "});
            
//         }
//     });
   
// });


module.exports = router;