import { useState, useEffect } from "react";
import "./ContactForm.css";

function ContactForm({ personData, saveNewArrContacts, onDelete }) {
  const [formData, setFormData] = useState(personData);

  useEffect(() => {
    setFormData(personData);
  }, [personData]);

  function onInputChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  }

  function clearInput(event) {
    const inputSibling = event.target.parentNode.firstChild;
    setFormData((prev) => {
      return { ...prev, [inputSibling.name]: "" };
    });
  }

  function clearAllInputs() {
    setFormData({
      id: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    });
  }

  function onFormSubmit(event) {
    event.preventDefault();
    saveNewArrContacts(formData);
    if (!formData.id) {
      clearAllInputs();
    }
  }

  const { id, firstName, lastName, email, phone } = formData;

  function onDeleteContact() {
    onDelete(id);
    clearAllInputs();
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
