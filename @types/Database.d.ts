interface DatabaseRepository {
  create(data: T): Promise<T>;

  select(id: string): Promise<T>;

  delete(id: string): Promise<T>;

  update(id: string, data: T): Promise<T>;


}

interface DatabaseCondition {
  column: string;
  value: string;
}