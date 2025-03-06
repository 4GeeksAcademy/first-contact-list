import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import kat from "../../img/kat.jpg"
const ContactCard = ({ contact }) => {
    const { actions } = useContext(Context);

    return (
        <div className="card d-flex flex-row align-items-center">
            <img
                src={kat}
                className="rounded-circle m-3"
                alt="contact"
                style={{ width: "80px", height: "80px" }}
            />
            <div className="card-body">
                <h5 className="card-title">{contact.name}</h5>
                <p className="card-text">
                    <i className="fas fa-map-marker-alt"></i> {contact.address}<br />
                    <i className="fas fa-phone"></i> {contact.phone}<br />
                    <i className="fas fa-envelope"></i> {contact.email}
                </p>
            </div>
            <div className="ms-auto p-3">
                <Link to={`/edit/${contact.id}`} className="btn btn-primary me-2">
                    <i className="fas fa-pencil-alt"></i>
                </Link>
                <button
                    className="btn btn-danger"
                    onClick={() => actions.deleteContact(contact.id)}
                >
                    <i className="fas fa-trash-alt"></i>
                </button>
            </div>
        </div>
    );
};

export default ContactCard;