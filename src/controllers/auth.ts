// Types
import { Request, Response, NextFunction } from 'express';
import switchDB from '../utils/switchDB';
import users from '../models/users';
import mongoose from 'mongoose';
import config from '../configs/configs';
import bcrypt from '../libs/bcrypt';
import jwt from 'jsonwebtoken'

const { jwtKey } = config
interface Auth {
    register: {
        tenant: (req: Request, res: Response) => void
        staff: (req: Request, res: Response) => void

    }
    login: (req: Request, res: Response, next: NextFunction) => void
}



// ------------------------------------------------------------------------------------------------

export const auth: Auth = {
    register: {
        async staff(req, res) {

        },
        async tenant(req, res) {
            try {
                const dbName: string = req.body.companyUrl;
                await mongoose.connect(config.database.url)
                const dbExist = (await mongoose.connection.db.admin().listDatabases()).databases.filter((el => el.name === dbName))
                mongoose.disconnect()
                if (dbExist.length <= 0) {
                    await switchDB(dbName)
                    req.body.password = await bcrypt.hash(req.body.password, 10)
                    await users.insertMany([{ ...req.body, role: "admin" }])
                    await mongoose.disconnect()
                    res.send("company created 🎯")
                } else {
                    await mongoose.disconnect()
                    res.send("company already exist")
                }

            } catch (err) {
                log.error(err)
            }

        },

    },
    login: async (req, res) => {
        try {
            const dbName: string = req.body.companyUrl;
            await mongoose.connect(config.database.url)
            const dbExist = (await mongoose.connection.db.admin().listDatabases()).databases.filter((el => el.name === dbName))
            mongoose.disconnect()

            if (dbExist.length <= 0) {
                await mongoose.disconnect()
                res.status(404).send("There is no any user or company exist")
            } else {
                await switchDB(dbName)
                const user = await users.findOne({ email: req.body.email })
                const isPassVerified = await bcrypt.compare(req.body.password, user?.password)

                if (isPassVerified && jwtKey) {
                    const token = jwt.sign(JSON.stringify(user), jwtKey)
                    res.cookie('token', token, { httpOnly: true })
                    res.status(200).json({ token: token })
                    await mongoose.disconnect()
                }
            } 
        } catch (err) {
            log.error(err)
        }
    },
}

function async(req: any, res: any) {
    throw new Error('Function not implemented.');
}

