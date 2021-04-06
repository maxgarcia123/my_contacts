import {
  Column,
  Model,
  Table,
  DataType,
  CreatedAt,
  UpdatedAt,
  AllowNull,
  ForeignKey, HasMany, BelongsTo,
} from 'sequelize-typescript';
import { UserContactsModel } from './user-contact.models';

@Table({ tableName: 'contact_addresses' })
export class ContactAddressesModel extends Model<ContactAddressesModel> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.BIGINT,
  })
  id: number;

  @AllowNull(false)
  @ForeignKey(() => UserContactsModel)
  @Column(DataType.BIGINT)
  user_contact_id: number;

  @Column
  street: string;

  @Column
  number: string;

  @AllowNull(true)
  @Column
  postal_code: string;

  @AllowNull(true)
  @Column
  observation: string;

  @Column({ defaultValue: true })
  status: boolean;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;
}
