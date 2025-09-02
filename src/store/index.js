import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import { composeWithDevTools } from "@redux-devtools/extension";
import contactReduser from "./redusers/contactsReduser";

const middleware = applyMiddleware(logger);
export default createStore(contactReduser, composeWithDevTools(middleware));
