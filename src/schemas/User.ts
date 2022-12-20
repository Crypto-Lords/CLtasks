import { Schema, model } from "mongoose";
import { IUser } from "../types";

const UserSchema = new Schema<IUser>({
    userID: {required:true, type: String},
    balance: {}
},{
    writeConcern: {
        w: "majority",
        j: true,
        wtimeout: 1000
    }
})

const UserModel = model("user", UserSchema)

export default UserModel