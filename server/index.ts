import mongoose, {ConnectOptions} from 'mongoose';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import loginRoute from "./Routes/loginRoute"
import registerRoute from "./Routes/registerRoute"
import addProductRoute from "./Routes/addProductRoute"
import producteRoute from "./Routes/productRoute"

dotenv.config({ path: './.env' });

const app = express()
app.use(cors())
app.use(express.json())

/* Connecting the app 
with the mongodb database*/
mongoose
	.connect(process.env.MONGODB_URI as string, { useNewUrlParser: true } as ConnectOptions)
	.then((result) => console.log('MongoDB Connected Successfully'))
	.catch((error) => console.log(error));




// The differnt API routes
app.use("/api/register", registerRoute)
app.use("/api/login", loginRoute)
app.use("/api/addproduct", addProductRoute)
app.use("/api/products", producteRoute)


app.listen(process.env.PORT, ()=>{
    console.log('Server running sucessfully on', process.env.PORT)
})