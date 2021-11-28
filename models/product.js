const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = Schema({
  image:{
          type:Buffer,
          required:true
        },
  name: {
          type: String,
          required: true,
          trim: true
        },
  price: {
          type: Number,
          required: true
          },
  category:{
            type: String,
            required: true,
            trim: true
            },
});


module.exports = mongoose.model('Product', productSchema);

