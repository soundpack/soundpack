import UserController from './UserContoller';
import ListingController from './ListingController';
import OrgController from './OrgController';

export interface IController {
  user: UserController;
  listing: ListingController;
  org: OrgController;
}

class Controller {
  public user: UserController;
  public listing: ListingController;
  public org: OrgController;

  constructor() {
    this.user = new UserController(this);
    this.listing = new ListingController(this);
    this.org = new OrgController(this);
  }
}

export default new Controller();

