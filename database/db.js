import mongoose from "mongoose"


export const Connection = async(URL)=>{
   
    try{
      mongoose.set('strictQuery', false);
       await mongoose.connect(URL,{useNewUrlParser:true})
      
      

    }catch(error){
      console.log("Error while connecting with Db",error.message)
    }
}
export default Connection;