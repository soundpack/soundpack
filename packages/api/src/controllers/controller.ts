import UserController from './user.controller';
import OrganizationController from './organization.controller';

export interface IController {
  user: UserController;
  organization: OrganizationController;
}

class Controller implements IController {
  public user: UserController;
  public organization: OrganizationController;

  constructor() {
    this.user = new UserController(this);
    this.organization = new OrganizationController(this);
  }
}

export default new Controller();
