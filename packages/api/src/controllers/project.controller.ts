import Joi from 'joi';
import ProjectStore from '../stores/project.store';
import {
  toError,
  joiToError,
  IAuthorizationData,
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
import moment from 'moment';

const createProjectSchema = Joi.object().keys({
  organizationId: Joi.string()
    .required()
    .error(() => new Error("A project must be associated with an organization.")),
  name: Joi.string()
    .required()
    .error(() => new Error("Your project must have a name.")),
  description: Joi.string()
    .optional(),
});

const updateProjectSchema = Joi.object().keys({
  _id: Joi.string().required(),
  organizationId: Joi.string()
    .optional(),
  name: Joi.string()
    .optional(),
  description: Joi.string()
    .optional(),
});

const authorizedSchema = Joi.object().keys({
  userId: Joi.string().required(),
  organizationId: Joi.string().required(),
});


export default class ProjectController implements IProjectAPI {
  private storage = new ProjectStore();
  private controller;

  constructor(controller: IController) {
    this.controller = controller;
    console.log(this.controller);
  }

  public create = async (request: ICreateProjectRequest): Promise<ICreateProjectResponse> => {
    let response: ICreateProjectResponse = { status: StatusCodeEnum.UNKNOWN_CODE };

    console.log(request);

    const schema = Joi.object().keys({
      auth: authorizedSchema,
      project: createProjectSchema,
    });

    const params = Joi.validate(request, schema);
    const { project, auth }: { project: IProject, auth: IAuthorizationData } = params.value;

    if (params.error) {
      console.error(params.error);
      response.status = StatusCodeEnum.UNPROCESSABLE_ENTITY;
      response.error = joiToError(params.error);
      return response;
    }

    /**
    * Save the project to storage
    */
    const now = moment().unix();
    project.meta = {
      createdBy: auth.userId,
      createdAt: now,
      lastUpdatedBy: auth.userId,
      lastUpdatedAt: now,
    };

    try {
      const newProject = await this.storage.create(project);
      response.status = StatusCodeEnum.OK;
      response.project = newProject;
      return response;
    } catch (e) {
      console.error(e);
      response.status = StatusCodeEnum.INTERNAL_SERVER_ERROR;
      response.error = toError(e.message);
      return response;
    }
  }

  public update = async (request: IUpdateProjectRequest): Promise<IUpdateProjectResponse> => {
    let response: IUpdateProjectResponse = { status: StatusCodeEnum.UNKNOWN_CODE };

    const schema = Joi.object().keys({
      userId: Joi.string().required(),
      project: updateProjectSchema,
    });

    const params = Joi.validate(request, schema);
    const { userId, project }: { userId: string, project: IProject } = params.value;

    if (params.error) {
      console.error(params.error);
      response.status = StatusCodeEnum.UNPROCESSABLE_ENTITY;
      response.error = joiToError(params.error);
      return response;
    }

    project.meta.lastUpdatedAt = Date.now();

    try {
      const newProject = await this.storage.update(userId, project);
      response.status = StatusCodeEnum.OK;
      response.project = newProject;
      return response;
    } catch (e) {
      console.error(e);
      response.status = StatusCodeEnum.INTERNAL_SERVER_ERROR;
      response.error = toError(e.message);
      return response;
    }
  }

  public list = async (request: IListProjectsRequest): Promise<IListProjectsResponse> => {
    let response: IListProjectsResponse = { status: StatusCodeEnum.UNKNOWN_CODE };

    const schema = Joi.object().keys({
      auth: authorizedSchema,
      organizationId: Joi.string().required(),
    });

    const params = Joi.validate(request, schema);
    const { organizationId }: { organizationId: string } = params.value;

    if (params.error) {
      console.error(params.error);
      response.status = StatusCodeEnum.UNPROCESSABLE_ENTITY;
      response.error = joiToError(params.error);
      return response;
    }

    try {
      const projects = await this.storage.list(organizationId);
      response.status = StatusCodeEnum.OK;
      response.projects = projects;
      return response;
    } catch (e) {
      console.error(e);
      response.status = StatusCodeEnum.INTERNAL_SERVER_ERROR;
      response.error = toError(e.message);
      return response;
    }
  }

  public get = async (request: IGetProjectRequest): Promise<IGetProjectResponse> => {
    let response: IGetProjectResponse = { status: StatusCodeEnum.UNKNOWN_CODE };

    const schema = Joi.object().keys({
      auth: authorizedSchema,
      projectId: Joi.string().required(),
    });

    const params = Joi.validate(request, schema);
    const { projectId }: { projectId: string } = params.value;

    if (params.error) {
      console.error(params.error);
      response.status = StatusCodeEnum.UNPROCESSABLE_ENTITY;
      response.error = joiToError(params.error);
      return response;
    }

    try {
      const project = await this.storage.get(projectId);
      response.status = StatusCodeEnum.OK;
      response.project = project;
      return response;
    } catch (e) {
      console.error(e);
      response.status = StatusCodeEnum.INTERNAL_SERVER_ERROR;
      response.error = toError(e.message);
      return response;
    }
  }

  public delete = async (request: IDeleteProjectRequest): Promise<IDeleteProjectResponse> => {
    let response: IDeleteProjectResponse = { status: StatusCodeEnum.UNKNOWN_CODE, deleted: false };

    const schema = Joi.object().keys({
      userId: Joi.string().required(),
      projectId: Joi.string().required(),
    });

    const params = Joi.validate(request, schema);
    const { userId, projectId }: { userId: string, projectId: string } = params.value;

    if (params.error) {
      console.error(params.error);
      response.status = StatusCodeEnum.UNPROCESSABLE_ENTITY;
      response.error = joiToError(params.error);
      response.deleted = false;
      return response;
    }

    try {
      const deleted = await this.storage.delete(userId, projectId);
      response.status = StatusCodeEnum.OK;
      response.deleted = deleted;
      return response;
    } catch (e) {
      console.error(e);
      response.status = StatusCodeEnum.INTERNAL_SERVER_ERROR;
      response.error = toError(e.message);
      response.deleted = false;
      return response;
    }
  }
}
