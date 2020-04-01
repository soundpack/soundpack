export default interface IOrganization {
  _id?: string;
  userId?: string;
  createdAt?: number;
  lastUpdatedAt?: number;
  active?: boolean;
  name: string;
  description?: string;
  phoneNumber?: string;
  email?: string;
  address?: string;
}