import { initialContacts } from "../../model/initialContacts";
import { initialPersonData } from "../../model/initialPersonData";

const initialState = {
  contacts: initialContacts,
  personData: initialPersonData,
};

const emptyPerson = () => ({ ...initialPersonData });

export default function reduser(state = initialState, { type, payload }) {
  switch (type) {
    case "getContacts":
      return {
        ...state,
        contacts: payload,
      };
    case "deleteContact":
      return {
        ...state,
        contacts: state.contacts.filter((contact) =>
          contact.id !== payload ? contact : ""
        ),
        personData: emptyPerson(),
      };
    case "addContact":
      return {
        ...state,
        contacts: [...state.contacts, payload],
        personData: emptyPerson(),
      };
    case "editContact": {
      return {
        ...state,
        contacts: state.contacts.map((contact) =>
          contact.id !== payload.id ? contact : payload
        ),
      };
    }
    case "setAddMode":
      return {
        ...state,
        personData: emptyPerson(),
      };
    case "setEditMode":
      return {
        ...state,
        personData: payload,
      };
    default:
      return state;
  }
}
