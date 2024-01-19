import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashService {
  public async hashGenerator(pass: string) {
    const saltOrRounds = 10;
    const password = pass;
    const hash = await bcrypt.hash(password, saltOrRounds);
    return hash;
  }

  public async hashMatch(password, usersPassword) {
    const isMatch = await bcrypt.compare(password, usersPassword);
    // console.log("checking is match hae kya",isMatch)
    return isMatch;
  }
}