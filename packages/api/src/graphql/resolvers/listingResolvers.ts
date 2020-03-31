import { StatusCodeEnum } from '../../interfaces/common';
import {
  ApolloError,
  AuthenticationError,
} from 'apollo-server-express';
import controller from '../../controllers/controller';
import {
  ICreateListingRequest,
  ICreateListingResponse,
  IUpdateListingRequest,
  IUpdateListingResponse,
  IListListingsRequest,
  IListListingsResponse,
  IGetListingRequest,
  IGetListingResponse,
  IDeleteListingRequest,
  IDeleteListingResponse,
} from '../../interfaces/IListing';

export default {
  Query: { 
    async listing(parent, args, context) {
      const { listingId } = args;
      const { req: { user: { userId } } } = context;

      if (!userId) {
        throw new AuthenticationError("Authentication Required.");
      }

      const request: IGetListingRequest = {
        listingId,
      }

      let response: IGetListingResponse;

      try {
        response = await controller.listing.get(request);

        if (response.status !== StatusCodeEnum.OK) {
          throw new ApolloError(response.error.message, response.status.toString());
        }

      } catch (e) {
        throw e;
      }

      return response.listing;
    },
    async listings(parent, args, context) {
      const { orgId } = args;
      const {
        req: {
          user: { userId }
        }
      } = context;

      if (!userId) {
        throw new AuthenticationError("Authentication Required.");
      }

      const request: IListListingsRequest = {
        orgId,
      }

      let response: IListListingsResponse;

      try {
        response = await controller.listing.list(request);

        if (response.status !== StatusCodeEnum.OK) {
          throw new ApolloError(response.error.message, response.status.toString());
        }

      } catch (e) {
        throw e;
      }

      return response.listings;
    },
  },
  Mutation: {
    async createListing(parent, args, context) {
      const { listing } = args;
      const { req: { user: { orgId, userId } } } = context;

      if (!userId || !orgId) {
        throw new AuthenticationError("Authentication Required.");
      }

      const request: ICreateListingRequest = {
        orgId,
        userId,
        listing,
      }

      let response: ICreateListingResponse;

      try {
        response = await controller.listing.create(request);

        if (response.status !== StatusCodeEnum.OK) {
          throw new ApolloError(response.error.message, response.status.toString());
        }

      } catch (e) {
        throw e;
      }

      return response.listing;
    },
    async updateListing(parent, args, context) {
      const { listing } = args;
      const { req: { user: { orgId, userId } } } = context;

      if (!userId || !orgId) {
        throw new AuthenticationError("Authentication Required.");
      }

      const request: IUpdateListingRequest = {
        orgId,
        userId,
        listing,
      }

      let response: IUpdateListingResponse;

      try {
        response = await controller.listing.update(request);

        if (response.status !== StatusCodeEnum.OK) {
          throw new ApolloError(response.error.message, response.status.toString());
        }

      } catch (e) {
        throw e;
      }

      return response.listing;
    },
    async deleteListing(parent, args, context) {
      const { listingId } = args;
      const { req: { user: { orgId, userId } } } = context;

      if (!userId || !orgId) {
        throw new AuthenticationError("Authentication Required.");
      }

      const request: IDeleteListingRequest = {
        orgId,
        userId,
        listingId,
      }

      let response: IDeleteListingResponse;

      try {
        response = await controller.listing.delete(request);

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
