import { Schema, model } from "mongoose";
import { IGuild } from "../types";

const GuildSchema = new Schema<IGuild>({
    guildID: {required:true, type: String},
    options: {
        prefix: {type: String, default: process.env.PREFIX}
    }
},{
    writeConcern: {
        w: "majority",
        j: true,
        wtimeout: 1000
    }
})

const GuildModel = model("guild", GuildSchema)

export default GuildModel