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
  createdAt?: number;
  createdBy?: string;
  lastlastUpdatedAt?: number;
  lastUpdatedBy?: string;
}
