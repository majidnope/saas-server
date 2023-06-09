import express, { Express, Request, Response } from 'express';
import compression from 'compression'
import auth from './routers/auth'
import users from './routers/users'
import verifyJwt from './middleware/verifyToken';
import morgan from 'morgan';





const engine: Express = express();
engine.use(morgan('dev'))
engine.use(compression())
engine.use(express.json())
engine.use(express.urlencoded({ extended: false }))
engine.use('/api/auth', auth)
engine.use('/api/users', verifyJwt, users)



export default engine;




