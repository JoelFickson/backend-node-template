import AccountModel from './auth.model'
import { UserAccountT } from '../../../@types/users'

const createUserAccount = async (userAccount: UserAccountT) => {
  const newUser = new AccountModel(userAccount)
  const isSaved = await newUser.save()

  if (!isSaved) return null

  return isSaved
}

const loginUserAccount = async (email: string, password: string) => {}
export { createUserAccount, loginUserAccount }
