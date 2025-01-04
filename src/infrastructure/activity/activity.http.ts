import { CreateActivityModel } from '@infrastructure/activity/create-activity.model';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import * as RequestIP from 'request-ip';
import { firstValueFrom } from 'rxjs';

export const ACTIVITY_HTTP = 'ACTIVITY_HTTP';

@Injectable()
export class ActivityHttp {
  constructor(
    @Inject('ACTIVITY_SERVICE') private readonly client: ClientProxy,
  ) {}

  async create(
    data: CreateActivityModel | Array<CreateActivityModel>,
    req?: any,
  ): Promise<void> {
    if (!req) {
      if (Array.isArray(data)) {
        return firstValueFrom(this.client.emit<void>('create-logs', data));
      }
      return firstValueFrom(this.client.emit<void>('create-log', data));
    }
    const url = req.url;
    const method = req.method;
    const srcAddr = !!req ? RequestIP.getClientIp(req) : null;
    const { origin } = req.headers;
    const [protocol, srcHostname, port] = origin
      ? origin?.replace('//', '')?.split(':')
      : [];

    let srcPort = req.connection.remotePort || port;
    if (!port) {
      if (protocol === 'https') {
        srcPort = 443;
      } else {
        srcPort = 80;
      }
    }
    const addr = req.connection.localAddress?.split(':');
    const [, hostname] = `${process.env.BASE_URL}`
      ?.replace('//', '')
      ?.split(':');
    const destHostname = hostname,
      destAddr = addr?.[addr.length - 1],
      destPort = req.connection.localPort;
    if (Array.isArray(data)) {
      data = data.map((element) => {
        let prop = element.properties || {};
        prop = {
          ...prop,
          src_addr: srcAddr,
          src_hostname: srcHostname,
          src_port: srcPort,
          dest_addr: destAddr,
          dest_hostname: destHostname,
          dest_port: destPort,
          url,
          method,
          domain: process.env.AD_DOMAIN,
        };
        return {
          ...element,
          properties: prop,
        };
      });
      return firstValueFrom(this.client.emit<void>('create-logs', data));
    }
    let prop = data.properties || {};
    prop = {
      ...prop,
      src_addr: srcAddr,
      src_hostname: srcHostname,
      src_port: srcPort,
      dest_addr: destAddr,
      dest_hostname: destHostname,
      dest_port: destPort,
      url,
      method,
      domain: process.env.AD_DOMAIN,
    };
    data.properties = prop;
    return firstValueFrom(this.client.emit<void>('create-log', data));
  }
}
