import { Injectable } from '@nestjs/common';
import {UsersController} from './users.controller'

@Injectable()
export class UsersService {

    // private readonly ab: UsersController[] = [];

    create(user: any):string{
        console.log(user)
        return "hello"
        // this.usersController.push(userController);
    }

//     findAll(): UsersController[] {
//         return this.usersController;
//     }
}