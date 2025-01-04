import { IsNotSQLi } from '@application/validator/sqli.validator';
import * as regex from '@constants/regex.constant';
import { IsOptional, Matches } from 'class-validator';

export abstract class PaginateRequest {
  @IsOptional()
  size = 10;

  @IsOptional()
  page = 1;

  @IsOptional()
  @Matches(regex._string)
  sort?: string;

  @IsOptional()
  @Matches(regex._string)
  fields = '*';

  @IsOptional()
  @Matches(regex._string)
  keyword?: string;
}

export class ExampleStringValidation {
  @IsNotSQLi({ message: 'Name contains SQL injection patterns' })
  name: string;

  @IsNotSQLi()
  email: string;
}
