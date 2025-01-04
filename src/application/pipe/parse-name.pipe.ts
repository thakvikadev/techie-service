import { _name } from '@constants/regex.constant';
import {
  Injectable,
  NotAcceptableException,
  PipeTransform,
} from '@nestjs/common';
import { matches } from 'class-validator';
@Injectable()
export class PipeParseName implements PipeTransform {
  transform(value: any) {
    if (matches(value, _name)) {
      return value;
    }
    throw new NotAcceptableException();
  }
}
