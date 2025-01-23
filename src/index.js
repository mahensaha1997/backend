import dotenv from "dotenv"
import connectDb from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
    path: './env'
})


connectDb()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running at port: ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("DB connecton failed.", err)
})















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