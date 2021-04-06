import {
  Column,
  Model,
  Table,
  DataType,
  CreatedAt,
  UpdatedAt,
  BelongsTo, HasMany,
} from 'sequelize-typescript';
import { UserAddressModel } from '../user-address/user-address.models';

@Table({ tableName: 'users', timestamps: true })
export class UserModel extends Model<UserModel> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.BIGINT,
  })
  id: number;

  @Column
  name: string;

  @Column
  last_name: string;

  @Column
  email: string;

  @Column
  password: string;

  @Column
  birth: Date;

  @HasMany( () => UserAddressModel)
  addresses: UserAddressModel[]

  @Column({ defaultValue: true })
  status: boolean;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;
}
