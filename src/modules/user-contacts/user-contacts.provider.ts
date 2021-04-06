import {
  CONTACTS_ADDRESS_REPOSITORY,
  CONTACTS_NUMBERS_REPOSITORY,
  USER_CONTACTS_REPOSITORY,
} from '../../utils/constants';
import { ContactAddressesModel } from './models/contact-addresses.models';
import { UserContactsModel } from './models/user-contact.models';
import { ContactNumbersModels } from './models/contact-numbers.models';

export const userContactsProviders = [
  {
    provide: CONTACTS_ADDRESS_REPOSITORY,
    useValue: ContactAddressesModel,
  },
  {
    provide: USER_CONTACTS_REPOSITORY,
    useValue: UserContactsModel,
  },
  {
    provide: CONTACTS_NUMBERS_REPOSITORY,
    useValue: ContactNumbersModels,
  },
];
