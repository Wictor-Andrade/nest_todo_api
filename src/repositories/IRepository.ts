export interface IRepository<T> {
    findAll(): Promise<T[]>;
    findOne(id: string): Promise<T | null>;
    create(data: Partial<T>): Promise<T>;
    update(id: string, data: Partial<T>): Promise<T>;
    delete(id: string): Promise<T>;
  }