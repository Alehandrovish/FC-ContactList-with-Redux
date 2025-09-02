import ContactList from "./components/ContactList/ContactList";
import ContactForm from "./components/ContactForm/ContactForm";
import "./reset.css";
import "./App.css";

function App() {
  return (
    <article className="content-wrapper">
      <h1>Contact list</h1>
      <section className="content-block">
        <ContactList />
        <ContactForm />
      </section>
    </article>
  );
}

export default App;
