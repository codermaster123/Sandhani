import mongoose from "mongoose";
import dotenv  from "dotenv";
dotenv.config();

// const pass=process.env.DB_PASSWORD;
const pass="blood123"
// mongodb+srv://tushankhan:<password>@cluster0.eu9y4tt.mongodb.net/?retryWrites=true&w=majority
const Connection = () => {
   
   const MONGODB_URI=`mongodb+srv://tushankhan:${pass}@cluster0.eu9y4tt.mongodb.net/?retryWrites=true&w=majority`
    mongoose.connect(MONGODB_URI, { 
      useNewUrlParser: true
    });

    mongoose.connection.on('connected', () => {
        console.log('Database connected Successfully');
    })

    mongoose.connection.on('disconnected', () => {
        console.log('Database disconnected');
    })

    mongoose.connection.on('error', () => {
        console.log('Error while connecting with the database ');
    })
}

export default Connection;
