import IUser from '@soundpack/models/.dist/interfaces/IUser';
import {
  IRequest,
  IResponse,
  IAuthenticatedRequest,
} from './common';

export default interface IUserAPI {
  register(request: IRegisterUserRequest): Promise<IRegisterUserResponse>
  login(request: ILoginUserRequest): Promise<ILoginUserResponse>
  get(request: IGetUserRequest): Promise<IGetUserResponse>
  // update(request: IUpdateUserRequest): Promise<IUpdateUserResponse>
}

/********************************************************************************
*  Auth User
********************************************************************************/

export interface IRegisterUserRequest extends IRequest {
  firstName: string;
  lastName: string
  email: string
  phoneNumber: string;
  password: string;
}

export interface ILoginUserRequest extends IRequest {
  email: string;
  password: string;
}

export interface IAuthenticateUserResponse extends IResponse {
  user?: IUser;
  token?: string;
}

export interface IRegisterUserResponse extends IAuthenticateUserResponse { }
export interface ILoginUserResponse extends IAuthenticateUserResponse { }

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
