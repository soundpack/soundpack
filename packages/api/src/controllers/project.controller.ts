import Joi from 'joi';
import ProjectStore from '../stores/project.store';
import {
  toError,
  joiToError,
} from '../models/interfaces/common';
import StatusCodeEnum from "../models/enums/StatusCodeEnum";
import IProject from '@soundpack/models/.dist/interfaces/IProject';
import IProjectAPI, {
  ICreateProjectRequest,
  ICreateProjectResponse,
  IUpdateProjectRequest,
  IUpdateProjectResponse,
  IListProjectsRequest,
  IListProjectsResponse,
  IGetProjectRequest,
  IGetProjectResponse,
  IDeleteProjectRequest,
  IDeleteProjectResponse,
} from '../models/interfaces/IProjectAPI';
import { IController } from './controller';

const orgSchema = Joi.object().keys({
  _id: Joi.string().optional(),
  userId: Joi.string().optional(),
  createdAt: Joi.date().optional(),
  name: Joi.string()
    .required()
    .error(() => new Error("Your team must have a name.")),
  email: Joi.string()
    .required()
    .error(() => new Error("Your team must have an email.")),
  phoneNumber: Joi.string()
    .optional()
    .error(() => new Error("Your team must have a phone number.")),
  description: Joi.string()
    .optional()
    .error(() => new Error("Your team must have a description.")),
  address: Joi.string()
    .optional()
    .allow('')
    .error(() => new Error("Your team must have an address.")),
});

const authenticatedSchema = Joi.object().keys({
  userId: Joi.string().required(),
})

export default class ProjectController implements IProjectAPI {
  private storage = new ProjectStore();
  private controller;

  constructor(controller: IController) {
    this.controller = controller;
    console.log(this.controller);
  }

  public create = async (request: ICreateProjectRequest): Promise<ICreateProjectResponse> => {
    let response: ICreateProjectResponse;

    const schema = Joi.object().keys({
      auth: authenticatedSchema,
      project: orgSchema,
    });

    const params = Joi.validate(request, schema);
    const {  project }: { project: IProject } = params.value;

    if (params.error) {
      console.error(params.error);
      response = {
        status: StatusCodeEnum.UNPROCESSABLE_ENTITY,
        error: joiToError(params.error),
      };
      return response;
    }

    /**
    * Save the project to storage
    */
    const now = Date.now();
    project.createdAt = now;
    project.lastUpdatedAt = now;

    try {
      const newProject = await this.storage.create(project);
      response = {
        status: StatusCodeEnum.OK,
        project: newProject
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

  public update = async (request: IUpdateProjectRequest): Promise<IUpdateProjectResponse> => {
    let response: IUpdateProjectResponse;

    const schema = Joi.object().keys({
      userId: Joi.string().required(),
      org: orgSchema,
    });

    const params = Joi.validate(request, schema);
    const { userId, project }: { userId: string, project: IProject } = params.value;

    if (params.error) {
      console.error(params.error);
      response = {
        status: StatusCodeEnum.UNPROCESSABLE_ENTITY,
        error: joiToError(params.error),
      };
      return response;
    }

    project.lastUpdatedAt = Date.now();

    try {
      const newProject = await this.storage.update(userId, project);
      response = {
        status: StatusCodeEnum.OK,
        project: newProject
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

  public list = async (request: IListProjectsRequest): Promise<IListProjectsResponse> => {
    let response: IListProjectsResponse;

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
      const projects = await this.storage.list(userId || null);
      response = {
        status: StatusCodeEnum.OK,
        projects,
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

  public get = async (request: IGetProjectRequest): Promise<IGetProjectResponse> => {
    let response: IGetProjectResponse;

    const schema = Joi.object().keys({
      projectId: Joi.string().allow(null).required(),
    });

    const params = Joi.validate(request, schema);
    const { projectId }: { projectId: string } = params.value;

    if (params.error) {
      console.error(params.error);
      response = {
        status: StatusCodeEnum.UNPROCESSABLE_ENTITY,
        error: joiToError(params.error),
      };
      return response;
    }

    try {
      const project = await this.storage.get(projectId);
      response = {
        status: StatusCodeEnum.OK,
        project,
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

  public delete = async (request: IDeleteProjectRequest): Promise<IDeleteProjectResponse> => {
    let response: IDeleteProjectResponse;

    const schema = Joi.object().keys({
      userId: Joi.string().required(),
      projectId: Joi.string().required(),
    });

    const params = Joi.validate(request, schema);
    const { userId, projectId }: { userId: string, projectId: string } = params.value;

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
      const deleted = await this.storage.delete(userId, projectId);
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
