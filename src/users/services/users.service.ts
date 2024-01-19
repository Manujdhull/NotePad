import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserModel } from '../../databases/models/user.model';
import {HashService} from '../../authentication/services/hash.service'
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserModel)
    private userModel: typeof UserModel,
    private hashService:HashService 
  ) { }

  public async create(username: string, Password: string): Promise<UserModel> {
    const password=await this.hashService.hashGenerator(Password)
    return this.userModel
      .build()
      .setAttributes({ username: username, password: password })
      .save();
  }

  // getting all users
  public async findAll(): Promise<UserModel[]> {
    return await this.userModel.findAll();
  }

  /**
   * find data with id
   * @param id
   * @returns Promise<UserModel>
   */
  async findOne(id: number): Promise<UserModel> {
    return this.userModel
      .findByPk(id)
      .then((data) => (data || null));
  }

  /**
   * Removes a user
   * @param user 
   * @returns 
   */
  async destroy(user: UserModel): Promise<void> {
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
