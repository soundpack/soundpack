export default interface IProject {
  _id?: string;
  organizationId: string;
  active?: boolean;
  name: string;
  description?: string;
  createdAt?: Date;
  createdBy?: string;
  lastUpdatedAt?: Date;
  lastUpdatedBy?: string;
}
