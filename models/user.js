const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
    {
        email:{
            type:String,
            required:true,
            unique:true
        },

        username :{
            type:String,
            required:true,
            unique:true
        },

        password:{
            type:String,
            required:true

        },
        profileImageUrl:{
            type:String
        },

        messages:[{
          type: mongoose.Schema.Types.ObjectId,
          ref:'Messages'
        }]


    }
);

userSchema.pre('save', async function(next){
   try {

    if(!this.isModified('password')){
        console.log('im in if')
          return next();
    } 
    
    
let hashedPassword =  await bcrypt.hash(this.password,10);
 this.password = hashedPassword;
 console.log(hashedPassword)
 return next();  

} 
   catch (err) {

    return next(err);
       
   }
})

userSchema.methods.comparePassword = async function(candidatePassword,next){
    try {

        let isMatch = await bcrypt.compare(candidatePassword,this.password)
        return isMatch;
    } catch (err) {
        return next(err)
    }
}

const User = mongoose.model('User',userSchema);

module.exports = User;