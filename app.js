const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session')
const uuid = require('uuid/v4');
const flash = require("connect-flash");
var indexRouter = require('./routes/index');
const login = require('./routes/login');
const register = require('./routes/register');
const usersRouter = require('./routes/users');
const home = require('./routes/home');
const mapa = require('./routes/mapa');
const copHome = require('./routes/cooperativa/copHome');




const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded({extended: true}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret:'teste',saveUninitialized:true, resave:true , sucess: false, user:{id:"", nome:"" ,email:"",senha:"" },casa : {},message:"",itens:{}}));
app.use(flash());



app.use('/', login);
app.use('/login',login);
app.use('/login/sign',login);
app.use('/register/',register);
app.use('/register/cadastrar',register);
app.use('/home',home);
app.use('/home/cadastrar',home);
app.use('/mapa',mapa);
app.use('/mapa/confirmar/:lat&:lng',mapa);
app.use('/mapa/reciclar',mapa);

app.use('/Cooperativa/copHome', copHome);
app.use('/confirma',copHome);


app.listen(3000,(req,res) =>{
  console.log("Esta rodando na porta 3000");
  
});
module.exports = app;
