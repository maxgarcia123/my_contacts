import { Sequelize } from 'sequelize-typescript';
import { UserModel } from '../../modules/user/user.models';
import { UserAddressModel } from '../../modules/user-address/user-address.models';
import { UserContactsModel } from '../../modules/user-contacts/models/user-contact.models';
import { ContactAddressesModel } from '../../modules/user-contacts/models/contact-addresses.models';
import { ContactNumbersModels } from '../../modules/user-contacts/models/contact-numbers.models';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '964801',
        database: 'my_contacts',
        logging: false,
      });
      sequelize.addModels([UserModel, UserAddressModel,UserContactsModel, ContactAddressesModel, ContactNumbersModels]);
      return sequelize;
    },
  },
];
