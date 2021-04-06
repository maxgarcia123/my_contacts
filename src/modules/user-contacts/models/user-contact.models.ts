import {
  Column,
  Model,
  Table,
  DataType,
  CreatedAt,
  UpdatedAt,
  HasMany, AllowNull, ForeignKey,
} from 'sequelize-typescript';
import { UserAddressModel } from '../../user-address/user-address.models';
import { UserModel } from '../../user/user.models';
import { ContactAddressesModel } from './contact-addresses.models';
import { ContactNumbersModels } from './contact-numbers.models';



@Table({ tableName: 'user_contacts' })
export class UserContactsModel extends Model<UserContactsModel> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.BIGINT,
  })
  id: number;

  @AllowNull(false)
  @ForeignKey(() => UserModel)
  @Column(DataType.BIGINT)
  user_id: number;

  @Column
  name: string;

  @Column
  last_name: string;

  @AllowNull(true)
  @Column
  email: string;

  @AllowNull(true)
  @Column
  birth: Date;

  @Column
  group_code: number;

  @Column({ defaultValue: true })
  status: boolean;

  @HasMany( () => ContactAddressesModel)
  addresses: ContactAddressesModel[]

  @HasMany( () => ContactNumbersModels)
  phone_numbers: ContactNumbersModels[]

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;
}
