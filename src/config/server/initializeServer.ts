import { Application } from 'express'


const InitializeServer = (app: Application): void => {
  const PORT = process.env.PORT || 8000
  const PID = process.pid

  app.listen(PORT, () => {
    console.log(`Running on ${PORT} and pid ${PID}`)
  })


}


export default InitializeServer