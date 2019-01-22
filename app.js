const startupDebugger=require('debug')('app:startup');
const dbDebugger=require('debug')('app:db');
const dbDebuggerNext=require('debug')('ap:dbNext');
const config=require('config');
const morgan=require('morgan');
const helmet=require('helmet');
const lodder=require('./lodder');
const Joi = require('joi');
const express=require('express');
const app=express();

app.set('view engine','pug');//loading pug internally by express
app.set('views','./views');//defult and optional setting

//Debuger Module
startupDebugger('app:startup.....');
dbDebugger('app:dbDebugger......');
dbDebuggerNext('lskdjflskdjf');

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(express.static('public'));
app.use(helmet());

console.log("name: "+config.get('name'));
console.log("host: "+config.get('mail.host'));
console.log('App Password '+config.get('mail.password'));
// if(app.get('env')==='development')
// console.log(process.env.NODE_ENV);
// if(process.env.NODE_ENV==='development')
//     app.use(morgan('tiny'));
if(app.get('env')==='development'){
    app.use(morgan('tiny'));
}

 
const courses=[
    {id:1, name:"course1"},
    {id:2, name:"course2"}, 
    {id:3, name:"course3"}
];
app.get('/',(req,res)=>{
    res.render('index',{title:"my express app",message:"hello"})
});

app.get('/api/courses',(req,res)=>{
    res.send(courses);
});

app.get('/api/courses/:id',(req,res)=>{
    const course=courses.find(c=> c.id === parseInt(req.params.id));
    if(!course){
        res.status(404).send('the course id not found');
        return;
    }
    res.send(course);
});

app.post('/api/courses',(req,res) =>{
    const result= validateCourse(req.body);
    if(result){
        res.status(400).send(result.details[0].message);
        
        return;
    }
    //console.log(result);
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);    
});

app.put('/api/courses/:id',(req,res)=>{
    const course = courses.find(c=>c.id === parseInt(req.params.id));
    if(!course){
        res.status(404).send('object not found');
        return;
    }
    const result = validateCourse(req.body);
    if(result){
        res.status(400).send(result.details[0].message);
        return;
    }
    courses[req.params.id - 1].name = req.body.name;
    res.send(courses);
});
app.delete('/api/courses/:id', (req,res)=>{
    if(!courses.find(c=>c.id === parseInt(req.param.id))){
        res.status(404).send('obect not found');
        return;
    }
    
});
function validateCourse(course){
    const schema={
        name: Joi.string().min(3).required()
    };
    const {error}=Joi.validate(course,schema);
    return error;
}
const port=process.env.PORT || 5000;
app.listen(port,()=>console.log('listenig on the port '+port));
 