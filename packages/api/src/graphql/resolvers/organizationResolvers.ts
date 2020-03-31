import StatusCodeEnum from '../../models/enums/StatusCodeEnum';
import {
  ApolloError,
  AuthenticationError,
} from 'apollo-server-express';
import controller from '../../controllers/controller';
import {
  IUpdateOrgRequest,
  IUpdateOrgResponse,
  IGetOrgRequest,
  IGetOrgResponse,
  IDeleteOrgRequest,
  IDeleteOrgResponse,
} from '../../models/interfaces/IOrganizationAPI';

export default {
  Query: { 
    async org(parent, args, context) {
      const { req: { user } } = context;

      const request: IGetOrgRequest = {
        auth: {
          userId: user._id,
          orgId: user.orgId,
        }
        
      }

      let response: IGetOrgResponse;

      try {
        response = await controller.org.get(request);

        if (response.status !== StatusCodeEnum.OK) {
          throw new ApolloError(response.error.message, response.status.toString());
        }

      } catch (e) {
        throw e;
      }

      return response.org;
    },
  },
  Mutation: {
    async updateOrg(parent, args, context) {
      let { org } = args;
      const { req: { user: { userId, orgId} } } = context;

      if (!userId) {
        throw new AuthenticationError("Authentication Required.");
      }

      if(!orgId) {
        throw new AuthenticationError("Authorization Required."); 
      }

      org._id = orgId;

      const request: IUpdateOrgRequest = {
        userId,
        org,
      }

      let response: IUpdateOrgResponse;

      try {
        response = await controller.org.update(request);

        if (response.status !== StatusCodeEnum.OK) {
          throw new ApolloError(response.error.message, response.status.toString());
        }

      } catch (e) {
        throw e;
      }

      console.log(response.org);

      return response.org;
    },
    async deleteOrg(parent, args, context) {
      const { orgId } = args;
      const { req: { user: { userId } } } = context;

      if (!userId) {
        throw new AuthenticationError("Authentication Required.");
      }

      const request: IDeleteOrgRequest = {
        userId,
        orgId,
      }

      let response: IDeleteOrgResponse;

      try {
        response = await controller.org.delete(request);

        if (response.status !== StatusCodeEnum.OK) {
          throw new ApolloError(response.error.message, response.status.toString());
        }

      } catch (e) {
        throw e;
      }

      return response.deleted;
    },
  }
};
