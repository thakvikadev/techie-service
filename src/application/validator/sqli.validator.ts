import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { EntityManager } from 'typeorm';

const rules = {
  comment_dash_rule: /--/,
  semicolon_rule: /.*;.+.*/,
  unmatched_single_quotes_rule: /^([^']*'([^']*'[^']*')*[^']*')[^']*'[^']*$/,
  union_rule: /((%27)|('))union/i,
  sql: /\w*((%27)|('))((%6F)|o|(%4F))((%72)|r|(%52))/i,
  sqlMeta: /(%27)|(')|(--)|(%23)|(#)/i,
  sqlMeta2: /((%3D)|(=))[^\n]*((%27)|(')|(--)|(%3B)|(;))/i,
};

@ValidatorConstraint({ name: 'notSQLInjection' })
@Injectable()
export class NotSQLiConstraints implements ValidatorConstraintInterface {
  constructor(@InjectEntityManager() private readonly manager: EntityManager) {}

  validate(value: string): boolean {
    if (!value) return true; // Allow empty or undefined values
    return !Object.values(rules).some((rule) => value.match(rule));
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} contains potentially malicious SQL input`;
  }
}


export function IsNotSQLi(options?: ValidationOptions) {
  return (o: object, propertyName: string) => {
    registerDecorator({
      target: o.constructor,
      propertyName,
      validator: NotSQLiConstraints,
      async: true,
      options,
    });
  };
}
