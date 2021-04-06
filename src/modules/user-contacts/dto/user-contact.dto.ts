import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty, IsOptional, IsEmail, isNotEmpty } from 'class-validator';
import { UserContactsModel } from '../models/user-contact.models';
import { ContactAddressesModel } from '../models/contact-addresses.models';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { ContactNumbersModels } from '../models/contact-numbers.models';

export class CreateContactDto {

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly user_id: number;

  @IsNotEmpty()
  @ApiProperty()
  readonly name: string;

  @IsNotEmpty()
  @ApiProperty()
  readonly last_name: string;

  @IsEmail()
  @IsOptional()
  @ApiProperty()
  readonly email: string;


  @IsOptional()
  @ApiProperty()
  readonly birth: Date;

  @IsNotEmpty()
  @ApiProperty()
  readonly group_code: number;

  @ApiModelProperty()
  readonly phone_numbers: CreateContactNumberDto[]

  @ApiModelProperty()
  readonly addresses: CreateContactAddressDto[]

}

export class ShowContactDto {

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly user_id: number;

  @IsNotEmpty()
  @ApiProperty()
  readonly name: string;

  @IsNotEmpty()
  @ApiProperty()
  readonly last_name: string;

  @IsEmail()
  @IsOptional()
  @ApiProperty()
  readonly email: string;


  @IsOptional()
  @ApiProperty()
  readonly birth: Date;

  @IsNotEmpty()
  @ApiProperty()
  readonly group_code: number;

  @ApiModelProperty()
  readonly phone_numbers: CreateContactNumberDto[]

  @ApiModelProperty()
  readonly addresses: CreateContactAddressDto[]

  constructor(contact: UserContactsModel) {
    this.name = contact.name;
    this.last_name = contact.last_name;
    this.email = contact.email;
    this.group_code = contact.group_code;
    this.birth = contact.birth;
    this.phone_numbers = contact.phone_numbers === null ? null : contact.phone_numbers.map( contact => new CreateContactNumberDto(contact))
    this.addresses = contact.addresses === null ? null : contact.addresses.map( address => new CreateContactAddressDto(address))
  }
}

export class CreateContactNumberDto {

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  user_contact_id: number;

  @IsNotEmpty()
  @ApiProperty()
  readonly number: string;

  @IsOptional()
  @ApiProperty()
  readonly phone_provider: string;

  constructor(contactNumber: ContactNumbersModels) {
    this.user_contact_id = contactNumber.user_contact_id;
    this.number = contactNumber.number;
    this.phone_provider = contactNumber.phone_provider;
  }

}

export class SearchDto {

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly user_id: number;

  @IsOptional()
  @ApiProperty()
  readonly name: string;

  @IsOptional()
  @ApiProperty()
  readonly last_name: string;


}


export class CreateContactAddressDto {

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  user_contact_id: number;

  @IsNotEmpty()
  @ApiProperty()
  readonly street: string;

  @IsNotEmpty()
  @ApiProperty()
  readonly number: string;

  @IsOptional()
  @ApiProperty()
  readonly postal_code: string;

  @IsOptional()
  @ApiProperty()
  observation: string;

  constructor(address: ContactAddressesModel) {
    this.street = address.street;
    this.number = address.number;
    this.postal_code = address.postal_code;
    this.observation =  address.observation;
  }
}
