import { Application } from 'express'
import fileUpload from 'express-fileupload'
import cors from 'cors'
import helmet from 'helmet'
import morgan from "morgan"
import dotenv from "dotenv"

const ConfigureServer = (app: Application) : void=> {

    dotenv.config()
    app.use(cors())


    app.use(fileUpload())


    app.use(helmet())
}

export default ConfigureServer