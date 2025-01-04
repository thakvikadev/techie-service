import { Logger } from '@nestjs/common';

export abstract class BaseController {
  protected readonly logger: Logger;

  public constructor(serviceClassName: string) {
    this.logger = new Logger(serviceClassName);
  }

  log(name: string, obj: any) {
    if (process.env?.DEBUG?.toLocaleLowerCase() === 'true') {
      this.logger.log(name, JSON.stringify(obj, null, 2));
    }
  }
}
