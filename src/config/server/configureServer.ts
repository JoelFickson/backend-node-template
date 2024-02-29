import { Application } from 'express'
import fileUpload from 'express-fileupload'
import cors from 'cors'
import helmet from 'helmet'


const ConfigureServer = (app: Application): void => {

  app.use(cors())
  app.use(fileUpload())
  app.use(helmet())
}

export default ConfigureServer