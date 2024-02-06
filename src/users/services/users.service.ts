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
   * function to signup
   * @param data
   * @returns Promise<UserModel>
   */
  public async createUser(data: any): Promise<UserModel> {
    const password = await this.hashService.hashGenerator(data.password);
    return this.userModel
      .build()
      .setAttributes({ username: data.username, password: password })
      .save();
  }

  /**
   * creating user email & profile picture
   * @param data
   * @param id
   * @param profilePicture
   */
  public async createUserEmailProfile(
    data: string,
    id: number,
    profilePicture: any,
  ): Promise<void> {
    console.log(data, 'data of create user');
    this.userModel.update(
      {
        Email: data,
        profilePicture: profilePicture,
      },
      {
        where: {
          id: id,
        },
      },
    );
  }

  /**
   * creating profile picture in database
   * @param id
   * @param profilePicturePath
   */
  public async createUserProfile(
    id: number,
    profilePicturePath: string,
  ): Promise<void> {
    this.userModel.update(
      {
        profilePicture: profilePicturePath,
      },
      {
        where: {
          id: id,
        },
      },
    );
  }

  /**
   * adding email into database
   * @param data
   * @param id
   */
  public async createUserEmail(data: string, id: number): Promise<void> {
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

  // /**
  //  * find all the users
  //  * @returns : Promise<UserModel[]>
  //  */
  public findAll(): Promise<UserModel[]> {
    return this.userModel.findAll();
  }

  /**
   * find user by pk
   * @param id
   * @returns
   */
  public async findByPK(id: number): Promise<UserModel> {
    return await this.userModel.findByPk(id).then((data) => data || null);
  }

  /**
   * find data with id
   * @param id
   * @returns Promise<UserModel>
   */
  public async findOne(id: number): Promise<UserModel> {
    const data = await this.userModel.findByPk(id);
    return data || null;
  }

  /**
   * Removes a user logged in
   * @param user
   * @returns
   */
  public destroy(user: UserModel): Promise<void> {
    return user.destroy();
  }

  /**
   * finding user with their username for using in validation
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

  /**
   * adding image
   * @param id
   * @param image
   * @returns Promise<[affectedCount:number]>
   */
  public async addImage(
    user: UserModel,
    profilePicture: string,
  ): Promise<UserModel> {
    return user.set({ profilePicture }).save();
  }
}
