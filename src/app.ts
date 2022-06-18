import express from 'express'
import ConfigureServer from 'server/configure-server'
import InitializeServer from 'server/initialize-server'

const app = express()
app.use(express.json())


ConfigureServer(app)


InitializeServer(app)

