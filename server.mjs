import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
const app = express()
app.use(express.json())
app.use(cors())
const port = process.env.PORT || 3000

const userSchema = new mongoose.Schema({
    name: {type : String, required : true},
    email : {type : String, lower : true , required : true},
    password : {type : String , required : true},
    createdOn : {type : Date , default : Date.now}
  });


  const userModel = mongoose.model('User', userSchema);



app.post('/signup', (req, res) => {
  
   let body = req.body

   if(!body.name || !body.email || !body.password){
    
       res.status(401).send(`Please Fill All Required Fields
          
            {
                name : "john",
                email : "john@mail.com",
                password : "1234"
            }
       `)
       return;
   }


   let newUser = new userModel({
        
       name : body.name,
       email : body.email.toLowerCase(),
       password : body.password
      
    })
    newUser.save((error,result) => {
         
         if(!error){
            res.status(201).send({message : "User is Signup"})
         }else{
            res.status(500).send({message : "Internal Server Error"})

         }

    })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


let dbURI = "mongodb+srv://abc:abc@cluster0.ko1vloy.mongodb.net/socialMediaBase?retryWrites=true&w=majority";
// let dbURI = 'mongodb://localhost/mydatabase';
mongoose.connect(dbURI);


////////////////mongodb connected disconnected events///////////////////////////////////////////////
mongoose.connection.on('connected', function() {//connected
    console.log("Mongoose is connected");
    // process.exit(1);
});

mongoose.connection.on('disconnected', function() {//disconnected
    console.log("Mongoose is disconnected");
    process.exit(1);
});

mongoose.connection.on('error', function(err) {//any error
    console.log('Mongoose connection error: ', err);
    process.exit(1);
});

process.on('SIGINT', function() {/////this function will run jst before app is closing
    console.log("app is terminating");
    mongoose.connection.close(function() {
        console.log('Mongoose default connection closed');
        process.exit(0);
    });
});
////////////////mongodb connected disconnected events///////////////////////////////////////////////