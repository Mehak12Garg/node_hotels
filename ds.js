const mongoose=require('mongoose');
//Define the Mongodb connection URL
const mongoURL='mongodb://localhost:27017/hotels'
//SEt up MOngoDb connection
mongoose.connect(mongoURL,
    {useNewUrlParser:true,
        useUnifiedTopology:true,
    });
    const db=mongoose.connection;
    db.on('connected',()=>{
        console.log('MongoDb connected successfully');
    })
    db.on('disconnected',()=>{
        console.log('MongoDb disconnected successfully');
    })
    db.on('error',()=>{
        console.log('MongoDb connection error');
    });
    module.exports=db;