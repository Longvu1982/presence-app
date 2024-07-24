export type CommonRes = {
  status: number;
  message: string;
  result: any;
};

export enum Status {
  OK = 200,
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  InternalServerError = 500,
  ServiceUnavailable = 503,
}
