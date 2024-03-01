import bcrypt from 'bcryptjs'
import { autoInjectable } from 'tsyringe'

@autoInjectable()
class AuthUtilities {
  hashPassword(password: string): string {
    return bcrypt.hashSync(password, 10)
  }

  comparePassword(password: string, hash: string): boolean {
    return bcrypt.compareSync(password, hash)
  }

  generateToken(): string {
    return bcrypt.hashSync(Math.random().toString(), 10)
  }
}

export default AuthUtilities