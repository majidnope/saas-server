
import http from 'http'


import { AddressInfo } from "net";
import engine from '../engine';
import config from '../configs/configs';


const { log, port } = config

const server = http.createServer(engine).
    listen(normalizePort(port || "3000")).on('error', onError).on('listening', onListening).on('connection', onConnect)



function normalizePort(val: string) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}




function onConnect() {
    log.info("some connected")
}

function onError(error: any) {
    if (error.syscall !== "listen") {
        throw error;
    }

    const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case "EACCES":
            log.error(bind + " requires elevated privileges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            log.error(bind + " is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListening() {
    const addr: string | AddressInfo | null = server.address();
    const bind: string = typeof addr === "string" ? "pipe " + addr : "port " + addr?.port;
    log.info("Listening on " + bind);
}