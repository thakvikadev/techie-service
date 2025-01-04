import {
  Injectable,
  NotAcceptableException,
  PipeTransform,
} from '@nestjs/common';
import { isNumberString } from 'class-validator';

@Injectable()
export class PipeParseNumberString implements PipeTransform {
  transform(value: any) {
    if (isNumberString(value)) {
      return value;
    }
    throw new NotAcceptableException();
  }
}
