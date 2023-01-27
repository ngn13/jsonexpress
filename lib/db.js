import fs from "fs"
import JSONFS from "./jsonfs.js"

class Database{
    constructor(jsonexpress){
        this.jsonexpress = jsonexpress

        this.path = this.jsonexpress.args["db_path"]

        if(this.path!="./db")
            this.jsonexpress.logger.warn("Loading database from an external path, be aware that file system permissions may cause errors")

        this.jsonfs = new JSONFS(this.path, this.jsonexpress.logger)
        this.token = ""
        this.hideToken = true
        this.regenToken = false
        this.checkPath()
        this.getToken()

        if(!this.hideToken)
                this.jsonexpress.logger.info(`Database token: ${this.token}`)
        
        this.jsonexpress.logger.suc("Initiated the database")
    }

    genToken(){
        // thanks google! uh, i mean duckduckgo
        let chars = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890"
        let array = Array.from(
            { length: 69 }, // funny token length
            (v, k) => chars[Math.floor(Math.random() * chars.length)]
        )
        return array.join("");
    }

    getToken(){
        let content = this.jsonfs.readJSON(".jsonexpress")
        if(content==null||!content.hasOwnProperty("token")){
            this.token = this.genToken()
            this.jsonexpress.logger.suc(`New database created at '${this.path}'`)
            this.jsonfs.writeJSON({token: this.token}, ".jsonexpress")
            return
        }

        this.token = content["token"]
        
    }

    checkPath(){
        if(!fs.existsSync(this.path))
            fs.mkdirSync(this.path)

        let stats = fs.statSync(this.path)
        
        if(!stats.isDirectory)
            this.jsonexpress.logger.err(`Cannot create a database at '${this.path}', because its not a directory`)
    }

    auth(token, func){
        if(token==this.token)
            return func()

        return {error: 990}
    }
}

export default Database