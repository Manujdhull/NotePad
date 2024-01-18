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
  validate(username: any, args: ValidationArguments): Promise<boolean> {
    return this.usersService.find(username).then((user) => {
      if (user) return false;
      return true;
    });
  }
  defaultMessage(args: ValidationArguments) {
    // here you can provide default error message if validation failed
    return 'Text ($value) is too short or too long!';
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