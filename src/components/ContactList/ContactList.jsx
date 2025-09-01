import PropTypes from "prop-types";
import ContactItem from "../ContactItem/ContactItem";
import "./ContactList.css";

function ContactList({ contacts, onDelete, onEditMode, idOfItem, onAddMode }) {
  return (
    <section className="contacts-block">
      <section className="contacts-list">
        {contacts.map((contact) => {
          return (
            <ContactItem
              key={contact.id}
              contact={contact}
              onDelete={onDelete}
              onEnterEditMode={onEditMode}
              idOfItem={idOfItem}
            />
          );
        })}
      </section>
      <button onClick={onAddMode}>New</button>
    </section>
  );
}

ContactList.propTypes = {
  contacts: PropTypes.array.isRequired,
  onDelete: PropTypes.func,
  onEditMode: PropTypes.func,
  idOfItem: PropTypes.any,
  onAddMode: PropTypes.func,
};
ContactList.defaultProps = {
  contacts: [],
};

export default ContactList;
