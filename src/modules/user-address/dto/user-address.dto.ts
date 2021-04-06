import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty, IsOptional } from 'class-validator';
import { UserAddressModel } from '../user-address.models';

export class ShowUserAddressDto {
  @IsNumber()
  @IsNotEmpty()
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
export class CreateUserAddressDto {
  @IsNumber()
  @IsNotEmpty()
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

}
