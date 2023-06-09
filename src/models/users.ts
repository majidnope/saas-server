import mongoose, { Model, Schema } from "mongoose"


interface Users {

    user: Model<any>


}


const users = mongoose.model('user', new mongoose.Schema({
    email: String,
    password: String,
    name: String,
    companyUrl:String,
    role: {
        type: String,
        enum: ["admin","staff"],
        default: "admin"
    }
}))





export default users