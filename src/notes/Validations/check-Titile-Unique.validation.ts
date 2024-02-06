// import {
//   registerDecorator,
//   ValidationOptions,
//   ValidatorConstraint,
//   ValidatorConstraintInterface,
// } from 'class-validator';
// import { NotesService } from '../services/notes.service';

// @ValidatorConstraint({ async: true })
// export class CheckPasswordMatchValidator
//   implements ValidatorConstraintInterface
// {
//   constructor(private notesService: NotesService) {}
//   /**
//    * function for check password correct according to userName
//    * @param Title
//    * @param args
//    * @returns Promise<boolean>
//    */
//   public async validate(): Promise<boolean> {
//     return true;
//   }

//   /**
//    * function check only pass match or not
//    * @returns string
//    */
//   public defaultMessage(): string {
//     // here you can provide default error message if validation failed
//     return 'Password Not Matched';
//   }
// }

// export function CheckPasswordMatch(validationOptions?: ValidationOptions) {
//   return function (object: Object, propertyName: string): void {
//     registerDecorator({
//       target: object.constructor,
//       propertyName: propertyName,
//       options: validationOptions,
//       constraints: [],
//       validator: CheckPasswordMatchValidator,
//     });
//   };
// }
