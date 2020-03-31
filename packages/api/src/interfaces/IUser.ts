import {
  IRequest,
  IResponse,
} from './common';

export default interface IUser {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  password?: string;
  passwordHash?: string;
  createdAt?: number;
  orgId?: string;
}


export interface IGetUserRequest extends IRequest {
  userId: string;
}

export interface IGetUserResponse extends IResponse { 
  user?: IUser;
}

export interface IAuthenticationResponse {
  user?: IUser;
  token?: string;
}

export interface IRegisterRequest extends IRequest {
  firstName: string;
  lastName: string
  email: string
  phoneNumber: string;
  password: string;
}

export interface IRegisterResponse extends IAuthenticationResponse, IResponse{}

export interface ILoginRequest extends IRequest {
  email: string;
  password: string;
}

export interface ILoginResponse extends IAuthenticationResponse, IResponse {}
