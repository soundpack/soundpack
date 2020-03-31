import IOrganization from '@soundpack/models/.dist/interfaces/IOrganization';
import {
  IRequest,
  IResponse,
  IAuthenticatedRequest,
  IDeleteResponse,
} from './common';

export default interface IOrganizationAPI {
  create(request: ICreateOrgRequest): Promise<ICreateOrgResponse>;
  update(request: IUpdateOrgRequest): Promise<IUpdateOrgResponse>;
  list(request: IListOrgsRequest): Promise<IListOrgsResponse>;
  get(request: IGetOrgRequest): Promise<IGetOrgResponse>;
  delete(request: IDeleteOrgRequest): Promise<IDeleteOrgResponse>;
}

/********************************************************************************
*  Create Organization
********************************************************************************/

export interface ICreateOrgRequest extends IAuthenticatedRequest {
  org: IOrganization;
}

export interface ICreateOrgResponse extends IResponse {
  org?: IOrganization;
}

/********************************************************************************
*  Update Organzation
********************************************************************************/

export interface IUpdateOrgRequest extends IAuthenticatedRequest {
  org: IOrganization;
}

export interface IUpdateOrgResponse extends IResponse {
  org?: IOrganization;
}

/********************************************************************************
*  List Organzations
********************************************************************************/

export interface IListOrgsRequest extends IRequest {
  userId: string;
}

export interface IListOrgsResponse extends IResponse {
  orgs?: IOrganization[];
}

/********************************************************************************
*  Get Organzation
********************************************************************************/

export interface IGetOrgRequest extends IAuthenticatedRequest {
  orgId: string;
}

export interface IGetOrgResponse extends IResponse {
  org?: IOrganization;
}

/********************************************************************************
*  Delete Organzation
********************************************************************************/

export interface IDeleteOrgRequest extends IAuthenticatedRequest {
  orgId: string;
}

export interface IDeleteOrgResponse extends IDeleteResponse {}
