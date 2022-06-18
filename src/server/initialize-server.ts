import {Application} from "express"

import cluster from "cluster"
import os from "os"
import Connection from "../database/database"

const numberOfCpus: number = os.cpus().length


const InitializeServer = (app: Application): void=> {
    const PORT = process.env.PORT || 8000
    const PID = process.pid

    if (process.env.STAGE === "DEV") {
        app.listen(PORT, () => {
            console.log(`Running on ${PORT} and pid ${PID}`)
        })
        Connection.Connect()


    } else {
        Connection.Connect()
        if (cluster.isPrimary) {

            for (let i = 0; i < numberOfCpus; i++) {
                cluster.fork()
            }

            cluster.on("exit", () => {


                cluster.fork()
            })

        } else {

            app.listen(PORT, () => {
                console.log(`Running on ${PORT} and pid ${PID}`)
            })
        }

    }


}


export default InitializeServer