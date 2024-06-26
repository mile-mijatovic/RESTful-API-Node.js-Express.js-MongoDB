import { Model, model, Schema, Types } from 'mongoose';
import {
  ContactModel,
  IContact,
  PaginationOptions,
  Query,
  SearchOptions
} from '../types/contact';
import { getHighestNumber } from '../utils';

const contactSchema = new Schema<IContact, ContactModel>({
  contact: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    telephoneNumber: String,
    mobileNumber: String,
    fax: String,
    email: {
      type: String,
      required: true
    },
    image: String
  },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    zipCode: { type: Number, required: true }
  },
  additionalInfo: {
    birthDate: Date,
    companyName: String,
    position: String,
    companyAddress: String,
    additionalDetails: String
  },
  social: {
    facebook: String,
    twitter: String,
    instagram: String,
    linkedin: String,
    slack: String,
    skype: String
  },
  addedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  favorite: { type: Boolean, default: false }
});

class ContactClass extends Model {
  static async isEmailExists(
    email: string,
    addedBy: Types.ObjectId
  ): Promise<boolean> {
    const query: { 'contact.email': string; addedBy: Types.ObjectId } = {
      'contact.email': email,
      addedBy
    };

    return !!(await this.findOne(query));
  }

  static async add(data: IContact): Promise<IContact> {
    return await this.create(data);
  }

  static async update(query: Query) {
    const { _id, addedBy, ...data } = query;
    return await this.findOneAndUpdate({ _id, addedBy }, { ...data });
  }

  static async deleteById(query: Query): Promise<boolean> {
    const result = await this.deleteOne(query);
    return result.deletedCount > 0;
  }

  static async deleteAll(addedBy: Types.ObjectId): Promise<boolean> {
    const result = await this.deleteMany({ addedBy });

    return result.deletedCount > 0;
  }

  static async getContacts(
    query: Query,
    limit: number,
    skip: number
  ): Promise<IContact[] | null> {
    return await this.find(query ?? {})
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });
  }

  static async getById(query: Query): Promise<IContact | null> {
    return await this.findOne(query);
  }
}

contactSchema.loadClass(ContactClass);

const Contact = model<IContact, ContactModel>('Contact', contactSchema);

export default Contact;
