import { ADD_USER, DELETE_USER, UPDATE_USER } from "../constants";

export const addUser = (contact) => {
    return {
        type: ADD_USER,
        payload: contact
    };
};

export const deleteUser = (index) => {
    return {
        type: DELETE_USER,
        payload: index
    }
}

export const updateUser = (payload) => {
    return {type: UPDATE_USER,
            payload: payload
    }
}
