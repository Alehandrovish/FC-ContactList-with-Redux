import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { nanoid } from "nanoid";
import api from "../../api/contact-service";
import {
  deleteContact,
  addContact,
  editContact,
} from "../../store/actions/contactsActions";
import "./ContactForm.css";

function ContactForm() {
  const formData = useSelector((state) => state.personData);
  const [localFormData, setLocalFormData] = useState(formData);

  useEffect(() => {
    setLocalFormData(formData);
  }, [formData]);

  const dispatch = useDispatch();

  const { id, firstName, lastName, email, phone } = localFormData;

  function onInputChange(event) {
    const { name, value } = event.target;
    setLocalFormData({ ...localFormData, [name]: value });
  }

  function clearInput(event) {
    const inputSibling = event.target.parentNode.firstChild;
    setLocalFormData({ ...localFormData, [inputSibling.name]: "" });
  }

  function onFormSubmit(event) {
    event.preventDefault();
    if (id) {
      api.put(`/${id}`, localFormData).then(({ data }) => {
        dispatch(editContact(data));
      });
    } else {
      const newContact = { ...localFormData, id: nanoid() };
      api.post("/", newContact).then(({ data }) => {
        dispatch(addContact(data));
      });
    }
  }

  function onDeleteContact() {
    api.delete(`/${id}`).then(() => {
      dispatch(deleteContact(id));
    });
  }

  return (
    <form onSubmit={onFormSubmit}>
      <div className="input-block">
        <div className="form-item">
          <input
            name="firstName"
            type="text"
            placeholder="First name"
            value={firstName}
            onChange={onInputChange}
          />
          <span className="btn-clear" onClick={clearInput}>
            X
          </span>
        </div>
        <div className="form-item">
          <input
            name="lastName"
            type="text"
            placeholder="Last name"
            value={lastName}
            onChange={onInputChange}
          />
          <span className="btn-clear" onClick={clearInput}>
            X
          </span>
        </div>
        <div className="form-item">
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={onInputChange}
          />
          <span className="btn-clear" onClick={clearInput}>
            X
          </span>
        </div>
        <div className="form-item">
          <input
            name="phone"
            type="tel"
            placeholder="Phone"
            value={phone}
            onChange={onInputChange}
          />
          <span className="btn-clear" onClick={clearInput}>
            X
          </span>
        </div>
      </div>
      <div className="form-buttons">
        <button type="submit">Save</button>
        {id ? (
          <button type="button" onClick={onDeleteContact}>
            Delete
          </button>
        ) : (
          ""
        )}
      </div>
    </form>
  );
}

export default ContactForm;
