import {
  HttpStatus,
  ParseUUIDPipe,
  ParseUUIDPipeOptions,
} from '@nestjs/common';

export class PipeParseUUID extends ParseUUIDPipe {
  constructor(options?: ParseUUIDPipeOptions) {
    super({
      version: '4',
      errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
      ...options,
    });
  }
}
