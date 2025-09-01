import { useState, useEffect } from "react";
import { nanoid } from "nanoid/non-secure";
import ContactList from "./components/ContactList/ContactList";
import ContactForm from "./components/ContactForm/ContactForm";
import "./reset.css";
import "./App.css";
import api from "./api/contact-service";

function App() {
  const CLEAR_PERSON_DATA = {
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  };

  const [arrContacts, setArrContacts] = useState([]);
  const [personData, setPersonData] = useState(CLEAR_PERSON_DATA);

  useEffect(() => {
    api
      .get("/")
      .then(({ data }) => {
        if (!data) {
          return setArrContacts([]);
        }
        return setArrContacts(data);
      })
      .catch((error) => {
        console.log(`getting data error: ${error}`);
      });
  }, []);

  function deleteContact(id) {
    api
      .delete(`/${id}`)
      .then(() => {
        const newContacts = arrContacts.filter((contact) => contact.id !== id);
        setArrContacts(newContacts);
        setPersonData(CLEAR_PERSON_DATA);
      })
      .catch((error) => {
        console.log(`delete error: ${error}`);
      });
  }

  function addNewContact(contact) {
    contact.id = nanoid();
    api
      .post("/", contact)
      .then(({ data }) => {
        setArrContacts([...arrContacts, data]);
        setPersonData(CLEAR_PERSON_DATA);
      })
      .catch((error) => {
        console.log(`add error: ${error}`);
      });
  }

  function editExistingContact(contact) {
    api
      .put(`/${contact.id}`, contact)
      .then(({ data }) => {
        const newContact = arrContacts.map((cont) =>
          cont.id !== contact.id ? cont : data
        );
        setArrContacts(newContact);
      })
      .catch((error) => {
        console.log(`edit error: ${error}`);
      });
  }
  function saveNewArrContacts(contact) {
    if (contact.id) {
      editExistingContact(contact);
    } else {
      addNewContact(contact);
    }
  }

  function handleEditMode(contact) {
    setPersonData(contact);
  }

  function handleAddMode() {
    setPersonData(CLEAR_PERSON_DATA);
  }

  return (
    <article className="content-wrapper">
      <h1>Contact list</h1>
      <section className="content-block">
        <ContactList
          contacts={arrContacts}
          onDelete={deleteContact}
          onEditMode={handleEditMode}
          idOfItem={personData.id}
          onAddMode={handleAddMode}
        />
        <ContactForm
          personData={personData}
          saveNewArrContacts={saveNewArrContacts}
          onDelete={deleteContact}
        />
      </section>
    </article>
  );
}

export default App;
