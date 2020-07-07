import UserController from './user.controller';
import OrganizationController from './organization.controller';
import EmailService from '../services/email.service';
import SpeechService from '../services/speech.service';

export interface IController {
  user: UserController;
  organization: OrganizationController;
  email: EmailService;
  speech: SpeechService;
}

class Controller implements IController {
  public user: UserController;
  public organization: OrganizationController;
  public email: EmailService;
  public speech: SpeechService;

  constructor() {
    this.user = new UserController(this);
    this.organization = new OrganizationController(this);
    this.email = new EmailService();
    this.speech = new SpeechService();
  }
}

export default new Controller();
