import { _string } from '@constants/regex.constant';
import {
  Injectable,
  NotAcceptableException,
  PipeTransform,
} from '@nestjs/common';
import { matches } from 'class-validator';

@Injectable()
export class PipeParseString implements PipeTransform {
  transform(value: any) {
    if (matches(value, _string)) {
      return value;
    }
    throw new NotAcceptableException();
  }
}
