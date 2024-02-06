import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UsersService } from '../services/users.service';
import { UserModel } from 'src/databases/models/user.model';

@ValidatorConstraint({ async: true })
export class CheckUserExistsValidator implements ValidatorConstraintInterface {
  constructor(private usersService: UsersService) {}
  /**
   * check user exists or not
   * @param username
   * @param args
   * @returns Promise<boolean>
   */
  public async validate(username: any): Promise<boolean> {
    const user: UserModel = await this.usersService.findByUsername(username);
    if (user) return false;
    return true;
  }
  defaultMessage(): string {
    // here you can provide default error message if validation failed
    return 'username ($value) is already exists';
  }
}

/**
 * function to check user Exists or not if exist it cant go further
 * @param validationOptions
 * @returns :(object:Object,propertyName:string)=>void
 */
export function CheckUserExists(
  validationOptions?: ValidationOptions,
): (object: Object, propertyName: string) => void {
  return function (object: Object, propertyName: string): void {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: CheckUserExistsValidator,
    });
  };
}
