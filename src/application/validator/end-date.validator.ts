import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  isDate,
  isEmpty,
  registerDecorator,
} from 'class-validator';

@ValidatorConstraint({ async: true, name: 'isEndDate' })
@Injectable()
export class EndDateConstraints implements ValidatorConstraintInterface {
  async validate(
    value: string,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    if (isEmpty(value)) {
      return false;
    }
    if (isDate(value)) {
      return false;
    }
    return true;
  }
  defaultMessage(args: ValidationArguments) {
    return 'validations.date';
  }
}

export function IsEndDate(options?: ValidationOptions) {
  return (o: object, propertyName: string) => {
    registerDecorator({
      target: o.constructor,
      propertyName,
      options,
      validator: EndDateConstraints,
      async: true,
    });
  };
}
