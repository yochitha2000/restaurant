const express=require('express');
const router = express.Router();
const multer  = require('multer');
const Restaurant = require('../models/restaurant');

//http://127.0.0.1:3003/restaurant   list all restaurants    (get) 
router.get('/',(req,res)=>{
    Restaurant.find(function(err,restaurants)
    {
        if(err)
        {
            res.json({"msg":"failed to fetch data"});
        }
        else
        {
            res.json(restaurants);
        } 
        
    })
});

// contains all the logic that which all extenstions are allowed
const upload = multer({
    limits: {   fileSize: 1000000},
    fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    return cb(new Error('Please upload a Word document'))
    }
    cb(undefined, true)
    }
    })

// http://127.0.0.1:3003/restaurant------------>Register new restaurants   (post)
router.post('/',upload.single('restaurant_image'),(req,res)=>
{   
    let newRestaurant=new Restaurant(
        {   name : req.body.name,
            image:req.file.buffer,
            address : req.body.address,
            opening_hours : req.body.opening_hours,
        }
    );
	try{
        // logic for avoiding duplicate entries   
		    Restaurant.find({$or:[{name:req.body.name},{address:req.body.address}]}).then(restaurants=>{
            //here our data will contains an array of all elements which got matched.
                if(restaurants.length!=0)
                {
                    res.json({success:false,msg:"Data already exists, Please enter Another name"});	
                }
                else
                {
                    newRestaurant.save((err)=>{
                        if(err)
                        {   console.log(err,"======",req);
                            res.json({data:"error in saving of data"});
                        }else
                        {
                            res.json({data:"restaurant saved successfully"});
                        }
                    });
                }
            });
    }catch(e)
    {
        return data.json({success:false,msg:"There is an error"});
    }

    });

// http://127.0.0.1:3003/restaurant/6130b4d36b79d7900906b962 -->Change a restaurant's data  patch
router.patch('/:id',(req,res)=>{
    try{
        Restaurant.findByIdAndUpdate(req.params.id, { $set: req.body},(err, docs) =>{
            if (err){
                console.log("error----------->",err);
                return res.status(404).send()
            }
            else{
                res.json({"msg":"product updated successfully"});
            }
        })
        } catch (e) {
        res.status(400).send(e)
        } });


// http://127.0.0.1:3003/restaurant/6130b4d36b79d7900906b962 ---->List all the products of a restaurant  (get)
router.get('/:restaurant_id',async (req, res) => {
    await Restaurant.find({_id:req.params.restaurant_id}).populate('products').exec((err,products) => {
    if (!products) {
    return res.status(404).send();
    }
    if(err)
    {
        res.status(500).send();
    }
     res.json(products);
    });

    });
    

// http://127.0.0.1:3003/restaurant/6130b4d36b79d7900906b962  ----->Change a restaurant's data (patch)
router.patch('/:id',(req,res)=>{
    try{
        Restaurant.findByIdAndUpdate(req.params.id, { $set: req.body},(err, docs) =>{
            if (err){
                return res.status(500).send();
            }
            else{
                res.json({"msg":"product updated successfully"});
            }
        })
        } catch (e) {
        res.status(400).send(e)
        } });


module.exports=router;