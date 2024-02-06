import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashService {
  /**
   * function to convert simple string password into an hashed form
   * @param pass
   * @returns Promise<string>
   */
  public async hashGenerator(Password: string): Promise<string> {
    const password: string = Password;
    //generating random string
    const salt: string = await bcrypt.genSalt();
    //generate password in hash with some random string
    const hash: string = await bcrypt.hash(password, salt);
    return hash;
  }

  /**
   * function for checking hashed password
   * @param password
   * @param usersPassword
   * @returns Promise<boolean>
   */
  public async hashMatch(
    password: string | Buffer,
    usersPassword: string,
  ): Promise<boolean> {
    //this can compare noraml password with hashed password with their own algos
    const isMatch: boolean = await bcrypt.compare(password, usersPassword);
    return isMatch;
  }
}
