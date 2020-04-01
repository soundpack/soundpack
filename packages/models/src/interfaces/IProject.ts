export default interface IProject {
  _id?: string;
  organizationId: string;
  active?: boolean;
  name: string;
  description?: string;
  createdAt?: number;
  createdBy?: string;
  lastUpdatedAt?: number;
  lastUpdatedBy?: string;
}
