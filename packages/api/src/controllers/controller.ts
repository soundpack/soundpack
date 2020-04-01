import UserController from './user.controller';
import OrganizationController from './organization.controller';
import EmailService from '../services/email.service';

export interface IController {
  user: UserController;
  organization: OrganizationController;
  email: EmailService;
}

class Controller implements IController {
  public user: UserController;
  public organization: OrganizationController;
  public email: EmailService;

  constructor() {
    this.user = new UserController(this);
    this.organization = new OrganizationController(this);
    this.email = new EmailService();
  }
}

export default new Controller();
