import React from 'react';
import PropTypes from 'prop-types';
import styles from './ContactItem.module.css';
import Button from '../Button';

const ContactItem = ({ contact, onDeleteContact }) => {
  return (
    <div className={styles.item}>
      <li>
        <strong>{contact.name}</strong>: <br /> {contact.number}
      </li>
      <Button action={() => onDeleteContact(contact.id)}>Delete</Button>
    </div>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }).isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};

export default ContactItem;
