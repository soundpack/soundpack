import Joi from 'joi';
import OrganizationStore from '../stores/OrganizationStore';
import {
  IResourceAPI,
  toError,
  StatusCodeEnum,
  joiToError,
} from '../models/interfaces/common';
import IOrganization from '@soundpack/models/.dist/interfaces/IOrganization';
import IOrganizationAPI, {
  ICreateOrgRequest,
  ICreateOrgResponse,
  IUpdateOrgRequest,
  IUpdateOrgResponse,
  IListOrgsRequest,
  IListOrgsResponse,
  IGetOrgRequest,
  IGetOrgResponse,
  IDeleteOrgRequest,
  IDeleteOrgResponse,
} from '../models/interfaces/IOrganizationAPI';
import { IController } from './controller';

const orgSchema = Joi.object().keys({
  _id: Joi.string().optional(),
  userId: Joi.string().optional(),
  createdAt: Joi.date().optional(),
  name: Joi.string()
    .required()
    .error(() => new Error("Your ranch must have a name.")),
  email: Joi.string()
    .required()
    .error(() => new Error("Your ranch must have an email.")),
  phoneNumber: Joi.string()
    .required()
    .error(() => new Error("Your ranch must have a phone number.")),
  description: Joi.string()
    .required()
    .error(() => new Error("Your ranch must have a description.")),
  address: Joi.string()
    .optional()
    .allow('')
    .error(() => new Error("Your ranch must have an address.")),
});

export default class OrganizationController implements IOrganizationAPI {
  private storage = new OrganizationStore();
  private controller;

  constructor(controller: IController) {
    this.controller = controller;
    console.log(this.controller);
  }

  public create = async (request: ICreateOrgRequest): Promise<ICreateOrgResponse> => {
    let response: ICreateOrgResponse;

    const schema = Joi.object().keys({
      userId: Joi.string().required(),
      org: orgSchema,
    });

    const params = Joi.validate(request, schema);
    const { userId, org }: { userId: string, org: IOrganization } = params.value;

    if (params.error) {
      console.error(params.error);
      response = {
        status: StatusCodeEnum.UNPROCESSABLE_ENTITY,
        error: joiToError(params.error),
      };
      return response;
    }

    /**
    * Save the org to storage
    */
    const now = new Date();
    org.userId = userId;
    org.createdAt = now;
    org.updatedAt = now;

    try {
      const newOrg = await this.storage.create(org);
      response = {
        status: StatusCodeEnum.OK,
        org: newOrg
      };
      return response;
    } catch (e) {
      console.error(e);
      response = {
        status: StatusCodeEnum.INTERNAL_SERVER_ERROR,
        error: toError(e.message),
      };
      return response;
    }
  }

  public update = async (request: IUpdateOrgRequest): Promise<IUpdateOrgResponse> => {
    let response: IUpdateOrgResponse;

    const schema = Joi.object().keys({
      userId: Joi.string().required(),
      org: orgSchema,
    });

    const params = Joi.validate(request, schema);
    const { userId, org }: { userId: string, org: IOrganization } = params.value;

    if (params.error) {
      console.error(params.error);
      response = {
        status: StatusCodeEnum.UNPROCESSABLE_ENTITY,
        error: joiToError(params.error),
      };
      return response;
    }

    org.updatedAt = new Date();

    try {
      const newOrg = await this.storage.update(userId, org);
      response = {
        status: StatusCodeEnum.OK,
        org: newOrg
      };
      return response;
    } catch (e) {
      console.error(e);
      response = {
        status: StatusCodeEnum.INTERNAL_SERVER_ERROR,
        error: toError(e.message),
      };
      return response;
    }
  }

  public list = async (request: IListOrgsRequest): Promise<IListOrgsResponse> => {
    let response: IListOrgsResponse;

    const schema = Joi.object().keys({
      userId: Joi.string().optional(),
    });

    const params = Joi.validate(request, schema);
    const { userId }: { userId: string } = params.value;

    if (params.error) {
      console.error(params.error);
      response = {
        status: StatusCodeEnum.UNPROCESSABLE_ENTITY,
        error: joiToError(params.error),
      };
      return response;
    }

    try {
      const orgs = await this.storage.list(userId || null);
      response = {
        status: StatusCodeEnum.OK,
        orgs,
      };
      return response;
    } catch (e) {
      console.error(e);
      response = {
        status: StatusCodeEnum.INTERNAL_SERVER_ERROR,
        error: toError(e.message),
      };
      return response;
    }
  }

  public get = async (request: IGetOrgRequest): Promise<IGetOrgResponse> => {
    let response: IGetOrgResponse;

    const schema = Joi.object().keys({
      orgId: Joi.string().allow(null).required(),
    });



    const params = Joi.validate(request, schema);
    const { orgId }: { orgId: string } = params.value;

    if (params.error) {
      console.error(params.error);
      response = {
        status: StatusCodeEnum.UNPROCESSABLE_ENTITY,
        error: joiToError(params.error),
      };
      return response;
    }

    try {
      const org = await this.storage.get(orgId);
      response = {
        status: StatusCodeEnum.OK,
        org,
      };
      return response;
    } catch (e) {
      console.error(e);
      response = {
        status: StatusCodeEnum.INTERNAL_SERVER_ERROR,
        error: toError(e.message),
      };
      return response;
    }
  }

  public delete = async (request: IDeleteOrgRequest): Promise<IDeleteOrgResponse> => {
    let response: IDeleteOrgResponse;

    const schema = Joi.object().keys({
      userId: Joi.string().required(),
      orgId: Joi.string().required(),
    });

    const params = Joi.validate(request, schema);
    const { userId, orgId }: { userId: string, orgId: string } = params.value;

    if (params.error) {
      console.error(params.error);
      response = {
        status: StatusCodeEnum.UNPROCESSABLE_ENTITY,
        error: joiToError(params.error),
        deleted: false,
      };
      return response;
    }

    try {
      const deleted = await this.storage.delete(userId, orgId);
      response = {
        status: StatusCodeEnum.OK,
        deleted,
      };
      return response;
    } catch (e) {
      console.error(e);
      response = {
        status: StatusCodeEnum.INTERNAL_SERVER_ERROR,
        error: toError(e.message),
        deleted: null,
      };
      return response;
    }
  }
}
