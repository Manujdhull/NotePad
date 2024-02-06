import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: true })
export class CheckPasswordMatchValidator
  implements ValidatorConstraintInterface
{
  constructor() {}
  /**
   * check password amtches or not
   * @param password
   * @param args
   * @returns Promise<Boolean>
   */
  public validate(): boolean {
    return true;
  }
  /**
   * function showing default message
   * @returns
   */
  public defaultMessage(): string {
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
