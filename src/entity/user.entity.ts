import { Model, Table, Column, DataType } from 'sequelize-typescript';
import * as bcrypt from 'bcrypt';

@Table({
  tableName: User.USER_TABLE_NAME,
})
export class User extends Model {
  public static USER_TABLE_NAME = 'users' as string;
  public static USER_ID = 'id' as string;
  public static USER_NAME = 'name' as string;
  public static USER_EMAIL = 'email' as string;
  public static USER_PASSWORD = 'password' as string;
  public static USER_BALANCE = 'balance' as string;

  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: User.USER_ID,
  })
  id!: number;

  @Column({
    type: DataType.STRING(255),
    field: User.USER_NAME,
  })
  name!: string;

  @Column({
    type: DataType.STRING(255),
    field: User.USER_EMAIL,
    unique: true,
    allowNull: false,
  })
  email!: string;

  @Column({
    type: DataType.STRING(255),
    field: User.USER_PASSWORD,
  })
  password!: string;

  @Column({
    type: DataType.INTEGER,
    field: User.USER_BALANCE,
    defaultValue: 100, // Default balance is set to 100
  })
  balance!: number;

  // Method to compare provided password with the hashed password in the database
  async comparePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}
