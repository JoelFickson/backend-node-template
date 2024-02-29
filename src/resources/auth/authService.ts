import { autoInjectable, singleton } from 'tsyringe'
import DatabaseService from '@config/database/Database'

import { AuthRepository } from './authRepository'


@autoInjectable()
@singleton()
class AuthService extends DatabaseService<Developer> implements AuthRepository {


  constructor() {
    super('developers')
  }

  deleteAccount(condition: DatabaseCondition): Promise<Developer> {
    return this.delete(condition)
  }

  updateAccount(condition: DatabaseCondition, data: Partial<Developer>): Promise<Developer> {
    return this.update(condition, data)

  }

  async getAccount(developer: DatabaseCondition | DatabaseCondition[] | undefined): Promise<Developer> {

    return await this.select(developer)

  }

  async createAccount(developer: Partial<Developer>): Promise<Developer> {
    return this.create(developer)
  }


}


export default AuthService
