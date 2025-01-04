import { Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

export abstract class BaseService {
  protected readonly logger: Logger;
  protected readonly eventEmitter: EventEmitter2;

  public constructor(serviceName: string) {
    this.logger = new Logger(serviceName);
  }
  protected createLog<T>(logName: string, logActivities: T): void {
    this.eventEmitter.emit('logger', { logName, logActivities });
  }
}
