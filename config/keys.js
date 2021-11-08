if(process.env.NODE_ENV==='production'){
    console.log("prod");
    module.exports = require('./prod')
}else{
    module.exports = require('./dev')
} 
/* module.exports={
    MONGOURI:"mongodb+srv://admin:Tribers123%23@tribersjunction.fywsh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    JWT_SECRET:"qwerty12345"
}
 */