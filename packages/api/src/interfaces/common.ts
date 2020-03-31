export interface IRequest {

}

export interface IResponse {
  status: StatusCodeEnum;
  error?: IError;
}

export interface IAuthenticatedRequest extends IRequest {
  userId: string;
}

export interface IAuthorizedRequest extends IAuthenticatedRequest {
  orgId: string;
}

export interface IDeleteResponse extends IResponse {
  deleted: boolean
}

export interface IError {
  message: string
}

export interface IResourceAPI {
  create(request: IAuthenticatedRequest): Promise<IResponse>;
  update(request: IAuthenticatedRequest): Promise<IResponse>;
  list(request: IRequest): Promise<IResponse>;
  get(request: IRequest): Promise<IResponse>;
  delete(request: IAuthenticatedRequest): Promise<IDeleteResponse>;
}


export enum StatusCodeEnum {
  UNKNOWN_CODE = 0,
  OK = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  UNPROCESSABLE_ENTITY = 422,
  INTERNAL_SERVER_ERROR = 500,
  GATEWAY_TIMEOUT = 504,
}


export function joiToError(joiError: any): IError {
  let message = 'There was an error processing your request. Please contact support.';
  if (joiError && joiError.details && joiError.details[0]) {
    message = joiError.details[0].message;
  } else {
    message = joiError.message;
  }

  const error: IError = {
    message,
  };

  return error;
}

export function toError(message: string): IError {
  const error: IError = {
    message,
  };

  return error;
}
