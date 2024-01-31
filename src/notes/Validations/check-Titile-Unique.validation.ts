import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { NotesService } from '../services/notes.service';

@ValidatorConstraint({ async: true })
export class CheckPasswordMatchValidator
  implements ValidatorConstraintInterface
{
  constructor(private notesService: NotesService) {}
  /**
   * function for check password correct according to userName
   * @param Title
   * @param args
   * @returns Promise<boolean>
   */
  public async validate(
    Title: any,
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
