import Router from 'express';
import {
  addNewContact,
  deleteContact,
  getContactById,
  getContacts,
  updateContact
} from '../controllers/contact.controller';
import { requireAuth, validation } from '../middleware';
import { contactSchema, objectIdSchema } from '../validation';

const router = Router();

router.use(requireAuth);

router
  .get('/', getContacts)
  .get('/:contactId', validation(objectIdSchema), getContactById)
  .post('/', validation(contactSchema), addNewContact)
  .patch('/:contactId', validation(objectIdSchema), updateContact)
  .delete('/:contactId', validation(objectIdSchema), deleteContact);

export default router;
