import {
  Column,
  Model,
  Table,
  DataType,
  CreatedAt,
  UpdatedAt,
  AllowNull, ForeignKey,
} from 'sequelize-typescript';
import { UserContactsModel } from './user-contact.models';


@Table({ tableName: 'contact_numbers' })
export class ContactNumbersModels extends Model<ContactNumbersModels> {
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
  number: string;

  @AllowNull(true)
  @Column
  phone_provider: string;

  @Column({ defaultValue: true })
  status: boolean;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;
}
