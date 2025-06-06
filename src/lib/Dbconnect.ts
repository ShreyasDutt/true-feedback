import mongoose from "mongoose";

let Connected : boolean = false;

export const dbConnect = async() =>{
    mongoose.set('strictQuery',true);

    if(!process.env.DB_URI){
        return console.log("No DB URI found");
    }
    if(Connected){
        return console.log("DB is already connected");
    } 

    try {
        await mongoose.connect(process.env.DB_URI);
        Connected = true;
        console.log("MongoDB is connected")
    } catch (error) {
        console.log(error)
    }
}

