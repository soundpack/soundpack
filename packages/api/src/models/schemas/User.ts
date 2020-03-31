import { Document, Schema, Model, model } from 'mongoose';
import IUser from '@soundpack/models/.dist/interfaces/IUser';
import shortid from 'shortid';

export interface IUserModel extends IUser, Document {
  _id: string,
}

export const UserSchema  = new Schema({
  _id: {
    type: String,
    required: true,
    default: shortid.generate,
  },
  email: {
    type: String,
    required: true,
  },
  passwordHash: {
    type: String,
    required: false,
    default: null,
  },
  firstName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Number,
    required: true
  },
  phoneNumber: {
    type: String,
    required: false,
  },
  orgId: {
    type: String,
    required: false,
  },
  phoneNumberVerifiedAt: {
    type: Number,
    required: false,
    default: '',
  },
  emailVerifyCode: {
    type: String,
    required: false,
    default: null,
  },
  emailVerifiedAt: {
    type: Number,
    required: false,
    default: null,
  },
  forgotPasswordCode: {
    type: String,
    required: false,
    default: null,
  },
  lastChangedPasswordAt: {
    type: Number,
    required: false,
    default: null
  },
});

const User: Model<IUserModel> = model<IUserModel>('User', UserSchema);

export default User;
