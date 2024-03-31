import { Document, Model, Types } from 'mongoose';

export interface IContact extends Document {
  contact: {
    firstName: string;
    lastName: string;
    telephoneNumber: string;
    mobileNumber: string;
    fax: string;
    email: string;
  };
  address: { street: string; city: string; zipCode: number };
  additionalInfo: {
    birthDate: Date;
    companyName: string;
    position: string;
    companyAddress: string;
    additionalDetails: string;
  };
  social: {
    facebook: string;
    twitter: string;
    instagram: string;
    linkedin: string;
    slack: string;
    skype: string;
  };
  addedBy: Types.ObjectId;
  favorite: Boolean;
}

export interface PaginationOptions {
  page: string;
  limit: string;
}

export interface SearchOptions {
  contact: {
    firstName?: string;
    lastName?: string;
    telephoneNumber?: string;
    mobileNumber?: string;
    email?: string;
  };
}

export interface ContactsResult {
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
  contacts: IContact[];
}

export interface Query {
  _id: Types.ObjectId;
  addedBy: Types.ObjectId;
  [key: string]: Types.ObjectId | Partial<IContact>;
}

export interface ContactModel extends Model<IContact> {
  isEmailExists(email: string, addedBy: Types.ObjectId): Promise<boolean>;
  getContacts(
    addedBy: Types.ObjectId,
    options: PaginationOptions,
    search?: SearchOptions
  ): Promise<ContactsResult>;
  getById(query: Query): Promise<IContact | null>;
  add(data: IContact): Promise<IContact>;
  update(query: Query): Promise<IContact | null>;
  deleteById(query: Query): Promise<boolean>;
  deleteAll(addedBy: Types.ObjectId): Promise<boolean>;
}
