import express from "express";
import http from "http";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import userRoute from "./routes/userRoute.js";
import cookieParser from "cookie-parser";
import msgRoute from "./routes/msgRoute.js";
import cors from "cors";
import { Server } from "socket.io";
import { app,server } from "./Socket/Socket.js";

// const app = express();
dotenv.config({});

const PORT = process.env.PORT || 5000;

//middleware
app.use(express.urlencoded({extended:true}));
app.use(express.json()); 
app.use(cookieParser());
const corsOption={
    origin:'http://localhost:3000',
    credentials:true
};
app.use(cors(corsOption)); 

//routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/message", msgRoute);

server.listen(PORT, () => {
  connectDB();
  console.log(`Socket Server listening at port ${PORT}`);
});
