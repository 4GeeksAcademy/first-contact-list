import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate, useParams } from "react-router-dom";

const AddContact = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const { id } = useParams(); 

    // Cargar los datos del contacto si lo estoy editando
    useEffect(() => {
        if (id) {
            const contactToEdit = store.contacts.find(contact => contact.id === parseInt(id));
            if (contactToEdit) {
                actions.updateFormData("name", contactToEdit.name);
                actions.updateFormData("email", contactToEdit.email);
                actions.updateFormData("phone", contactToEdit.phone);
                actions.updateFormData("address", contactToEdit.address);
            }
        } else {
            actions.resetFormData(); // Resetea formulario si es nuevo
        }
    }, [id, store.contacts]);

    const handleChange = (e) => {
        actions.updateFormData(e.target.name, e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const contactData = { ...store.formData };
        if (id) {
            actions.updateContact(id, contactData); 
        } else {
            actions.addContact(contactData); 
        }
        navigate("/"); 
    };

    return (
        <div className="container mt-5">
            <h1>{id ? "Edit Contact" : "Add a new contact"}</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={store.formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={store.formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Phone</label>
                    <input
                        type="text"
                        className="form-control"
                        name="phone"
                        value={store.formData.phone}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Address</label>
                    <input
                        type="text"
                        className="form-control"
                        name="address"
                        value={store.formData.address}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Save</button>
                <button
                    type="button"
                    className="btn btn-secondary ms-2"
                    onClick={() => navigate("/")}
                >
                    Cancel
                </button>
            </form>
        </div>
    );
};

export default AddContact;
