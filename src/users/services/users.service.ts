import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserModel } from '../../databases/models/user.model';
import { HashService } from '../Authentication/services/hash.service';

@Injectable()
export class UsersService {
  constructor(
    private hashService: HashService,
    @InjectModel(UserModel)
    private userModel: typeof UserModel,
  ) {}

  public async create(username: string, password: string): Promise<UserModel> {
    return this.userModel
      .build()
      .setAttributes({ username: username, password: password })
      .save();
  }

  // getting all data of user only username
  public async findAll(): Promise<UserModel[] | string> {
    const data = this.userModel.findAll();
    if (!data) {
      return `no data present`;
    }
    return data;
  }

  /**
   * find data with id
   * @param id
   * @returns Promise<UserModel>
   */
  async findOne(id: number): Promise<UserModel> {
    return this.userModel
      .findOne({
        where: {
          id: id,
        },
      })
      .then((data) => (!!data ? data : null));
  }

  // remove data with id
  async destroy(user: UserModel): Promise<void> {
    return user.destroy();
  }

  public find(username: string): Promise<UserModel> {
    return this.userModel.findOne({
      where: {
        username: username,
      },
    });
  }

  public async signup(username: string, pass: string): Promise<UserModel> {
    // see if user exists
    const hash: string = await this.hashService.hashGenerator(pass);
    const userCreated: Promise<UserModel> = this.create(username, hash);
    return userCreated;
  }

  public async signin(username: string, password: string): Promise<any> {
    const user: Promise<UserModel> = this.hashService.hashMatch(
      username,
      password,
    );
    return user;
  }
}
