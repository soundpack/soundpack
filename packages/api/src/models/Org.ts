import { Document, Schema, Model, model } from 'mongoose';
import IOrg from './../interfaces/IOrg';
import shortid from 'shortid';

export interface IOrgModel extends IOrg, Document {
  _id: string,
}

export const OrgSchema = new Schema({
  _id: {
    type: String,
    required: true,
    default: shortid.generate,
  },
  userId: {
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
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  phoneNumber: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
  address: {
    type: String,
    required: false,
  },
});

export const Org: Model<IOrgModel> = model<IOrgModel>('Org', OrgSchema);
