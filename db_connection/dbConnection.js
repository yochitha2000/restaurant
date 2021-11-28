var mongoose=require('mongoose');

databaseConnectivity=()=>
{
    // connection to database
    mongoose.connect('mongodb://localhost:27017/Restaurant_System',{useNewUrlParser: true,useUnifiedTopology: true } );
    mongoose.connection.on('connected',()=>{
        console.log("connected to the database--");
    })

    mongoose.connection.on('error',(err)=>
    {
        if(err)
        {
            console.log("errror in conection ,"+err);
        }
        else
        {console.log("error in the db connectivity.....");}
    
    })
}

module.exports=databaseConnectivity;