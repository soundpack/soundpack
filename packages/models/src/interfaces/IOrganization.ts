export default interface IOrg {
  _id?: string;
  userId?: string;
  createdAt?: Date;
  updatedAt?: Date;
  active?: boolean;
  name: string;
  description?: string;
  phoneNumber?: string;
  email?: string;
  address?: string;
}