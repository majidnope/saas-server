// Types
import { Request, Response, NextFunction } from 'express';

interface Users {
    add: {
        tenant: (req: Request, res: Response, next: NextFunction) => void
        staff: (req: Request, res: Response, next: NextFunction) => void

    }
    delete: {
        tenant: (req: Request, res: Response, next: NextFunction) => void
        staff: (req: Request, res: Response) => void

    }
    update: {
        tenant: (req: Request, res: Response, next: NextFunction) => void
        staff: (req: Request, res: Response, next: NextFunction) => void

    },
    get: {
        tenant: (req: Request, res: Response, next: NextFunction) => void
        staff: (req: Request, res: Response, next: NextFunction) => void

    }
}



// ----------------------------------------------F--------------------------------------------------

const users: Users = {
    get: {
        tenant(req, res, next) {

        },
        staff(req, res, next) {

        },
    },
    add: {
        staff(req, res, next) {
           
        },
        tenant(req, res, next) {

        },
    },
    update: {
        staff(req, res, next) {

        },
        tenant(req, res, next) {

        },
    },
    delete: {
        tenant(req, res, next) {

        },
        staff(req, res) {

        },
    }
}




export default users