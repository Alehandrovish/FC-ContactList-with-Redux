import "./ContactItem.css";
import api from "../../api/contact-service";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteContact,
  setEditMode,
} from "../../store/actions/contactsActions";

function ContactItem({ contact }) {
  const dispatch = useDispatch();
  const idOfPerson = useSelector((state) => state.personData.id);

  const { id, firstName, lastName } = contact;

  function onContactDelete(event) {
    event.stopPropagation();
    api.delete(`/${id}`).then(() => {
      dispatch(deleteContact(id));
    });
  }

  function onEdit() {
    dispatch(setEditMode(contact));
  }

  return (
    <div
      className={`content-item ${id === idOfPerson ? " focus" : ""}`}
      onDoubleClick={onEdit}
    >
      <p>
        {firstName} {lastName}
      </p>
      <span className="btn-delete" onClick={onContactDelete}>
        X
      </span>
    </div>
  );
}

export default ContactItem;
