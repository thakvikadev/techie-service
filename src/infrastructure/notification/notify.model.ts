export const EVENT_SERVICE = 'EVENT_SERVICE';
export enum TEMPLATE_NOTIFY {
  NOTIFICATION = 'NOTIFICATION',
}

interface Payload {
  no?: number | string;
  role?: string;
  location?: string;
  status?: string;
  url: string;
  path: string;
  requester?: Requester;
  approver?: Approver;
  body: any[];
  action: string;
  notifiedAt: string;
  date: Date | string;
}

interface Requester {
  code: string;
  fullName: string;
  email: string;
  title?: string;
  phoneNumber: string;
  pronoun?: string;
}

interface Approver {
  code: string;
  fullName: string;
  title: string;
  email?: string;
  phoneNumber?: string;
  pronoun?: string;
}

interface Notification {
  ref: number; // notifiableId or subjectId
  module: string;
  notifiable: string; // notifiableType or subject
  title?: string;
  subtitle?: string;
  body?: string;
  tags?: string;
}

export interface Recipient {
  uuid: string | Array<string>;
  cc?: string | Array<string>;
  bcc?: string | Array<string>;
}

interface Attachment {
  filename: string;
  content?: string;
  encoding?: string;
  href?: string;
  path?: string;
  cid?: string;
  contentType?: string;
  contentDisposition?: string;
}

export interface NotifyPayload {
  lang?: string;
  recipients?: Array<Recipient>;
  subject?: string;
  notification?: undefined | Notification;
  attachments?: Attachment | Array<Attachment>;
  payload?: Payload;
}
