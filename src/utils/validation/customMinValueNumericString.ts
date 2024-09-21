import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'MinValueNumericString', async: false })
export class CustomMinValueNumericString
  implements ValidatorConstraintInterface
{
  validate(value: any): Promise<boolean> | boolean {
    const integer = parseInt(value);

    if (isNaN(integer)) return false;

    return integer >= 0;
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return `${validationArguments.property} must be greater than 0`;
  }
}
