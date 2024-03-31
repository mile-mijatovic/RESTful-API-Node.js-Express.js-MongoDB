import { Model, Schema, model, Types } from 'mongoose';
import { IUser, IUserDoc, IUserModel } from '../types/user';
import { hashPassword } from '../utils';

const userSchema = new Schema<IUserDoc, IUserModel>(
  {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    birthDate: {
      type: Date
    },
    email: {
      type: String,
      unique: true
    },
    image: {
      type: String,
      default: null
    },
    password: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

class UserClass extends Model<IUserModel> {
  static async isEmailExists(email: string): Promise<boolean> {
    return !!(await this.findOne({ email }));
  }

  static async getUserById(id: Types.ObjectId): Promise<IUserDoc | null> {
    return await this.findById(id);
  }

  static async getUserByEmail(email: string): Promise<IUserDoc | null> {
    return await this.findOne({ email });
  }

  static async uploadImage(
    userId: Types.ObjectId,
    image: string
  ): Promise<void | null> {
    return await this.findByIdAndUpdate(userId, { $set: { image } });
  }

  static async add(user: IUser): Promise<void> {
    return await this.create(user);
  }

  static async delete(userId: Types.ObjectId): Promise<number> {
    const { deletedCount } = await this.deleteOne({ _id: userId });
    return deletedCount;
  }
}

userSchema.loadClass(UserClass);

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await hashPassword(this.password);
  }
  next();
});

const User = model<IUserDoc, IUserModel>('User', userSchema, 'users');

export default User;
