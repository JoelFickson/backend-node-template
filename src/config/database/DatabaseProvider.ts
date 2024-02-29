import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js/driver'

const databaseProvider = (): PostgresJsDatabase => {

  const queryClient = postgres('postgres://postgres:adminadmin@0.0.0.0:5432/db')
  return drizzle(queryClient)
}

export default databaseProvider