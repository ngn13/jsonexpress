import Logger from "./lib/logger.js"
import Database from "./lib/db.js"
import Server from "./lib/server.js"
import argparse from "./lib/argparse.js"

class JSONExpress{

    constructor(args){
        this.version = "1.0.0"
        console.log(`JSONExpress v${this.version}`)
        this.args = argparse(args)

        this.logger = new Logger(this)
        this.db = new Database(this)
        this.server = new Server(this)

        this.logger.debug(`Arguments - ${JSON.stringify(this.args)}`)
    }

    start(){
        this.logger.debug("Starting up the server")
        this.server.start()
    }

}

const jsonexpress = new JSONExpress(process.argv)
jsonexpress.start()
