

function log(req,res,next){
 console.log('login....');
 next();   
}

function authentication(req,res,next){
    console.log('authentication.....');
    next();
}
module.exports.log=log;
module.exports.authentication=authentication;