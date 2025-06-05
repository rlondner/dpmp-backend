
import { NullableType } from '../../../../utils/types/nullable.type';
import { User } from '../../../users/domain/user';
import { UserRepositoryBase } from '../../../users/infrastructure/persistence/user.repository';
import { DeepPartial } from '../../../../utils/types/deep-partial.type';


export abstract class UserRepository extends UserRepositoryBase  {
  abstract findByEmail(email: User['email']): Promise<NullableType<User>>;

  abstract findBySocialIdAndProvider(params: {
    socialId: User['socialId'];
    provider: User['provider'];
  }): Promise<NullableType<User>>;
}

