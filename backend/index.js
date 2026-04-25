import runGetStarted from "./src/db/mongo.js"
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoute from "./src/routes/user.route.js"
import postRoute from "./src/routes/post.route.js"
import commentRoute from "./src/routes/comment.route.js"
import userHistoryRoute from "./src/routes/userHistory.route.js" 
// runGetStarted().catch(console.dir);
const app=express();
const PORT=4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(
    cors({
        origin:"http://localhost:5173",
        credentials:true,
    }) 
);
app.use(cookieParser());

app.use("/route/user",userRoute);
app.use("/route/post",postRoute);
app.use("/route/comment",commentRoute);
app.use("/route/userhistory",userHistoryRoute);

const server=async()=>{
    try{
        runGetStarted().catch(console.dir);
        app.listen(PORT,()=>{
            console.log("server on",PORT);
            console.log(`http://localhost:${PORT}`);
            
        });
        
    } catch (error){
        console.error("error",error.message);
        process.exit(1);
    }
}
server();