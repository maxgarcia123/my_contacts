import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { UserModel } from '../user.models';
import { UserAddressModel } from '../../user-address/user-address.models';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class LoginUserDto {

  @ApiProperty()
  readonly id: number

  @IsNotEmpty()
  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly last_name: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  readonly email: string;

  @ApiProperty()
  readonly birth: Date;

  @ApiProperty()
  readonly token: string

  constructor(userModel: UserModel, token: string) {
    this.token = token;
    this.id = userModel.id;
    this.name = userModel.name;
    this.last_name = userModel.last_name;
    this.birth = userModel.birth;
    this.email = userModel.email;
  }
}
export class ShowUserDto {
  @IsNotEmpty()
  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly last_name: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  readonly email: string;

  @IsNotEmpty()
  @ApiProperty()
  password: string;

  @ApiProperty()
  readonly birth: Date;


  @ApiModelProperty()
  readonly addresses: ShowUserAddressDto[];

  constructor(userModel: UserModel) {
    this.name = userModel.name;
    this.last_name = userModel.last_name;
    this.birth = userModel.birth;
    this.email = userModel.email;
    this.addresses = userModel.addresses.map( address => new ShowUserAddressDto(address))
  }
}

export class ShowUserAddressDto {

  @ApiProperty()
  readonly user_id: number;

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

  constructor(address: UserAddressModel) {
    this.street = address.street;
    this.number = address.number;
    this.postal_code = address.postal_code;
  }
}

export class CreateUserDto {
  @IsNotEmpty()
  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly last_name: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  readonly email: string;

  @IsNotEmpty()
  @ApiProperty()
  password: string;

  @ApiProperty()
  readonly birth: Date;

  // constructor(userModel: UserModel) {
  //   this.name = userModel.name;
  //   this.last_name = userModel.lastName;
  //   this.birth = userModel.birth;
  //   this.email = userModel.email;
  // }
}
