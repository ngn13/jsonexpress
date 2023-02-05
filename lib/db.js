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
	this.showToken = this.jsonexpress.args["show_token"]
        this.regenToken = false
        this.checkPath()
        this.getToken()

        if(this.showToken)
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

    read(body, ths){
	let file = ""

	try{
		file = body.file.toString()	
		if (file[0] === "."){
			return {err: 440}
		}
	}catch (err){
		ths.jsonexpress.logger.debug(`Read error ('${body.file}') - ${err}`)
		return {err: 880}
	}

	return {err: 0, ret: ths.jsonfs.readJSON(file)}
    }

    write(body, ths){
	let data = {}
	let file = ""
	
	try{
		file = body.file.toString()
		data = JSON.parse(JSON.stringify(body.data))
		if (file[0] === "."){
			return {err: 440}
		}
	}catch (err){
		ths.jsonexpress.logger.debug(`Write error ('${body.file}':'${body.data}') - ${err}`)
		return {err: 880}
	}
	
	ths.jsonfs.writeJSON(data, file)
	return {err: 0}	
    }

    auth(body, func){
	this.jsonexpress.logger.debug(`Request! Body ${JSON.stringify(body)} - Function ${func.name}`)
	if(body.token==this.token)
            return func(body, this)

        return {error: 990}
    }
}

export default Database
