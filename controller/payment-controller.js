import PaytmChecksum from "../paytm/PaytmChecksum.js"
import { paytmParams,paytmMerchantKey } from "../server.js"
import formidable from "formidable"
import https from "https"

export const addPaymentGateway=async(request,response)=>{
     try{
await PaytmChecksum.generateSignature(paytmParams,paytmMerchantKey);

let params={
    ...paytmParams,'CHECKSUM':PaytmChecksum
  } 
  response.status(200).json(params)
     } 
     catch(error){
        response.status(500).json({error:error,message});
     }
}

export const paymentResponse=(request,response)=>{
    try{
        const form=new formidable.IncomingForm();
        let PaytmChecksum=request.body.CHECKSUMHASH;
        delete request.body.CHECKSUMHASH;

        let isVerifySignature=PaytmChecksum.VerifySignature(req.body,paytmMerchantKey,PaytmChecksum);
        if(isVerifySignature){
              let paytmParams={};
              paytmParams["MID"]=request.body.MID;
              paytmParams["ORDERID"]=request.body.ORDERID;
              PaytmChecksum.generateSignature(paytmParams,paytmMerchantKey).then(function(checksum){
                paytmParams["CHECKSUMHASH"]=checksum;

                let postData=JSON.stringify(paytmParams);

                let options={
                    hostname:"securegw-stage.paytm.in",
                    paytm:443,
                    path:"/order/status",
                    Headers:{
                        "Content-type":"application/json",
                        "Content-length":postData.length
                    }
                }
                let res="";
               let post_req= https.request(options,function(post_res){
                post_res.on("data",function(chunk){
                    res += chunk
                })

                post_res.on("end",function(){
                    let result=JSON.parse(res)
                    response.redirect("http//localhost:3000/")
                })
               })
post_req.write(postData);
post_req.end();
              })
        }else{
            console.log("checksum missmatched");
        }
    }catch(error){
        response.status(500).json({error})
    }
}