import { activities, toProps } from '@constants/activities.constant';
import { ActivityHttp } from '@infrastructure/activity/activity.http';
import { CreateActivityModel } from '@infrastructure/activity/create-activity.model';
import { Logger } from '@nestjs/common';
import * as RequestIP from 'request-ip';

export abstract class BaseListener {
  protected readonly activityHttp: ActivityHttp;
  protected readonly logger: Logger;
  constructor(serviceClassName: string, activityHttp: ActivityHttp) {
    this.logger = new Logger(serviceClassName);
    this.activityHttp = activityHttp;
  }
  /**
   * @description Mapping Activity Log Model
   * @param event
   * @param subject
   * @param action
   * @returns CreateActivityModel | CreateActivityModel[]
   */
  public mapLog<T>(
    event: T | any,
    subject: string,
    action: string,
  ): CreateActivityModel | CreateActivityModel[] {
    const userAgent = event.req?.headers['user-agent'];
    const ip = !!event.req ? RequestIP.getClientIp(event.req) : null;
    return {
      remoteAddr: ip,
      useragent: userAgent,
      uuid: event.uuid,
      subject: activities[subject].subject,
      subjectId: event.id,
      actions: activities[subject].actions[action],
      details: activities[subject][action].key,
      properties: toProps({
        obj: event,
        keys: activities[subject][action].props,
      }),
    };
  }
  /**
   * @description Send log to activity log service
   * @param event
   * @param subject
   * @param action
   */
  sendLog<T>(event: T | any, subject: string, action) {
    const log = this.mapLog<T>(event, subject, action);
    if (process.env?.DEBUG?.toLocaleLowerCase() === 'true') {
      this.logger.log(activities[subject].actions[action], log);
    }
    this.activityHttp.create(log, event.req);
  }
}
