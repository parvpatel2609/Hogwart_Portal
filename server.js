import express  from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import courseRoutes from "./routes/courseRoutes.js";
import gradeRoutes from './routes/gradeRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import cors from "cors";
import path from "path";


//configure env 
dotenv.config();


//database config
connectDB();


//rest object
const app = express(); 


//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "./client/build")));


//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/grade", gradeRoutes);
app.use("/api/v1/event", eventRoutes);



//rest api
app.use("*", function (req, res) {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
})

// app.get("/", (req, res) => {
//     res.send("<h1>Welcome to Hogwart Portal</h1>");
// })


//port
const PORT = process.env.PORT || 8080; 


//run listen 
app.listen(PORT, () => {
    console.log(`Server is running on ${process.env.DEV_MODE} mode on port ${PORT} `);
})
