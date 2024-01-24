import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserModel } from '../../databases/models/user.model';
import { HashService } from '../../authentication/services/hash.service';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserModel)
    private userModel: typeof UserModel,
    private hashService: HashService,
  ) {}

  public createUser(data): Promise<UserModel> {
    console.log(data, 'data of create user');
    const password = this.hashService.hashGenerator(data.password);
    return this.userModel
      .build()
      .setAttributes({ username: data.username, password: password })
      .save();
  }

  // getting all users
  public findAll(): Promise<UserModel[]> {
    return this.userModel.findAll();
  }

  /**
   * find data with id
   * @param id
   * @returns Promise<UserModel>
   */
  public findOne(id: number): Promise<UserModel> {
    return this.userModel.findByPk(id).then((data) => data || null);
  }

  /**
   * Removes a user
   * @param user
   * @returns
   */
  public destroy(user: UserModel): Promise<void> {
    return user.destroy();
  }

  public findByUsername(username: string): Promise<UserModel> {
    return this.userModel.findOne({
      where: {
        username: username,
      },
    });
  }
}
