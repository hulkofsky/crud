export const select = (contact) => {
    return {
        type: "CONTACT_SELECTED",
        payload: contact
    };
};
