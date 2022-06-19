import bcrypt from 'bcryptjs'
import { RequestHandler } from 'express'
import { createUserAccount } from './auth.service'
import { UserAccountT } from '../../../@types/users'

const registerNewUserController: RequestHandler = async (req, res, next) => {
  try {
    const { firstName, lastName, password, email } = req.body

    const hashedPassword = bcrypt.hashSync(password, 10)

    const userAccount: UserAccountT = {
      firstName,
      lastName,
      password: hashedPassword,
      email,
    }

    const user = await createUserAccount(userAccount)

    if (user)
      if (user instanceof UserAccountT) {
        return res.status(400).json({
          error: true,
          message: 'User account not created',
        })
      }

    return res.status(200).json({
      error: false,
      message: `Welcome to our application ${user.first_name} ${user.last_name}`,
    })
  } catch (err) {
    next(err)
  }
}

const loginUserController: RequestHandler = async (req, res, next) => {}

export { loginUserController, registerNewUserController }
