import dotenv from "dotenv"
import connectDb from "./db/index.js";

dotenv.config({
    path: './env'
})


connectDb();















/*
import express from "express"
const app = express();

; (async () => {
    try {
        await mongoose.connect(`${process.env.mongoDBUri}/${DbName}`)
        app.on("error", (err) => {
            console.log("ERROR", err);
            throw err
        })

        app.listen(process.env.PORT, () => {
            console.log(`Example app listening on port ${process.env.PORT}`)
        })

    } catch (err) {
        console.log("ERROR", err);
        throw err
    }
})()
*/