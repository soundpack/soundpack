import {
  IRequest,
  IResponse,
  IAuthorizedRequest,
  IDeleteResponse,
} from './common';

export default interface IListing {
  _id?: string;
  orgId?: string;
  createdAt?: Date;
  updatedAt?: Date;
  active: boolean;
  title?: string;
  minPrice?: number;
  askPrice?: number;
  location?: string;
  imageUrls?: string[];
  videoUrls?: string[];
  numberOfHead?: number;
  class?: string;
  weight?: number;
  origin?: string;
  slide?: number;
  slideTerms?: string;
  breed?: string;
  bodyCondition?: number;
  flesh?: string;
  estWeightVariance?: string;
  feedHistory?: string;
  estDeliveryDate?: Date;
  weighingConditions?: string;
  vaccs?: string;
  implanted?: boolean;
  ageSourceVerfieid?: boolean;
  horns?: boolean;
  comments?: string;  
}

export interface IListingController {
  create(request: ICreateListingRequest): Promise<ICreateListingResponse>;
  update(request: IUpdateListingRequest): Promise<IUpdateListingResponse>;
  list(request: IListListingsRequest): Promise<IListListingsResponse>;
  get(request: IGetListingRequest): Promise<IGetListingResponse>;
  delete(request: IDeleteListingRequest): Promise<IDeleteListingResponse>;
}

export interface ICreateListingRequest extends IAuthorizedRequest {
  listing: IListing;
}

export interface ICreateListingResponse extends IResponse {
  listing?: IListing;
}

export interface IUpdateListingRequest extends IAuthorizedRequest {
  listing: IListing;
}

export interface IUpdateListingResponse extends IResponse {
  listing?: IListing;
}

export interface IListListingsRequest extends IRequest {
  orgId: string;
}

export interface IListListingsResponse extends IResponse {
  listings?: IListing[];
}

export interface IGetListingRequest extends IRequest {
  listingId: string;
}

export interface IGetListingResponse extends IResponse {
  listing?: IListing;
}

export interface IDeleteListingRequest extends IAuthorizedRequest {
  listingId: string;
}

export interface IDeleteListingResponse extends IDeleteResponse {}
