import "./ContactItem.css";

function ContactItem({ contact, onDelete, onEnterEditMode, idOfItem }) {
  function onContactDelete(event) {
    event.stopPropagation();
    onDelete(contact.id);
  }

  function onEdit() {
    onEnterEditMode(contact);
  }

  const { id, firstName, lastName } = contact;
  return (
    <div
      className={`content-item ${id === idOfItem ? " focus" : ""}`}
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
