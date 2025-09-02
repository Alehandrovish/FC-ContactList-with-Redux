import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import ContactItem from "../ContactItem/ContactItem";
import { getContacts, setAddMode } from "../../store/actions/contactsActions";
import api from "../../api/contact-service";
import "./ContactList.css";

function ContactList() {
  const contacts = useSelector((state) => state.contacts);
  const dispatch = useDispatch();

  useEffect(() => {
    api.get("/").then(({ data }) => {
      dispatch(getContacts(data));
    });
  }, []);

  function onAddMode() {
    dispatch(setAddMode());
  }
  return (
    <section className="contacts-block">
      <section className="contacts-list">
        {contacts.map((contact) => {
          return <ContactItem key={contact.id} contact={contact} />;
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
