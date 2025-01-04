import {
  EVENT_SERVICE,
  NotifyPayload,
} from '@infrastructure/notification/notify.model';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class NotificationEvent {
  constructor(@Inject(EVENT_SERVICE) private readonly client: ClientProxy) {}

  notify(payload: NotifyPayload): Promise<any> {
    return firstValueFrom(this.client.emit({ cmd: 'mailto' }, payload));
  }
}
