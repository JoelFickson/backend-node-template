import { NextFunction, Request, Response } from 'express'
import { autoInjectable, singleton } from 'tsyringe'
import AuthService from './authService'
import AuthUtilities from '../../core/AuthUtilities'


@singleton()
@autoInjectable()
class AuthController {
  constructor(private authService: AuthService, private authUtilities: AuthUtilities) {
  }

  async actionCreateAccount(req: Request, res: Response, next: NextFunction) {
    try {

      const {
        name,
        password,
        dob,
        location,
        email
      } = req.body

      const condition = {
        column: 'email',
        value: email
      }

      const isAccountAlreadyCreated = await this.authService.getAccount(condition)

      if (isAccountAlreadyCreated) {
        return res.status(400).json({
          error: true,
          message: 'Account already created'
        })
      }


      const hashedPassword = this.authUtilities.hashPassword(password)

      const developer: Partial<Developer> = {
        name,
        email,
        password: hashedPassword,
        location,
        dob
      }

      const account = await this.authService.createAccount(developer)

      if (!account) {
        return res.status(400).json({
          error: true,
          message: 'User account not created'
        })
      }

      return res.status(200).json({
        error: false,
        message: `User account created successfully. Welcome ${account.name}!`
      })
    } catch (err) {
      next(err)
    }
  }


  async actionLoginUser(req: Request, res: Response, next: NextFunction) {

    try {
      const {
        email,
        password
      } = req.body

      const condition = {
        column: 'email',
        value: email
      }

      const account = await this.authService.getAccount(condition)

      if (!account) {
        return res.status(400).json({
          error: true,
          message: 'Account does not exist'
        })
      }

      const isPasswordCorrect = this.authUtilities.comparePassword(password, account.password)

      if (!isPasswordCorrect) {
        return res.status(400).json({
          error: true,
          message: 'Invalid password'
        })
      }

      const token = this.authUtilities.generateToken()

      return res.status(200).json({
        error: false,
        message: `Welcome back ${account.name}`,
        token
      })

    } catch (err) {
      next(err)
    }

  }


}


export default AuthController

