import mongoose from 'mongoose';

const friendSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    friends:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    }]
},{timestamps:true})

const Friends = mongoose.model('Friend',friendSchema);
export default Friends;