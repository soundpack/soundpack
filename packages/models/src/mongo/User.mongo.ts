import shortid from 'shortid';

export default {
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
  organizationId: {
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
}