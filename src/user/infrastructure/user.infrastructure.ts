import { UserModel } from '../domain/models/user.model';
import { UserRepository } from '../domain/repositories/user.repository';
import * as userMocks from './mocks/user.json';

export class UserInfrastructure implements UserRepository {
  async getAll(): Promise<UserModel[]> {
    return await Promise.resolve(userMocks);
  }

  getMessage() {}
}
