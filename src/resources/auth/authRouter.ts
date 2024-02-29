import express from 'express'
import { container } from 'tsyringe'
import AuthController from './authController'


const router = express.Router()

const authController = container.resolve(AuthController)

router
  .post('/login', authController.actionLoginUser.bind(authController))
  .post('/signup', authController.actionCreateAccount.bind(authController))


export default router
