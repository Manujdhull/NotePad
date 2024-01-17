import { Injectable, Param } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserModel } from '../../databases/models/user.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserModel)
    public userModel: typeof UserModel,
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

  // find data with id
  async findOne(id: string): Promise<string | object> {
    // console.log(id,"id in service");
    const data = this.userModel.findOne({
      where: {
        id: id,
      },
    });
    if (!data) {
      return `Id:${id} you entered is not present`;
    }
    // console.log((await data));
    return await data;
  }

  // remove data with id
  async destroy(@Param('id') id: string): Promise<string | number> {
    const user = await this.findOne(id);
    if (!user) {
      return `user id ${id} is not present in data`;
    }
    return await this.userModel.destroy({
      where: {
        id: id,
      },
    });
  }

  find(username: string) {
    return this.userModel.findOne({
      where: {
        username: username,
      },
    });
  }
}
