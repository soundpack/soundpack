export default interface IUser {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  password?: string;
  passwordHash?: string;
  createdAt?: number;
  organizationId: string | null;
}