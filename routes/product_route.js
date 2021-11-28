// Importing the module
const express=require("express")
const multer  = require('multer');
const Product = require('../models/product');
const Restaurant = require('../models/restaurant');

const router=express.Router()			// Creating express Router

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

// http://127.0.0.1:3003/product---------------->Create a restaurant product   (post)
// here upload.single('product_image') means the key of file name is product_image
router.post('/:restaurant_id',upload.single('product_image'), (req,res)=>
{ 
    let newProduct=new Product(
        {   name : req.body.name,
            image:req.file.buffer,
            price : Number(req.body.price),
            category : req.body.category
        });
	try{
		Product.find({name:req.body.name}).then(products=>{
		//here our data will contains an array of all elements which got matched.
		if(products.length!=0)
		{
			res.json({success:false,msg:"This product already exists, Please enter Another Product"});			
		}
		else
		{
			newProduct.save((err)=>{
				if(err)
				{   
				   res.status(404).send({ error: error.message })
				}else
				{
					res.json({"msg":"product saved successfully"});
				}
			});
		
			// saving the id of products in restaurant products array
			Restaurant.updateOne(
				{ _id: req.params.restaurant_id }, 
				{ $push: { products: newProduct._id } },
				(error, success)=> {
					if (error) {
						console.log(error);
					} 
				});
		}
	})}
	catch
	{
		return data.json({success:false,msg:"There is an error"});
	}
});

// http://127.0.0.1:3003/6130b5e46b79d7900906b96d     ------->Change a restaurant product    (patch)
router.patch('/:id',(req,res)=>{
    try{
        Product.findByIdAndUpdate(req.params.id, { $set: req.body},(err, docs) =>
			{
				if (err){
						return res.status(500).send();
						}
				else{
					res.json({"message":"product updated successfully"});
					}
        	})
        } 
		catch (e) {
        			res.status(400).send(e)
        			} 
	});

//http://127.0.0.1:3003/product/delete/6130b4d36b79d7900906b962/6130e85b78cdb5bc13f9c5b1  ------->Delete a product from a restaurant

router.delete('/delete/:restaurant_id/:product_id', async (req, res) => 
{
	try {
		const product = await Product.findByIdAndDelete(req.params.product_id)
		if (!product) {
					return res.status(404).send("product is not available for delete.")
					}

			// deleting the product id from restaurant product array
			Restaurant.updateOne({_id:req.params.restaurant_id}, 
				{ $pull: {products: req.params.product_id } }
				,(err, docs) =>{
				if (err){
					console.log("------------------------");
					return res.status(500).send("error in deletion of product from products array.");
				}
				else{
					res.json({"message":"product Deleted successfully"});
				}
			})
		} 
		catch (e) 
		{	res.status(500).send(e);
		}	
})
	

//this route is for accesing the image in the browser
// get--------->http://127.0.0.1:3003/product/6130b5096b79d7900906b96a
router.get('/:id', async (req, res) => {
    try {
    const product = await Product.findById(req.params.id)
    if (!product || !product.image) {
    throw new Error()
    }
    res.set('Content-Type', 'image/jpg')
    res.send(product.image);
    } catch (e) {
    res.status(404).send()
    }
    })



module.exports=router
