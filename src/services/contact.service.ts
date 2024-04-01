import { Types } from 'mongoose';
import messages from '../assets/json/messages.json';
import { NotFoundError, ValidationError } from '../errors';
import Contact from '../models/contact.model';
import {
  ContactsResult,
  IContact,
  PaginationOptions,
  Query,
  QueryType,
  SearchOptions
} from '../types/contact';
import { getHighestNumber } from '../utils';

class ContactService {
  /**
   * Get contacts
   * @param addedBy User ID of the currently logged-in user
   * @param options Pagination options (page, limit)
   * @param search Search options for filtering contacts
   * @returns Object containing paginated contacts and pagination information
   * @throws {NotFoundError} If the requested page does not exist
   */
  static async getContacts(
    addedBy: Types.ObjectId,
    options: PaginationOptions,
    search?: SearchOptions
  ): Promise<ContactsResult> {
    const { page, limit } = options;
    const currentPage = getHighestNumber(page);
    const contactsPerPage = getHighestNumber(limit);
    const skip = (currentPage - 1) * contactsPerPage;

    let query: any = { addedBy };

    if (search) {
      Object.keys(search.contact).forEach((key: string) => {
        const value = search.contact[key as keyof typeof search.contact];
        if (value !== undefined) {
          const k = `contact.${key}`;
          query[k] = new RegExp(value, 'i');
        }
      });
    }

    const contactPromise = Contact.getContacts(query, contactsPerPage, skip);

    const countPromise = Contact.countDocuments(query);

    const [totalResults, contacts] = await Promise.all([
      countPromise,
      contactPromise
    ]);

    const totalPages = Math.ceil(totalResults / contactsPerPage);

    if (totalResults && currentPage > totalPages) {
      throw new NotFoundError(`Page ${page} was not found.`);
    }

    const result: ContactsResult = {
      pagination: {
        page: currentPage,
        limit: contactsPerPage,
        total: totalResults
      },
      contacts
    };

    return result;
  }

  /**
   * Get contact by ID
   * @param query contact id and addedBy properties
   * @returns Retrieved contact
   * @throws {NotFoundError} If the contact is not found
   */
  static async getContactById(query: Query) {
    const contact = await Contact.getById(query);

    if (!contact) {
      throw new NotFoundError(messages.contact.notFound);
    }

    return contact;
  }

  /**
   * Add new contact with unique email address
   * @param data Contact data to be added
   * @throws {ValidationError} If the email address already exists
   * @throws {NotFoundError} If the contact fails to be added
   */
  static async add(data: IContact) {
    const exists = await Contact.isEmailExists(
      data.contact.email,
      data.addedBy
    );

    if (exists) throw new ValidationError(messages.contact.exists);

    const savedContact: IContact = await Contact.add(data);

    if (!savedContact) {
      throw new NotFoundError(messages.contact.failed);
    }
  }

  /**
   * Update contact data
   * @param query Contact ID to be updated and contact data containing fields to be updated
   * @throws {NotFoundError} If the contact is not found
   */
  static async update(query: Query) {
    const result = await Contact.update(query);

    if (!result) {
      throw new NotFoundError(messages.contact.notFound);
    }
  }

  /**
   * Delete contact
   * @param query Contact ID to be deleted and user ID of the currently logged-in user
   * @returns {boolean} True if the contact is successfully deleted
   * @throws {NotFoundError} If the contact is not found
   */
  static async delete(query: Query): Promise<void> {
    const result = await Contact.deleteById(query);

    if (!result) {
      throw new NotFoundError(messages.contact.notFound);
    }
  }
}

export default ContactService;
