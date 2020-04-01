import IUser from '@soundpack/models/.dist/interfaces/IUser';
import {
  IRequest,
  IResponse,
  IAuthenticatedRequest,
} from './common';

export default interface IEmailService {
  sendUserPasswordResetEmail(request: ISendUserPasswordResetEmailRequest): Promise<ISendUserPasswordResetEmailResponse>
}

/********************************************************************************
*  Emails
********************************************************************************/

export interface ISendEmailRequest {
  toAddress: string;
}

export interface ISendUserPasswordResetEmailRequest extends ISendEmailRequest {
  resetPasswordUrl: string;
}

export interface ISendUserPasswordResetEmailResponse extends IResponse { }
