import { NextFunction, Request, Response } from "express";
import config from "../configs/configs";
import jwt from "jsonwebtoken"
import switchDB from "../utils/switchDB";



export default async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    
    const token: string | undefined = req.headers.cookie?.split(";").filter((e) => e.includes("token="))[0].split("token=")[1]
    const verified = token && config.jwtKey ? jwt.verify(token, config.jwtKey) : null
    if (verified) {

        req.body.creator = verified
        await switchDB(req.body.creator.companyUrl)
        // next()

    } else {
        const msg = !token ? "undetected token" : !config.jwtKey ? "jwt key gone wrong" : "something went wrong"
        res.status(402).json({ message: msg })
    }

}