import {
  IRequest,
  IResponse,
  IAuthenticatedRequest,
  IDeleteResponse,
} from './common';


export default interface IOrg {
  _id?: string;
  userId?: string;
  createdAt?: Date;
  updatedAt?: Date;
  active?: boolean;
  name: string;
  description?: string;
  phoneNumber?: string;
  email?: string;
  address?: string;
}

export interface IOrgController {
  create(request: ICreateOrgRequest): Promise<ICreateOrgResponse>;
  update(request: IUpdateOrgRequest): Promise<IUpdateOrgResponse>;
  list(request: IListOrgsRequest): Promise<IListOrgsResponse>;
  get(request: IGetOrgRequest): Promise<IGetOrgResponse>;
  delete(request: IDeleteOrgRequest): Promise<IDeleteOrgResponse>;
}

export interface ICreateOrgRequest extends IAuthenticatedRequest {
  org: IOrg;
}

export interface ICreateOrgResponse extends IResponse {
  org?: IOrg;
}

export interface IUpdateOrgRequest extends IAuthenticatedRequest {
  org: IOrg;
}

export interface IUpdateOrgResponse extends IResponse {
  org?: IOrg;
}

export interface IListOrgsRequest extends IRequest {
  userId: string;
}

export interface IListOrgsResponse extends IResponse {
  orgs?: IOrg[];
}

export interface IGetOrgRequest extends IRequest {
  orgId: string;
}

export interface IGetOrgResponse extends IResponse {
  org?: IOrg;
}

export interface IDeleteOrgRequest extends IAuthenticatedRequest {
  orgId: string;
}

export interface IDeleteOrgResponse extends IDeleteResponse {}
