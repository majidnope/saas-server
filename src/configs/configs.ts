import { config as init } from "dotenv";
import bunyan from "bunyan";
import { GetPublicKeyOrSecret, Secret } from 'jsonwebtoken'
init({ path: `.env.${process.env.NODE_ENV || "dev"}` })



declare global {
    var dbStatus: string
    var log: {
        info: (...arg: any) => void
        debug: (...arg: any) => void
        error: (...arg: any) => void
        fatal: (...arg: any) => void
    }
}
// Types
interface Config {
    port: any,
    jwtKey?: string
    log: {
        [key: string]: any;

        info: (...arg: any) => void
        debug: (...arg: any) => void
        error: (...arg: any) => void
        fatal: (...arg: any) => void
    },
    database: {
        url: string
    }


}

interface Logger {
    [key: string]: any;
    dev: bunyan,
    test: bunyan,
    production: bunyan
}

// --------------------------------------------------------------------------------------------
const stage: string = (() => process.env.NODE_ENV === "production" ? "production" : "dev")()


const logger: Logger = {
    dev: bunyan.createLogger({ name: "development", level: "debug" }),
    production: bunyan.createLogger({ name: "production", level: "info" }),
    test: bunyan.createLogger({ name: "test", level: "fatal" })
}



const config: Config = {
    port: process.env.PORT,
    log: logger[stage],
    jwtKey: process.env.SECRET_JWT_KEY,
    database: {
        url: process.env.DB_URL ?? ""
    }
}
// setting up log as global access
global.log = config.log;
global.dbStatus = "local"





export default config;