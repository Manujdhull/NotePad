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

  /**
   * function
   * @param data
   * @returns Promise<UserModel>
   */
  public async createUser(data): Promise<UserModel> {
    console.log(data, 'data of create user');
    const password = await this.hashService.hashGenerator(data.password);
    console.log('my password', password);
    return this.userModel
      .build()
      .setAttributes({ username: data.username, password: password })
      .save();
  }

  public async createUserEmailProfile(data, id,profilePicture) {
    console.log(data, 'data of create user');
    // const password = await this.hashService.hashGenerator(data.password);
    console.log('my email', data);
    this.userModel.update(
      {
        Email: data,
        profilePicture:profilePicture
      },
      {
        where: {
          id: id,
        },
      },
    );
  }

  public async createUserProfile( id,profilePicture) {
    this.userModel.update(
      {
        profilePicture:profilePicture
      },
      {
        where: {
          id: id,
        },
      },
    );
  }

  public async createUserEmail( data,id) {
    this.userModel.update(
      {
        Email: data,
      },
      {
        where: {
          id: id,
        },
      },
    );
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

  /**
   * finding user with their username
   * @param username
   * @returns : Promise<UserModel>
   */
  public findByUsername(username: string): Promise<UserModel> {
    return this.userModel.findOne({
      where: {
        username: username,
      },
    });
  }

  public AddingEmail(email, id) {

  }
}
