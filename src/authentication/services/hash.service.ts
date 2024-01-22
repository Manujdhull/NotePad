import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashService {
  public async hashGenerator(pass: string) {
    console.log('password', pass);
    const password = pass;
    const salt: string = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    console.log(hash);
    return hash;
  }

  public async hashMatch(password, usersPassword) {
    const isMatch = await bcrypt.compare(password, usersPassword);
    // console.log("checking is match hae kya",isMatch)
    return isMatch;
  }
}
