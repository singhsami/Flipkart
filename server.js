import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import DefaultData from "./default.js"
import bodyParser from "body-parser"
import Connection from "./database/db.js"
import router from "./routes/route.js"
import {v4 as uuid} from "uuid";


const app=express()
dotenv.config()

app.use(cors())
app.use(bodyParser.json({extended:true}))
app.use(bodyParser.urlencoded({extended:true}))
app.use("/",router)

const PORT=process.env.PORT || 8000;

const USERNAME=process.env.DB_USERNAME;
const PASSWORD=process.env.DB_PASSWORD;

const URL=process.env.MONGODB_URI || `mongodb://${USERNAME}:${PASSWORD}@ac-zuacnux-shard-00-00.usu58mp.mongodb.net:27017,ac-zuacnux-shard-00-01.usu58mp.mongodb.net:27017,ac-zuacnux-shard-00-02.usu58mp.mongodb.net:27017/?ssl=true&replicaSet=atlas-1wnnun-shard-0&authSource=admin&retryWrites=true&w=majority`





Connection(URL);



app.listen(PORT,()=>{console.log("Server is running at port 8000")})
DefaultData();


export let paytmMerchantKey=process.env.PAYTM_MERCHENT_KEY;
export let paytmParams={};
paytmParams["MID"]=process.env.PAYTM_MID;
paytmParams["WEBSITE"]=process.env.PAYTM_WEBSITE;
paytmParams["CHANNEL_ID"]=process.env.PAYTM_CHANNEL_ID;
paytmParams["INDURSTY_ID"]=process.env.PAYTM_INDUSTRY_ID;
paytmParams["ORDER_ID"]=uuid();
paytmParams["CUST_ID"]=process.env.PAYTM_CUST_ID
paytmParams["TXN_AMOUNT"]=100;
paytmParams["CALLBACK_URL"]="http://localhost:8000/callback"
paytmParams["EMAIL"]="sam@gmail.com"
paytmParams["PHONE"]="123456789"