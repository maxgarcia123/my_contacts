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
import { UserModel } from '../user/user.models';

@Table({ tableName: 'user_address' })
export class UserAddressModel extends Model<UserAddressModel> {
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
