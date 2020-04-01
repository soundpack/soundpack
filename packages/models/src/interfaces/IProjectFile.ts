export default interface IProject {
  _id?: string;
  organizationId: string;
  projectId: string;
  active?: boolean;
  name: string;
  description?: string;
  audioUrl?: string;
  textUrl?: string;
  text?: string;
  createdAt?: Date;
  createdBy?: string;
  lastUpdatedAt?: Date;
  lastUpdatedBy?: string;
}
