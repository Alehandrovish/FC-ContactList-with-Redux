import { initialContacts } from "../../model/initialContacts";
import { initialPersonData } from "../../model/initialPersonData";
import ACTION_TYPES from "../actions/actionTypes";

const initialState = {
  contacts: initialContacts,
  personData: initialPersonData,
};

const emptyPerson = () => ({ ...initialPersonData });

export default function reduser(state = initialState, { type, payload }) {
  switch (type) {
    case ACTION_TYPES.GET_CONTACTS:
      return {
        ...state,
        contacts: payload,
      };
    case ACTION_TYPES.DELETE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter((contact) =>
          contact.id !== payload ? contact : ""
        ),
        personData: emptyPerson(),
      };
    case ACTION_TYPES.ADD_CONTACT:
      return {
        ...state,
        contacts: [...state.contacts, payload],
        personData: emptyPerson(),
      };
    case ACTION_TYPES.EDIT_CONTACT: {
      return {
        ...state,
        contacts: state.contacts.map((contact) =>
          contact.id !== payload.id ? contact : payload
        ),
      };
    }
    case ACTION_TYPES.SET_ADD_MODE:
      return {
        ...state,
        personData: emptyPerson(),
      };
    case ACTION_TYPES.SET_EDIT_MODE:
      return {
        ...state,
        personData: payload,
      };
    default:
      return state;
  }
}
