import { Document, Model, Types } from 'mongoose';

export interface IToken extends Document {
  token: string;
  userId: Types.ObjectId;
  expires: Date;
}

export interface TokenModel extends Model<IToken> {
  generateToken(
    token: string,
    userId: string,
    expires: number
  ): Promise<string>;
  deleteToken(tokenId: string): Promise<void>;
  getToken(generatedToken: string): Promise<IToken>;
}
