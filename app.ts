import express from 'express';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

const PORT = process.env.PORT || 9000;
const app=express();


import {router} from './routes/product.routes';

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/products', router);

dotenv.config();
const database= process.env.DB_NAME;
const dev_db_url = "mongodb+srv://user2:abcd1234@products.ez3ki.mongodb.net/Products?retryWrites=true&w=majority" || process.env.DB_CONN_STRING!;


mongoose.connect(dev_db_url);

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.listen(PORT, ()=>{
    console.log("Server is running on port number:", PORT);
});



