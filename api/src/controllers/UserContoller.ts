
import jwt from 'jsonwebtoken';
import Joi from 'joi';
import UserStore from '../stores/UserStore';
import IUser, {
  IGetUserRequest,
  IGetUserResponse,
  IRegisterRequest,
  IRegisterResponse,
  ILoginRequest,
  ILoginResponse,
} from '../interfaces/IUser';
import IOrg, {
  ICreateOrgRequest
} from '../interfaces/IOrg';
import { toError, StatusCodeEnum, } from './../interfaces/common';
import { JWT_SECRET } from './../env';
import { IController } from './controller';

export default class UserController {
  private storage = new UserStore();
  private controller;

  constructor(controller: IController) {
    this.controller = controller;
    console.log(this.controller);
  }

  private generateJWT = (user: IUser): string => {
    return jwt.sign({ _id: user._id, email: user.email, orgId: user.orgId }, JWT_SECRET);
  }

  public get = async (request: IGetUserRequest): Promise<IGetUserResponse> => {
    let response: IGetUserResponse;

    const schema = Joi.object().keys({
      userId: Joi.string().required(),
    });

    const params = Joi.validate(request, schema);
    const { userId }: { userId: string } = params.value;

    if (params.error) {
      console.error(params.error);
      response = {
        status: StatusCodeEnum.UNPROCESSABLE_ENTITY,
        error: toError(params.error.details[0].message),
      };
      return response;
    }

    try {
      const user = await this.storage.get(userId);
      response = {
        status: StatusCodeEnum.OK,
        user,
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
  
  public register = async (request: IRegisterRequest): Promise<IRegisterResponse> => {
    let response: IRegisterResponse;

    const schema = Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      phoneNumber: Joi.string().optional(),
    });

    const params = Joi.validate(request, schema);
    const { email, password, firstName, lastName, phoneNumber } = params.value;

    if (params.error) {
      console.error(params.error);
      response = {
        status: StatusCodeEnum.UNPROCESSABLE_ENTITY,
        error: toError(params.error.details[0].message),
      };
      return response;
    }

    /**
    * Make sure that there isn't an existing account
    * associated with this email address
    */
    let existingUser: IUser;
    try {
      existingUser = await this.storage.findByEmail(email);
    } catch (e) {
      console.error(e);
      response = {
        status:  StatusCodeEnum.INTERNAL_SERVER_ERROR,
        error: toError(e.message),
      };
      return response;
    }

    if (existingUser && existingUser.email) {
    
      const errorMsg = 'An account with this email already exists.'
      console.error(errorMsg);
      response = {
        status:  StatusCodeEnum.BAD_REQUEST,
        error: toError(errorMsg),
      };
      return response;
    }

    /**
    * Save the user to storage
    */
    const attributes: IUser = {
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
      createdAt: Date.now(),
    };

    let user: IUser;
    try {
      user = await this.storage.createUser(attributes);
    } catch (e) {
      console.error(e);
      response = {
        status: StatusCodeEnum.INTERNAL_SERVER_ERROR,
        error: toError(e.message),
      };
      return response;
    }

    /**
    * Create an org for the user
    * and set the orgId on the user
    */
    try {
      const request: ICreateOrgRequest = {
        userId: user._id,
        org: {
          name: `${firstName} ${lastName}'s Ranch`,
          email,
          phoneNumber,
          address: '',
          description: `${firstName}'s cattle ranch`,
        },
      }

      const { org }: { org: IOrg} = await this.controller.org.create(request);
      user = await this.storage.setOrgId(user._id, org._id);
      
    } catch (e) {
      console.error(e);
      response = {
        status: StatusCodeEnum.INTERNAL_SERVER_ERROR,
        error: toError(e.message),
      };
      return response;
    }

    console.log(user);

    response = {
      status: StatusCodeEnum.OK,
      token: this.generateJWT(user),
      user,
    };

    return response;
  }

  public login = async (request: ILoginRequest): Promise<ILoginResponse> => {
    let response: ILoginResponse;

    const schema = Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });

    const params = Joi.validate(request, schema);
    const { email, password } = params.value;

    if (params.error) {
      console.error(params.error);
      response = {
        status: StatusCodeEnum.UNPROCESSABLE_ENTITY,
        error: toError(params.error.details[0].message),
      };
      return response;
    }

    /**
    * Make sure that there is an existing account
    * associated with this email address
    */
    let user: IUser;
    try {
      user = await this.storage.findByEmail(email);
    } catch (e) {
      console.error(e);
      response = {
        status: StatusCodeEnum.INTERNAL_SERVER_ERROR,
        error: toError(e),
      };
      return response;
    }

    if (!user || !user.email) {
      const errorMsg = 'A user with this email does not exist.'
      console.error(errorMsg);
      response = {
        status: StatusCodeEnum.NOT_FOUND,
        error: toError(errorMsg),
      };
      return response;
    }

    let isValidPassword: boolean;
    try {
      isValidPassword = await this.storage.comparePasswordHash(password, user.passwordHash);  
    } catch (e) {
      console.error(e);
      response = {
        status: StatusCodeEnum.FORBIDDEN,
        error: toError(e.message),
      };
      return response;
    }

    if (!isValidPassword) {
      const errorMsg = 'Invalid Password.'
      console.error(errorMsg);
      response = {
        status: StatusCodeEnum.FORBIDDEN,
        error: toError(errorMsg),
      };
      return response;
    }

    response = {
      status: StatusCodeEnum.OK,
      token: this.generateJWT(user),
      user,
    };

    return response;
  }

}