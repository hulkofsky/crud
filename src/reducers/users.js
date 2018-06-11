import { RECEIVE_USERS, ADD_USER, UPDATE_USER, DELETE_USER } from '../constants';

const initialState = [];

export default function users(state = initialState, action) {
    switch (action.type) {
    case RECEIVE_USERS:
        return action.payload
    case 'ADD_USER':
        return [
            ...state,
            action.payload
        ];
    case 'UPDATE_USER':
        return [
            ...state.slice(0, action.payload.index),
            action.payload.user,
            ...state.slice(action.payload.index+1)
        ]
    case 'DELETE_USER':
        return [...state.filter(user => user.email !== state[action.payload].email)] 
    default: return state;
    }
}