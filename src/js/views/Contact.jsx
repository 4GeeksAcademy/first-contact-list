import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import ContactCard from "./ContactCard.jsx";
import { Link } from "react-router-dom";

const Contact = () => {
    const { store, actions } = useContext(Context);

    // Solo muestrame los contactos IF y tambien cuando se actualice 
    useEffect(() => {
        if (store.contacts.length > 0) {
            console.log("Current Contacts : ", store.contacts);
        }
    }, [store.contacts]);
    // Then...
    useEffect(() => {
        actions.getAllContacts();
    }, []);

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center">
                <h1>Contacts</h1>
                <Link to="/add" className="btn btn-success">
                    Add new contact
                </Link>
            </div>
            <div className="row">
                {store.contacts && store.contacts.length > 0 ? (
                    store.contacts.map(contact => (
                        <div className="col-md-12 mb-3" key={contact.id}>
                            <ContactCard contact={contact} />
                        </div>
                    ))
                ) : (
                    <p>No contacts available.</p>
                )}
            </div>
        </div>
    );
};

export default Contact;
