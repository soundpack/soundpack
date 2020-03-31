
// import uuid4 from 'uuid/v4';
import Joi from 'joi';
import ListingStore from '../stores/ListingStore';
import {
  IResourceAPI,
  toError,
  StatusCodeEnum,
} from '../interfaces/common';
import IListing, {
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
  IListingController,
} from '../interfaces/IListing';
import { IController } from './controller';

const listingSchema = Joi.object().keys({
  _id: Joi.string().allow('').allow(null).optional(),
  orgId: Joi.string().allow('').allow(null).optional(),
  createdAt: Joi.date().allow('').allow(null).optional(),
  title: Joi.string().allow('').allow(null).optional(),
  minPrice: Joi.number().allow('').allow(null).optional(),
  askPrice: Joi.number().allow('').allow(null).optional(),
  location: Joi.string().allow('').allow(null).optional(),
  imageUrls: Joi.array().default([]),
  videoUrls: Joi.array().default([]),
  numberOfHead: Joi.number().allow('').allow(null).optional(),
  class: Joi.string().allow('').allow(null).optional(),
  weight: Joi.number().allow('').allow(null).optional(),
  origin: Joi.string().allow('').allow(null).optional(),
  slide: Joi.number().allow('').allow(null).optional(),
  slideTerms: Joi.string().allow('').allow(null).optional(),
  breed: Joi.string().allow('').allow(null).optional(),
  bodyCondition: Joi.number().allow('').allow(null).optional(),
  flesh: Joi.string().allow('').allow(null).optional(),
  estWeightVariance: Joi.string().allow('').allow(null).optional(),
  feedHistory: Joi.string().allow('').allow(null).optional(),
  estDeliveryDate: Joi.date().allow('').allow(null).optional(),
  weighingConditions: Joi.string().allow('').allow(null).optional(),
  vaccs: Joi.string().allow('').allow(null).optional(),
  implanted: Joi.boolean().allow('').allow(null).optional(),
  ageSourceVerfieid: Joi.boolean().allow('').allow(null).optional(),
  horns: Joi.boolean().allow('').allow(null).optional(),
  comments: Joi.string().allow('').allow(null).optional(),
});

export default class ListingController implements IResourceAPI, IListingController {
  private storage = new ListingStore();
  private controller;

  constructor(controller: IController) {
    this.controller = controller;
    console.log(this.controller);
  }
  
  public create = async (request: ICreateListingRequest): Promise<ICreateListingResponse> => {
    let response: ICreateListingResponse;

    const schema = Joi.object().keys({
      orgId: Joi.string().required(),
      userId: Joi.string().required(),
      listing: listingSchema,
    });

    const params = Joi.validate(request, schema);
    const { orgId, listing }: { orgId: string, listing: IListing } = params.value;

    if (params.error) {
      console.error(params.error);
      response = {
        status: StatusCodeEnum.UNPROCESSABLE_ENTITY,
        error: toError(params.error.details[0].message),
      };
      return response;
    }

    /**
    * Save the listing to storage
    */
    const now = new Date();
    listing.orgId = orgId;
    listing.createdAt = now;
    listing.updatedAt = now;
    listing.active = true;

    try {
      const newListing = await this.storage.create(listing);
      response = {
        status: StatusCodeEnum.OK,
        listing: newListing
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

  public update = async (request: IUpdateListingRequest): Promise<IUpdateListingResponse> => {
    let response: IUpdateListingResponse;

    const schema = Joi.object().keys({
      orgId: Joi.string().required(),
      userId: Joi.string().required(),
      listing: listingSchema
    });

    const params = Joi.validate(request, schema);
    const { orgId, listing }: { orgId: string, listing: IListing } = params.value;

    if (params.error) {
      console.error(params.error);
      response = {
        status: StatusCodeEnum.UNPROCESSABLE_ENTITY,
        error: toError(params.error.details[0].message),
      };
      return response;
    }

    listing.updatedAt = new Date();

    try {
      const newListing = await this.storage.update(orgId, listing);
      response = {
        status: StatusCodeEnum.OK,
        listing: newListing
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

  public list = async (request: IListListingsRequest): Promise<IListListingsResponse> => {
    let response: IListListingsResponse;

    const schema = Joi.object().keys({
      orgId: Joi.string().optional().allow(null)
    });

    const params = Joi.validate(request, schema);
    const { orgId }: { orgId: string } = params.value;

    if (params.error) {
      console.error(params.error);
      response = {
        status: StatusCodeEnum.UNPROCESSABLE_ENTITY,
        error: toError(params.error.details[0].message),
      };
      return response;
    }

    try {
      const listings = await this.storage.list(orgId || null);
      response = {
        status: StatusCodeEnum.OK,
        listings,
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

  public get = async (request: IGetListingRequest): Promise<IGetListingResponse> => {
    let response: IGetListingResponse;

    const schema = Joi.object().keys({
      listingId: Joi.string().required(),
    });

    const params = Joi.validate(request, schema);
    const { listingId }: { listingId: string } = params.value;

    if (params.error) {
      console.error(params.error);
      response = {
        status: StatusCodeEnum.UNPROCESSABLE_ENTITY,
        error: toError(params.error.details[0].message),
      };
      return response;
    }

    try {
      const listing = await this.storage.get(listingId);
      response = {
        status: StatusCodeEnum.OK,
        listing,
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
  
  public delete = async (request: IDeleteListingRequest): Promise<IDeleteListingResponse> => {
    let response: IDeleteListingResponse;

    const schema = Joi.object().keys({
      orgId: Joi.string().required(),
      listingId: Joi.string().required(),
    });

    const params = Joi.validate(request, schema);
    const { orgId, listingId }: { orgId: string, listingId: string } = params.value;

    if (params.error) {
      console.error(params.error);
      response = {
        status: StatusCodeEnum.UNPROCESSABLE_ENTITY,
        error: toError(params.error.details[0].message),
        deleted: false,
      };
      return response;
    }

    try {
      const deleted = await this.storage.delete(orgId, listingId);
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
