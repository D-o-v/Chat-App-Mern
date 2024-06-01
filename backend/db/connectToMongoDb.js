import mongoose from "mongoose";

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI)
        console.log('CONNECTED TO MONGODB SUCCESSFULLY')
    } catch (error) {
        console.log('can not connect to MongoDB	', error);
    }
}
export default connectToMongoDB;