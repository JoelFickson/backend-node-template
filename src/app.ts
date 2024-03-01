import express from 'express'
import 'reflect-metadata'
import ConfigureServer from '@config/server/configureServer'
import InitializeServer from '@config/server/initializeServer'

const app = express()
app.use(express.json())

ConfigureServer(app)


InitializeServer(app)

