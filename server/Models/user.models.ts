import mongoose from 'mongoose';



export const User = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	
	
	
	
	
});

export const Model = mongoose.model('User', User);