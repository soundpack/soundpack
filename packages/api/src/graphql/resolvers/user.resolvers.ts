import StatusCodeEnum from '../../models/enums/StatusCodeEnum';
import {
  ApolloError,
} from 'apollo-server-express';
import controller from '../../controllers/controller';
import {
  IGetUserRequest, 
  IGetUserResponse,
  IRegisterUserRequest,
  IRegisterUserResponse,
  ILoginUserRequest,
  ILoginUserResponse,
} from '../../models/interfaces/IUserAPI';

export default { 
  Query: {
    async user(parent, args, context) {
      const { userId } = parent;

      const request: IGetUserRequest = {
        auth: {
          userId,
        }
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

      const request: IRegisterUserRequest = {
        firstName,
        lastName,
        email,
        phoneNumber,
        password,
      }

      let response: IRegisterUserResponse;

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

      const request: ILoginUserRequest = {
        email,
        password,
      }

      let response: ILoginUserResponse;

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