import config from "../configs/configs";
import mongoose from "mongoose";

export default async (dbName: string): Promise<void> => {
    try {
        if (config.database.url?.includes("?")) {
            dbStatus = "srv"
            const urlParts = config.database.url?.split('?')
            await mongoose.connect(`${urlParts[0]}${dbName}?${urlParts[1]}`)
        } else {
            dbStatus = "local"
            await mongoose.connect(`${config.database.url}/${dbName}`)
        }
    } catch (err) {
        log.error(err, "me")
        await mongoose.disconnect()
    }   
}
