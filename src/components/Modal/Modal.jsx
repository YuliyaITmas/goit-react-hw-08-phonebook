import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  Overlay,
  ModalContent,
  Input,
  Button,
  EditWrap,
  ButtonWrapper,
} from 'components/Modal/Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ isOpen, onClose, editedContact, handleSaveEdit }) => {
  const [updatedContact, setUpdatedContact] = useState(editedContact);

  useEffect(() => {
    setUpdatedContact(prevContact => ({
      ...prevContact,
      ...editedContact,
    }));
  }, [editedContact]);

  const handleChange = event => {
    const { name, value } = event.target;

    setUpdatedContact(prevContact => ({
      ...prevContact,
      [name]: value,
    }));
  };

  const handleSave = () => {
    handleSaveEdit(updatedContact);
  };

  const handleKeyDown = useCallback(
    event => {
      if (event.code === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  const handleBackdropClick = event => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      const handleKeyDown = event => {
        if (event.code === 'Escape') {
          onClose();
        }
      };
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown, onClose]);

  return createPortal(
    isOpen ? (
      <Overlay onClick={handleBackdropClick}>
        <ModalContent>
          <EditWrap>
            <Input
              type="text"
              name="name"
              value={updatedContact.name}
              onChange={handleChange}
            />
            <Input
              type="text"
              name="number"
              value={updatedContact.number}
              onChange={handleChange}
            />
            <ButtonWrapper>
              <Button onClick={handleSave}>Save</Button>
              <Button onClick={onClose}>Cancel</Button>
            </ButtonWrapper>
          </EditWrap>
        </ModalContent>
      </Overlay>
    ) : null,
    modalRoot
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  editedContact: PropTypes.object,
  handleSaveEdit: PropTypes.func,
};
