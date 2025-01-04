import { toAction } from '@constants/activities.constant';
import {
  ACTIVITY_HTTP,
  ActivityHttp,
} from '@infrastructure/activity/activity.http';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Inject,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import * as RequestIP from 'request-ip';

@Catch(Error)
export class ErrorExceptionFilter implements ExceptionFilter<Error> {
  private readonly logger: Logger = new Logger(ErrorExceptionFilter.name);
  constructor(
    @Inject(ACTIVITY_HTTP)
    private readonly activityHttp: ActivityHttp,
  ) {}

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const uuid = (request as any)?.user?.uuid;
    const useragent = request.headers['user-agent'];
    const ip = RequestIP.getClientIp(request);
    const path = toAction(`${request.method}::${request.path}`);
    this.logger.error(`Causer          : ${uuid}`);
    this.logger.error(`User Agent      : ${useragent}`);
    this.logger.error(`Request IP      : ${ip}`);
    this.logger.error(`Event Category  : ${path.subject || 'unknown'}`);
    this.logger.error(`Event Name      : ${path.action || 'unknown'}`);
    this.logger.error(`Outcome         : failure`);
    console.error(exception.stack);
    if (!!path.subject) {
      this.activityHttp.create({
        remoteAddr: ip,
        useragent: useragent,
        uuid: uuid,
        subject: path.subject,
        subjectId: 0,
        actions: path.action,
        details: path.details.key + '.failure',
        properties: exception,
      });
    }
    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Internal Server Error.',
      error: exception.message,
    });
  }
}
