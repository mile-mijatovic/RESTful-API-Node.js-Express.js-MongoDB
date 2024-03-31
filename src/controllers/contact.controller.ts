import { Request, Response } from 'express';
import { IContact, PaginationOptions, Query } from '../types/contact';
import { asyncHandler, stringToObjectId } from '../utils';
import messages from '../assets/json/messages.json';
import { ContactService } from '../services';
import { Types } from 'mongoose';

export const getContacts = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.user;

  const { page = 1, limit = 5, ...searchOptions } = req.query;

  const pagination = {
    page,
    limit
  } as PaginationOptions;

  const contacts = await ContactService.getContacts(id, pagination, {
    contact: searchOptions
  });

  if (contacts.contacts.length === 0) {
    return res.status(200).json({
      success: true,
      contacts: []
    });
  }

  return res.status(200).json({
    success: true,
    pagination: contacts.pagination,
    contacts: contacts.contacts
  });
});

export const getContactById = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.user;
    const { contactId } = req.params;

    const _id = stringToObjectId(contactId);

    const query: Query = {
      _id,
      addedBy: id
    };

    const foundContact = await ContactService.getContactById(query);

    return res.status(200).json({ success: true, contact: foundContact });
  }
);

export const addNewContact = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.user;

    const contactData: IContact = { addedBy: id, ...req.body };

    await ContactService.add(contactData);

    return res.status(201).json({
      success: true,
      message: messages.contact.added
    });
  }
);

export const updateContact = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.user;
    const contactData = req.body;
    const { contactId } = req.params;

    const _id = stringToObjectId(contactId);

    const query: Query = {
      _id,
      addedBy: new Types.ObjectId(id),
      ...contactData
    };

    await ContactService.update(query);

    let message = messages.contact.updated;

    if (req.body.favorite !== undefined) {
      message = req.body.favorite
        ? messages.contact.favorite.added
        : messages.contact.favorite.removed;
    }

    return res.status(200).json({ success: true, message });
  }
);

export const deleteContact = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.user;
    const { contactId } = req.params;

    const _id = stringToObjectId(contactId);

    const query: Query = { _id, addedBy: id };

    await ContactService.delete(query);

    return res
      .status(200)
      .json({ success: true, message: messages.contact.deleted });
  }
);
