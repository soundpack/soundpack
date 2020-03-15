import { Document, Schema, Model, model } from 'mongoose';
import IListing from './../interfaces/IListing';
import shortid from 'shortid';

export interface IListingModel extends IListing, Document {
  _id: string,
}

export const ListingSchema = new Schema({
  _id: {
    type: String,
    required: true,
    default: shortid.generate,
  },
  orgId: {
    type:  String,
    required: false,
  },
  createdAt: {
    type:  Date,
    required: false,
  },
  updatedAt: {
    type: Date,
    required: false,
  },
  active: {
    type: Boolean,
    required: true,
    default: true,
  },
  title: {
    type:  String,
    required: false,
  },
  minPrice: {
    type:  Number,
    required: false,
  },
  askPrice: {
    type:  Number,
    required: false,
  },
  location: {
    type:  String,
    required: false,
  },
  imageUrls: [{
    type: String,
    required: false,
  }],
  videoUrls: [{
    type: String,
    required: false,
  }],
  numberOfHead: {
    type:  Number,
    required: false,
  },
  class: {
    type:  String,
    required: false,
  },
  weight: {
    type:  Number,
    required: false,
  },
  origin: {
    type:  String,
    required: false,
  },
  slide: {
    type:  Number,
    required: false,
  },
  slideTerms: {
    type:  String,
    required: false,
  },
  breed: {
    type:  String,
    required: false,
  },
  bodyCondition: {
    type:  Number,
    required: false,
  },
  flesh: {
    type:  String,
    required: false,
  },
  estWeightVariance: {
    type:  String,
    required: false,
  },
  feedHistory: {
    type:  String,
    required: false,
  },
  estDeliveryDate: {
    type:  Date,
    required: false,
  },
  weighingConditions: {
    type:  String,
    required: false,
  },
  vaccs: {
    type:  String,
    required: false,
  },
  implanted: {
    type:  Boolean,
    required: false,
  },
  ageSourceVerfieid: {
    type:  Boolean,
    required: false,
  },
  horns: {
    type:  Boolean,
    required: false,
  },
  comments: {
    type:  String,
    required: false,
  },
});

export const Listing: Model<IListingModel> = model<IListingModel>('Listing', ListingSchema);
