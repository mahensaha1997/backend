import mongoose from "mongoose";
import { DbName } from "../constants.js";

const connectDb = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.mongoDBUri}/${DbName}`)
        console.log("MongoDB connected !! DB HOST:", connectionInstance.connection.host)
    } catch (err) {
        console.log("ERROR", err);
        process.exit(1)
    }
}

export default connectDb