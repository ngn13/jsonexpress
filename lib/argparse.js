function argparse(args){

    function splitarg(arg){
        let split = arg.split("=")
        if(split.length<2)
            this.jsonexpress.logger.err(`'${arg}' needs a value.`)
        return split[1]
    }

    let arglist = {
        debug: false,
        port: 6678,
        db_path: "./db",
	show_token: false
    }

    for(let i = 0; i < args.length; i++){
        let arg = args[i]
        
        if(arg=="--debug")
            arglist["debug"] = true
        else if(arg.startsWith("--port"))
            arglist["port"] = splitarg(arg)
        else if(arg.startsWith("--db")){
            arglist["db_path"] = splitarg(arg)
        }else if(arg=="--show-token"){
	    arglist["show_token"] = true
	}
    }

    return arglist
    
}

export default argparse
