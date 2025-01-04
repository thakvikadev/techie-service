export interface CreateActivityModel {
  uuid: string;
  subject: string;
  subjectId: number;
  actions: string;
  details: string;
  properties: any;
  useragent?: string;
  remoteAddr?: string;
}
