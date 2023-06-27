import React, { useState } from 'react';
import { FiUserMinus, FiEdit } from 'react-icons/fi';

import { List, Item, Name, Number, Delete, Edit } from './ContactList.styled';

import {
  useDeleteContactMutation,
  useGetContactsQuery,
  useUpdateContactMutation,
} from '../../redux/contactsApi';
import Loader from 'components/Loader/Loader';
import { RotatingLines } from 'react-loader-spinner';
import { useSelector } from 'react-redux';
import { Modal } from 'components/Modal/Modal';


export const ContactList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedContact, setEditedContact] = useState(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const { data: contacts, isLoading, error } = useGetContactsQuery();

  const [deleteContacts, { isLoading: isDeletingContact }] =
    useDeleteContactMutation();

  const filter = useSelector(state => state.filter);

  let filteredContacts = contacts;

  if (filter && filter.trim() !== '') {
    const normalizedFilter = filter.toLowerCase().trim();

    filteredContacts = filteredContacts.filter(
      contact =>
        (contact.name &&
          contact.name.toLowerCase().includes(normalizedFilter)) ||
        (contact.phone && contact.phone.includes(normalizedFilter))
    );
  }

  const handleDelete = id => {
    deleteContacts(id);
  };
  const [updateContact, { isLoading: isUpdatingContact }] =
    useUpdateContactMutation();
  const handleEdit = id => {
    const editedContact = filteredContacts.find(contact => contact.id === id);
    setEditedContact(editedContact);
    openModal();
  };

  const handleSaveEdit = updatedContact => {
    updateContact({
      id: updatedContact.id,
      updatedContact: {
        name: updatedContact.name,
        number: updatedContact.number,
      },
    })
      .unwrap()
      .then(() => {
        closeModal();
      })
      .catch(error => {
        console.log('Error updating contact:', error);
      });
  };

  return (
    <>
      {error && <h2>Error: {error.message}</h2>}
      {isLoading || isUpdatingContact ? (
        <Loader />
      ) : (
        <List>
          {contacts &&
            filteredContacts.map(({ name, number, id }) => {
              return (
                <Item key={id}>
                  <Name>{name}:</Name>
                  <div>
                    <Number>{number}</Number>
                    <Edit
                      type="button"
                      onClick={() => handleEdit(id)}
                      aria-label="Edit contact"
                      disabled={isLoading}
                    >
                      <FiEdit size={26} />
                    </Edit>
                    <Delete
                      type="button"
                      onClick={() => handleDelete(id)}
                      aria-label="Delete contact"
                      disabled={isDeletingContact || isLoading}
                    >
                      {isDeletingContact ? (
                        <RotatingLines width="26" strokeColor="grey" />
                      ) : (
                        <FiUserMinus size={26} />
                      )}
                    </Delete>
                  </div>
                </Item>
              );
            })}
        </List>
      )}

      {editedContact && (
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          editedContact={editedContact}
          handleSaveEdit={handleSaveEdit}
        />
      )}
    </>
  );
};
