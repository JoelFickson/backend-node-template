import mongoose, { ConnectOptions } from "mongoose"
import chalk from 'chalk'



const connected = chalk.bold.cyan
const error = chalk.bold.yellow
const disconnected = chalk.bold.red
const termination = chalk.bold.magenta


class DatabaseConnection {

    options: ConnectOptions

    constructor() {

        this.options = {
            autoIndex: false,
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
            family: 4
        }
    }


    Connect() {

        // const DB = process.env.STAGE === "DEV" ? process.env.DEV_DB : process.env.PROD_DB

        mongoose.connect("mongodb://localhost:27017/decisions-dev?retryWrites=true", this.options)

        mongoose.connection.on('connected', () => {

            console.log(connected("Database connected"))

        })

        mongoose.connection.on('error', (err: string) => {
            console.log(error(`Mongoose default connection has occurred ${  err  } error`))

        })

        mongoose.connection.on('disconnected', () => {
            console.log(disconnected("Mongoose default connection is disconnected"))
        })

        process.on('SIGINT', () => {
            mongoose.connection.close(() => {
                console.log(termination("Mongoose default connection is disconnected due to application termination"))
                process.exit(0)
            })
        })
    }


}

const Connection = new DatabaseConnection()
export default Connection



