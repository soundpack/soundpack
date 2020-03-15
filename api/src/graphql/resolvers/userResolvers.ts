import { StatusCodeEnum } from '../../interfaces/common';
import {
  ApolloError,
} from 'apollo-server-express';
import controller from '../../controllers/controller';
import {
  IGetUserRequest, 
  IGetUserResponse,
  IRegisterRequest,
  IRegisterResponse,
  ILoginRequest,
  ILoginResponse,
} from '../../interfaces/IUser';

export default { 
  Query: {
    async user(parent, args, context) {
      const { userId } = parent;

      const request: IGetUserRequest = {
        userId,
      }

      let response: IGetUserResponse;

      try {
        response = await controller.user.get(request);

        if (response.status !== StatusCodeEnum.OK) {
          throw new ApolloError(response.error.message, 'HIT HERE');
        }

      } catch (e) {
        throw e;
      }

      return response.user;
    },
  },
  Mutation: {
    async register(parent, args, context) {
      const { user: { firstName, lastName, email, phoneNumber, password } } = args;

      const request: IRegisterRequest = {
        firstName,
        lastName,
        email,
        phoneNumber,
        password,
      }

      let response: IRegisterResponse;

      try {
        response = await controller.user.register(request);

        if (response.status !== StatusCodeEnum.OK) {
          throw new ApolloError(response.error.message, 'HIT HERE');
        }

      } catch (e) {
        throw e;
      }

      return response;
    },
    async login(parent, args, context) {
      const { email, password } = args;

      const request: ILoginRequest = {
        email,
        password,
      }

      let response: ILoginResponse;

      try {
        response = await controller.user.login(request);

        if (response.status !== StatusCodeEnum.OK) {
          throw new ApolloError(response.error.message, response.status.toString());
        }

      } catch (e) {
        throw e;
      }

      return response;
    },
  }
};
