//require the module
const express=require("express"); 
const dotenv=require("dotenv");
const cors = require("cors");
dotenv.config({path:"./Config.env"}); 
require("./db/database"); 
const PORT=process.env.PORT;

const app=express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

const EventRouter = require("./routes/event");
const registerRouter = require("./routes/registerevent"); 

app.use("/api/event", EventRouter);
app.use("/api/register", registerRouter);

app.listen(PORT,()=>{
         console.log(`Server Listening on ${process.env.PORT}`);
})






