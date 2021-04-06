import { UserModel } from './user.models';
import { USER_ADDRESS_REPOSITORY, USER_REPOSITORY } from '../../utils/constants';
import { UserAddressModel } from '../user-address/user-address.models';

export const userProviders = [
  {
    provide: USER_REPOSITORY,
    useValue: UserModel,
  },
  {
    provide: USER_ADDRESS_REPOSITORY,
    useValue: UserAddressModel,
  },
];
