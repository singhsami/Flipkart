import mongoose from 'mongoose';
import products from "./constants/data.js"
import Product from "./model/product-schema.js"


const DefaultData=async()=>{
    try{
        
 await Product.insertMany(products);
console.log("Data implemented successfully")
    }catch(error){
        console.log("Error While inserting default Data",error.message)
    }
}
export default DefaultData;