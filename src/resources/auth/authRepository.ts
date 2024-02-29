export interface AuthRepository {
  getAccount: (developer: DatabaseCondition | DatabaseCondition[] | undefined) => Promise<Developer | Developer[]>;
  createAccount: (developer: Partial<Developer>) => Promise<Developer>;
  updateAccount: (id: DatabaseCondition | DatabaseCondition[]) => Promise<Developer>;
  deleteAccount: (id: DatabaseCondition | DatabaseCondition[]) => Promise<Developer>;
}