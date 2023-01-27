import express from "express"

class Server{
    constructor(jsonexpress){
        this.jsonexpress = jsonexpress

        this.app = express()
        this.port = this.jsonexpress.args["port"]

        this.app.all("/", (req, res)=>{
            res.json({name: "JSONExpress", version: this.jsonexpress.version})
        })
        
        this.app.post("/write", (req, res)=>{

        })

        this.app.post("/read", (req, res)=>{

        })

        this.app.all("*", (req,res)=>{
            res.json({error: 110})
        })

        this.jsonexpress.logger.suc("Initiated the web server")
    }

    start(){
        this.app.listen(this.port, ()=>{
            this.jsonexpress.logger.info("Listening on port " + this.port)
        }).on("error", (e)=>{
            this.jsonexpress.logger.err("Failed starting up the web server - " + e)
        })
    }

}

export default Server