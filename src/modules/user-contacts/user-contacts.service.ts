import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  CONTACTS_ADDRESS_REPOSITORY,
  CONTACTS_NUMBERS_REPOSITORY,
  USER_ADDRESS_REPOSITORY,
  USER_CONTACTS_REPOSITORY,
} from '../../utils/constants';
import { UserContactsModel } from './models/user-contact.models';
import { CreateContactDto, ShowContactDto } from './dto/user-contact.dto';
import { ContactNumbersModels } from './models/contact-numbers.models';
import { ContactAddressesModel } from './models/contact-addresses.models';
import sequelize from 'sequelize';


@Injectable()
export class UserContactsService {
  private readonly jwtPrivateKey: string;

  constructor(
    @Inject(USER_CONTACTS_REPOSITORY)
    private userContactsRepository: typeof UserContactsModel,
    @Inject(CONTACTS_NUMBERS_REPOSITORY)
    private contactsNumbersRepository: typeof ContactNumbersModels,
    @Inject(CONTACTS_ADDRESS_REPOSITORY)
    private contactsAddressRepository: typeof ContactAddressesModel,
  ) {
    this.jwtPrivateKey =
      '316D96A1D5436DD77E9184EE3E3789DC76585AAF479B3025385BB3D7E63176B7';
  }

  async getContacts(user_id) {
    const contacts = await this.userContactsRepository.findAll({ where: { user_id, status: true } });

    if (!contacts) {
      throw new NotFoundException();
    }
    return contacts;
  }

  async getContactInfo(id) {
    const contact = await this.userContactsRepository.findOne({ where: { id, status: true } });
    if (!contact) {
      throw  new NotFoundException();
    }

    const numbers = await this.contactsNumbersRepository.findAll({ where: { user_contact_id: contact.id } });
    if (!numbers) {
      throw  new NotFoundException();
    }

    contact.addresses = await this.contactsAddressRepository.findAll({ where: { user_contact_id: contact.id } });
    contact.phone_numbers = numbers;

    return new ShowContactDto(contact);
  }

  async getContactsByGroup(group_code, user_id) {
    const contacts = await this.userContactsRepository.findAll({ where: { group_code, user_id, status: true } });

    if (contacts.length <= 0) {
      throw  new NotFoundException();
    }

    return contacts;
  }

  async ComplementSearch(searchData) {
    const Op = sequelize.Op;
    const searchWhere = searchData.name !== '' && searchData.last_name !== '' ?
      { name: {  [Op.like]: `%${searchData.name}%` } ,last_name: { [Op.like]: `%${searchData.last_name}%` } , user_id: searchData.user_id, status: true }
      :  searchData.name !== "" ?
      { name: { [Op.like]: `%${searchData.name}%`}, user_id: searchData.user_id, status: true }
      :
      { last_name: {  [Op.like]: `%${searchData.last_name}` }, user_id: searchData.user_id, status: true };

    const search = await this.userContactsRepository.findAll({
      where: searchWhere,
      limit: 3,
      order: [
        ['name', 'ASC'],
      ],
    });

    if (search.length <= 0) {
      throw  new NotFoundException();
    }

    return search;
  }

  async createContact(contact) {
    const userContact = await this.userContactsRepository.create(contact);

    if (!userContact) {
      throw new BadRequestException();
    }

    const numbers = contact.phone_numbers;
    await contact.phone_numbers.map((number, index) => {
      numbers[index].user_contact_id = userContact.id;
    });

    const contacts_numbers = await this.createContactsNumbers(numbers);

    const addresses = contact.addresses;
    await contact.addresses.map((address, index) => {
      addresses[index].user_contact_id = userContact.id;
    });
    userContact.addresses = await this.createContactsAddress(addresses);

    userContact.phone_numbers = contacts_numbers;


    return new ShowContactDto(userContact);
  }

  async createContactsNumbers(numbers) {
    const contacts_numbers = numbers;

    await contacts_numbers.map(contact => this.contactsNumbersRepository.create(contact));
    if (!contacts_numbers) {
      throw  new BadRequestException();
    }
    return contacts_numbers;
  }

  async createContactsAddress(contactAddresses) {
    const addresses = contactAddresses;
    await addresses.map(address => addresses.push(this.contactsAddressRepository.create(address)));
    if (!addresses) {
      throw  new BadRequestException();
    }
    return addresses;
  }

  async delete(id: number){
    const user = await this.userContactsRepository.findOne({where:{id}})
    if (!user) {
      throw  new NotFoundException()
    }
    user.status = false;
    try {
      await user.save();
      return  user
    } catch (err) {
      throw new BadRequestException(err)
    }
  }
}
