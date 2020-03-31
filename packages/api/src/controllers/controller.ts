import UserController from './UserContoller';
import OrganizationController from './OrganizationController';

export interface IController {
  user: UserController;
  org: OrganizationController;
}

class Controller {
  public user: UserController;
  public org: OrganizationController;

  constructor() {
    this.user = new UserController(this);
    this.org = new OrganizationController(this);
  }
}

export default new Controller();
