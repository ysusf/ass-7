import mongoose from "mongoose";


const connection = async () => {
    console.log(process.env.URI)
    return await mongoose.connect(process.env.URI).then(() => {
        console.log("DB connection");
    }).catch(error => {
        console.log("fail to connection");
        console.log(error);
    })
}


export default connection