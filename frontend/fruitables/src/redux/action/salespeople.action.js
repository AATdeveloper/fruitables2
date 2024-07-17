import axios from "axios";
import { ADD_SALESPEOPLE, DELETE_SALESPEOPLE, EDIT_SALESPEOPLE, GET_SALESPEOPLE } from "../ActionType";


export const getSalespeople = () => async (dispatch) => {
    try {
        const response = await axios.get(`http://localhost:8000/api/v1//salespeople/get-salespeople`);
        dispatch({ type: GET_SALESPEOPLE, payload: response.data.data });
    } catch (error) {
        console.error("Error fetching salespeople:", error);
    }
};

export const addSalespeople = (data) => async (dispatch) => {
    try {
        const response = await axios.post(`http://localhost:8000/api/v1//salespeople/add-salespeople`, data);
        dispatch({ type: ADD_SALESPEOPLE, payload: response.data.data });
    } catch (error) {
        console.error("Error adding salespeople:", error);
    }
};

export const deleteSalespeople = (snum) => async (dispatch) => {
    try {
        await axios.delete(`http://localhost:8000/api/v1//salespeople/delete-salespeople/${snum}`);
        dispatch({ type: DELETE_SALESPEOPLE, payload: snum });
    } catch (error) {
        console.error("Error deleting salespeople:", error);
    }
};

export const editSalespeople = (data) => async (dispatch) => {
    try {
        const response = await axios.put(`http://localhost:8000/api/v1//salespeople/update-salespeople/${data.snum}`, data);
        dispatch({ type: EDIT_SALESPEOPLE, payload: response.data.data });
    } catch (error) {
        console.error("Error editing salespeople:", error);
    }
};