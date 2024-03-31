import { Document, Model, Types } from 'mongoose';

export interface IUser {
  firstName: string;
  lastName: string;
  birthDate: Date;
  email: string;
  password: string;
  image: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IChangePassword {
  oldPassword: string;
  newPassword: string;
  repeatPassword: string;
}

export interface IUserDoc extends IUser, Document {}

export interface IUploadRequest extends Request {
  user: IUser;
  file: string;
}

export interface IUserModel extends Model<IUserDoc> {
  isEmailExists(email: string, addedBy: Types.ObjectId): Promise<boolean>;
  getUserByEmail(email: string): Promise<IUserDoc | null>;
  getUserById(id: Types.ObjectId): Promise<IUserDoc | null>;
  uploadImage(userId: Types.ObjectId, image: string | null): Promise<void>;
  add(user: IUser): Promise<void>;
  delete(userId: Types.ObjectId): Promise<number>;
}
