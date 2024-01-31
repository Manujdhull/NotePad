import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { UsersService } from '../services/users.service';

@ValidatorConstraint({ async: true })
export class CheckUserExistsValidator implements ValidatorConstraintInterface {
  constructor(private usersService: UsersService) {}
  /**
   * check user exists or not
   * @param username
   * @param args
   * @returns Promise<boolean>
   */
  validate(username: any, args: ValidationArguments): Promise<boolean> {
    return this.usersService.findByUsername(username).then((user) => {
      if (user) return false;
      return true;
    });
  }
  defaultMessage(args: ValidationArguments) {
    // here you can provide default error message if validation failed
    return 'username ($value) is already exists';
  }
}

export function CheckUserExists(validationOptions?: ValidationOptions) {
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
