import { Types } from 'mongoose';
import { Session } from 'express-session';

declare module 'express-serve-static-core' {
  export interface Request {
    user: { id: Types.ObjectId };
  }
}

declare module 'express-session' {
  interface SessionData {
    userId: string;
  }
}
