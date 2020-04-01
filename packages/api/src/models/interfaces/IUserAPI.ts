import IUser from '@soundpack/models/.dist/interfaces/IUser';
import {
  IRequest,
  IResponse,
  IAuthenticatedRequest,
} from './common';

export default interface IUserAPI {
  register(request: IRegisterUserRequest): Promise<IRegisterUserResponse>
  login(request: ILoginUserRequest): Promise<ILoginUserResponse>
  sendPasswordReset(request: ISendUserPasswordResetRequest): Promise<ISendUserPasswordResetResponse>
  // resetPassword(request: IResetUserPasswordRequest): Promise<IResetUserPasswordResponse>
  get(request: IGetUserRequest): Promise<IGetUserResponse>
  // update(request: IUpdateUserRequest): Promise<IUpdateUserResponse>
}

/********************************************************************************
*  Authentication
********************************************************************************/

export interface IAuthenticateUserResponse extends IResponse {
  user?: IUser;
  token?: string;
}

export interface IRegisterUserRequest extends IRequest {
  firstName: string;
  lastName: string
  email: string
  phoneNumber: string;
  password: string;
}

export interface IRegisterUserResponse extends IAuthenticateUserResponse { }

export interface ILoginUserRequest extends IRequest {
  email: string;
  password: string;
}

export interface ILoginUserResponse extends IAuthenticateUserResponse { }

export interface ISendUserPasswordResetRequest extends IRequest {
  email: string;
}

export interface ISendUserPasswordResetResponse extends IResponse {}

export interface IResetUserPasswordRequest extends IRequest {
  code: string;
  password: string;
}

export interface IResetUserPasswordResponse extends IAuthenticateUserResponse {}

/********************************************************************************
*  Get User
********************************************************************************/

export interface IGetUserRequest extends IAuthenticatedRequest {}

export interface IGetUserResponse extends IResponse {
  user?: IUser;
}

/********************************************************************************
*  Update User
********************************************************************************/

export interface IUpdateUserRequest extends IAuthenticatedRequest {
  user: IUser;  
}

export interface IUpdateUserResponse extends IResponse {
  user?: IUser;
}
