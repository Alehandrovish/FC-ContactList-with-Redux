export function getContacts(contacts) {
  return {
    type: "getContacts",
    payload: contacts,
  };
}
export function deleteContact(id) {
  return {
    type: "deleteContact",
    payload: id,
  };
}
export function addContact(contact) {
  return {
    type: "addContact",
    payload: contact,
  };
}
export function editContact(contact) {
  return {
    type: "editContact",
    payload: contact,
  };
}
export function setAddMode() {
  return {
    type: "setAddMode",
    payload: null,
  };
}
export function setEditMode(contact) {
  return {
    type: "setEditMode",
    payload: contact,
  };
}
