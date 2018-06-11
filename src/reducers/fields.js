import RECEIVE_FIELDS from '../constants';

const initialState = [];

export default function fields(state = initialState, action) {
    switch (action.type) {
    case RECEIVE_FIELDS:
        return [
            ...state,
            action.payload
        ];
    default: return state;
    }
}