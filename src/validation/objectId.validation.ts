import Joi from 'joi';
import { objectId } from './regexPatterns';
import { ValidationSchema } from '../types/enums';

const objectIdSchema = {
  [ValidationSchema.PARAMS]: Joi.object().keys({
    contactId: Joi.string().regex(objectId).label('ID')
  })
};

export default objectIdSchema;
