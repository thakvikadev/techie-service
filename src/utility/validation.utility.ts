import { HttpError } from '@constants/http-error.constant';
import { BadRequestException } from '@nestjs/common';

export const factory = (errors) => {
  const errs = {};
  errors.forEach((error) => {
    const constraints = {};
    for (const key in error?.constraints) {
      try {
        constraints[key] = JSON.parse(error?.constraints[key]);
      } catch (e) {
        constraints[key] = { key: error?.constraints[key] };
      }
    }
    errs[error.property] = constraints;
  });
  throw new BadRequestException({
    message: { key: 'exceptions.bad_request' },
    errors: errs,
    error: HttpError.BAD_REQUEST,
  });
};
