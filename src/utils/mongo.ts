import mongoose from 'mongoose';

export function stringToObjectId(str: string) {
  return new mongoose.Types.ObjectId(str);
}
