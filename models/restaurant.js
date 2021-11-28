const mongoose = require('mongoose');
const Product = require('./product');
const Schema = mongoose.Schema;

const restaurantSchema = Schema({
  image: {type:Buffer,required:true},
  name: { type: String, required: true, trim: true },
  address: { type: String, required: true, trim: true },
  opening_hours:{ type: String, required: true, trim: true },   
  products: 
            [
                { type: Schema.Types.ObjectId, ref: 'Product' }
            ]
});

// restaurantSchema.index({"content" : "text"},{"name":1},{unique:true});
module.exports = mongoose.model('Restaurant', restaurantSchema);

