class Logger{

    constructor(jsonexpress){
        this.showDebug = jsonexpress.args["debug"]
        this.suc("Initiated the logger")
    }

    info(content){
        console.info("INFO:     " + content)
    }

    err(content){
        console.error("ERR:      " + content)
        process.exit()
    }

    warn(content){
        console.warn("WARN:     " + content)
    }

    suc(content){
        console.log("SUCCESS:  " + content)
    }

    debug(content){
        if(this.showDebug)
            console.debug("DEBUG:    " + content)
    }
    
}

export default Logger