const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            contacts: [],
            apiBaseUrl: "https://playground.4geeks.com/contact/agendas/", 
            formData: {
                name: "",
                phone: "",
                email: "",
                address: "",
            },
        },
        // Create Update und Edit
        actions: {
            // Get all contacts
            getAllContacts: async () => {
                try {
                    const response = await fetch(`${getStore().apiBaseUrl}ricardou/contacts`);
                    if (response.ok) {
                        const data = await response.json();
                        setStore({ contacts: data.contacts }); 
                        console.log(data);
                        
                    } else {
                        console.error("Error al obtener contactos");
                    }
                } catch (error) {
                    console.error("Error de red: ", error);
                }
            },

            addContact: async (contact) => {
                try {
                    const response = await fetch( `${getStore().apiBaseUrl}ricardou/contacts`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(contact),
                    });
                    if (response.ok) {
                        print(response)
                    } else {
                        console.error("Error al agregar contacto");
                    }
                } catch (error) {
                    console.error("Error de red: ", error);
                }
            },

            updateContact: async (id, updatedContact) => {
                try {
                    const response = await fetch(`${getStore().apiBaseUrl}ricardou/contacts/${id}`, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(updatedContact),
                    });
                    if (response.ok) {
                        getActions().getAllContacts();
                    } else {
                        console.error("Error al actualizar contacto");
                    }
                } catch (error) {
                    console.error("Error de red: ", error);
                }
            },

            deleteContact: async (id) => {
                try {
                    const response = await fetch(`${getStore().apiBaseUrl}ricardou/contacts/${id}`, {
                        method: "DELETE",
                    });
                    if (response.ok) {
                        getActions().getAllContacts();
                    } else {
                        console.error("Error al eliminar contacto");
                    }
                } catch (error) {
                    console.error("Error de red: ", error);
                }
            },

            updateFormData: (key, value) => {
                const store = getStore();
                setStore({
                    formData: {
                        ...store.formData,
                        [key]: value,
                    },
                });
            },

            // Resetear los datos del formulario
            resetFormData: () => {
                setStore({
                    formData: {
                        name: "",  
                        phone: "",
                        email: "",
                        address: "",
                    },
                });
            },
        },
    };
};

export default getState;
