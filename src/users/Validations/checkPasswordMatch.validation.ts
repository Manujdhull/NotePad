import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { UsersService } from '../services/users.service';

@ValidatorConstraint({ async: true })
export class CheckPasswordMatchValidator
  implements ValidatorConstraintInterface
{
  constructor(private usersService: UsersService) {}
  /**
   * check password amtches or not
   * @param password 
   * @param args 
   * @returns Promise<Boolean>
   */
  public async validate(
    password: any,
    args: ValidationArguments,
  ): Promise<boolean> {
    return true;
  }
  public defaultMessage(args: ValidationArguments): string {
    // here you can provide default error message if validation failed
    return 'Password Not Matched';
  }
}

export function CheckPasswordMatch(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string): void {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: CheckPasswordMatchValidator,
    });
  };
}
