

import { ADD_SALESPEOPLE, DELETE_SALESPEOPLE, EDIT_SALESPEOPLE, GET_SALESPEOPLE } from "../ActionType";

const initialState = {
    salespeople: [],
    error: null,
}

export const SalespeopleReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_SALESPEOPLE:
            return {
                ...state,
                salespeople: action.payload,
                error: null,
            };

        case ADD_SALESPEOPLE:
            return {
                ...state,
                salespeople: [...state.salespeople, action.payload],
                error: null,
            };

        case DELETE_SALESPEOPLE:
            return {
                ...state,
                salespeople: state.salespeople.filter((v) => v.snum !== action.payload),
                error: null,
            };

        case EDIT_SALESPEOPLE:
            return {
                ...state,
                salespeople: state.salespeople.map((v) => v.snum === action.payload.snum ? action.payload : v),
                error: null,
            };

        default:
            return state;
    }
};