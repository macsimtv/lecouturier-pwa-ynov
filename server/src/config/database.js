import mongoose from "mongoose";

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("✅ Connected to database");
    })
    .catch((err) => {
        console.log("⛔ Error connecting to database");
        console.log(err);
    });