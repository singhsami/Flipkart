import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    firstname: {
      type: String,
      required:true,
      min:5,
      max:20
    },
    lastname: {
      type: String,
      required:true,
      min:5,
      max:20
       
    },
    username: {
        type: String,
        required:true,
       
    },
    email: {
        type: String,
        
       
    },
    password: {
        type: String,
      
    },
    phone: {
        type: String
    }
});

const user = mongoose.model('user', userSchema);

export default user;