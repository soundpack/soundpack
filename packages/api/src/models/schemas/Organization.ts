import { Document, Schema, Model, model } from 'mongoose';
import IOrganization from '@soundpack/models/.dist/interfaces/IOrganization';
import shortid from 'shortid';

export interface IOrganizationModel extends IOrganization, Document {
  _id: string,
}

export const OrganizationSchema = new Schema({
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

const Organization: Model<IOrganizationModel> = model<IOrganizationModel>('Organization', OrganizationSchema);

export default Organization;
