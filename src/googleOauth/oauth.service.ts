import { Injectable } from '@nestjs/common';
import { UserOauthModel } from '../databases/models/oauth-user.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UserOauthModel)
    private userOauthModel: typeof UserOauthModel,
  ) {}

  /**
   *adding details of user who loggd in from gmail
   * @param details of user
   * @returns Promise<UserOauthModel> return user
   */
  async validateUser(
    details: Pick<UserOauthModel, 'email' | 'displayName'>,
  ): Promise<UserOauthModel> {
    console.log('AuthService');
    console.log(details);
    const user = this.userOauthModel.build().setAttributes(details).save();
    if (user) return user;
    console.log('User not found. Creating...');
    const newUser = this.userOauthModel.create(details);
    console.log('+++++++++++', newUser);
    // return this.userOauthModel.save(newUser);
  }

  /**
   * finding user with their id
   * @param id
   * @returns : Promise<UserOauthModel>
   */
  async findUser(id: number): Promise<UserOauthModel> {
    const user = await this.userOauthModel.findByPk(id);
    return user;
  }
}
