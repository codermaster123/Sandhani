import express from "express";
import cors  from "cors";
import dotenv from "dotenv"
import Connection from "./DataBase/db.js";
import path from "path"
import Route from "./Routes/Routes.js";
import bodyParser from "body-parser";
import formidableMiddleware from 'express-formidable';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
dotenv.config();

const app=express();

const port=3000;

const __dirname = dirname(fileURLToPath(import.meta.url));

Connection();

// const httpServer =http.createServer(app);
// const io=new Server(httpServer,{cors:{
//   origin:"*",
//   method:["GET","POST"]
// }
// });


app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// app.use(formidableMiddleware())
app.use(cors());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// app.use(express.json({limit: '150mb'}));
// app.use(express.urlencoded({limit: '150mb'}));

app.use("/api/",Route)

// io.on("connection",(socket)=>{
//   console.log("conection is ready");
// })


app.listen(port,()=>{
  console.log("server is starting");
})