import fs from "fs"
import path from "path"
// TODO: Add encryption
class JSONFS{

    constructor(path, logger){
        this.path = path
        this.logger = logger
    }
    
    writeJSON(content, file){
        this.logger.debug("Writing to file - " + file)
        fs.writeFileSync(
            path.join(this.path, file)+".json",
            JSON.stringify(content)
        )
    }

    readJSON(file){
        let filePath = path.join(this.path, file)+".json"

        if(!fs.existsSync(filePath)){
            this.logger.debug("Does not exist - " + file)
            return null
        }

        this.logger.debug("Reading file - " + file)
        return JSON.parse(fs.readFileSync(filePath))
    }

}

export default JSONFS