import mongoose from 'mongoose';



export const Product = new mongoose.Schema({

   

	ProductName: {
		type: String,
		required: true
	},
	ProductImage:{
        type: String,
		required: true
    },
	ProductPrice: {
		type: Number,
		required: true,
		
	},
	ProductDesctription: {
		type: String,
		required: true
	},

    ProductQuantity:{
        type: Number,
        required: true
    } 
	
	
	
	
	
});

export const ProductModel = mongoose.model('ProductList', Product);