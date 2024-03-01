import { PostgresJsDatabase } from 'drizzle-orm/postgres-js/driver'
import type { PgTable } from 'drizzle-orm/pg-core/table'
import databaseProvider from '@config/database/DatabaseProvider'
import { eq } from 'drizzle-orm'

class DatabaseService<T> implements DatabaseRepository {
  private readonly tableName: PgTable

  private readonly db: PostgresJsDatabase

  constructor(tableName: string) {
    this.db = databaseProvider()
    this.tableName = tableName as unknown as PgTable
  }

  async create(values: T[] | T | Partial<T>): Promise<T> {

    try {
      const [result] = await this.db.insert(this.tableName).values(values)
      return result
    } catch (error) {
      console.error('Error creating record:', error)
      throw new Error('Failed to create record')
    }

  }

  async select(values: DatabaseCondition | DatabaseCondition[] | undefined): Promise<T> {
    try {

      if (this.isUndefined(values)) {
        return this.db.select().from(this.tableName) as unknown as T
      }

      if (this.isDatabaseConditionArray(values)) {
        // turn array into objects

        const obj = values.reduce((acc, curr) => {
          acc[curr.column] = curr.value
          return acc
        })

        return await this.db.select(obj).from(this.tableName) as unknown as T
      }


      return await this.db.select(values).from(this.tableName) as unknown as T


    } catch (error) {
      console.error('Error selecting record:', error)
      throw new Error('Failed to select record')
    }
  }

  async delete(condition: DatabaseCondition): Promise<T> {

    try {

      const deletedUser = await this.db.delete(this.tableName).where(eq(condition.column, condition.value)).returning
      return deletedUser


    } catch (e) {
      throw new Error('Failed to delete record')
    }
  }

  async update(condition: DatabaseCondition, data: T): Promise<T> {

    try {

      if (this.isDatabaseConditionArray(condition)) {

        const obj = condition.reduce((acc, curr) => {
          acc[curr.column] = curr.value
          return acc
        })

        return await this.db.update(this.tableName).set(data).where(obj)
      }


      return await this.db.update(this.tableName).set(data).where(condition)
    } catch (error) {
      console.error('Error updating record:', error)
      throw new Error('Failed to update record')
    }

  }


  isDatabaseConditionArray(value: DatabaseCondition | DatabaseCondition[] | undefined): value is DatabaseCondition[] {
    return Array.isArray(value)
  }

  isDatabaseCondition(value: DatabaseCondition | DatabaseCondition[] | undefined): value is DatabaseCondition {
    return value !== undefined && !Array.isArray(value)
  }

  isUndefined(value: DatabaseCondition | DatabaseCondition[] | undefined): value is undefined {
    return value === undefined
  }

}

export default DatabaseService
