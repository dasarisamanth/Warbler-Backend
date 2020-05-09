const mongoose = require('mongoose');
const User = require('./user');


const messagesSchema = new mongoose.Schema({
    text:{
        type:String,
        required:true,
        maxlength:160,
    },

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
   
},{
    timestamps:true
}
)


messagesSchema.pre('remove', async function(next){
    try {
       
        let user = await User.findById(this.user)

        user.messages.remove(this.id);

        await user.save();

        return next()


    } catch (err) {
        return next(err);
    }
})

const Messages = mongoose.model('Messages', messagesSchema);

module.exports=Messages;