import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const name = 'repairOrders';

export const initialState = {
    repairOrders: [],
    repairOrder: null,
    fetchLoading: false,
    fetchError: null,
    updateLoading: false,
    updateError: null,
    deleteLoading: false,
    deleteError: null,
};

const repairOrdersSlice = createSlice({
    name,
    initialState,
    reducers: {
        fetchRepairOrdersRequest(state) {
            state.fetchLoading = true;
            state.fetchError = null;
        },
        fetchRepairOrdersSuccess(state, { payload: repairOrders }) {
            state.fetchLoading = false;
            state.repairOrders = repairOrders;
        },
        fetchRepairOrdersFailure(state, { payload: error }) {
            state.fetchLoading = false;
            state.fetchError = error;
        },
        fetchOneRepairOrderRequest(state) {
            state.fetchLoading = true;
            state.fetchError = null;
        },
        fetchOneRepairOrderSuccess(state, { payload: repairOrder }) {
            state.fetchLoading = false;
            state.repairOrder = repairOrder;
        },
        fetchOneRepairOrderFailure(state, { payload: error }) {
            state.fetchLoading = false;
            state.fetchError = error;
        },
        updateRepairOrderRequest(state) {
            state.updateLoading = true;
            state.updateError = null;
        },
        updateRepairOrderSuccess(state, { payload: updatedOrder }) {
            state.updateLoading = false;
            state.repairOrders = state.repairOrders.map(order =>
                order.id === updatedOrder.id ? updatedOrder : order
            );
        },
        updateRepairOrderFailure(state, { payload: error }) {
            state.updateLoading = false;
            state.updateError = error;
        },
        deleteRepairOrderRequest(state) {
            state.deleteLoading = true;
            state.deleteError = null;
        },
        deleteRepairOrderSuccess(state, { payload: deletedOrder }) {
            state.deleteLoading = false;
            state.repairOrders = state.repairOrders.filter(order => order.id !== deletedOrder.id);
        },
        deleteRepairOrderFailure(state, { payload: error }) {
            state.deleteLoading = false;
            state.deleteError = error;
        }
    }
});

export const {
    fetchRepairOrdersRequest,
    fetchRepairOrdersSuccess,
    fetchRepairOrdersFailure,
    fetchOneRepairOrderRequest,
    fetchOneRepairOrderSuccess,
    fetchOneRepairOrderFailure,
    updateRepairOrderRequest,
    updateRepairOrderSuccess,
    updateRepairOrderFailure,
    deleteRepairOrderRequest,
    deleteRepairOrderSuccess,
    deleteRepairOrderFailure,
} = repairOrdersSlice.actions;

export const fetchRepairOrders = (query = '') => async dispatch => {
    dispatch(fetchRepairOrdersRequest());
    try {
        const response = await axios.get(`https://05e558db2c5f94f2.mokky.dev/repair-orders${query}`);
        dispatch(fetchRepairOrdersSuccess(response.data));
    } catch (error) {
        dispatch(fetchRepairOrdersFailure(error.message));
    }
};

export const fetchOneRepairOrder = (id) => async dispatch => {
    dispatch(fetchOneRepairOrderRequest());
    try {
        const response = await axios.get(`https://05e558db2c5f94f2.mokky.dev/repair-orders/${id}`);
        dispatch(fetchOneRepairOrderSuccess(response.data));
    } catch (error) {
        dispatch(fetchOneRepairOrderFailure(error.message));
    }
};

export const updateRepairOrder = (order) => async dispatch => {
    dispatch(updateRepairOrderRequest());
    try {
        const response = await axios.patch(`https://05e558db2c5f94f2.mokky.dev/repair-orders/${order.id}`, order);
        dispatch(updateRepairOrderSuccess(response.data));
    } catch (error) {
        dispatch(updateRepairOrderFailure(error.message));
    }
};

export const deleteRepairOrder = (id) => async dispatch => {
    dispatch(deleteRepairOrderRequest());
    try {
        await axios.delete(`https://05e558db2c5f94f2.mokky.dev/repair-orders/${id}`);
        dispatch(deleteRepairOrderSuccess({ id: id }));
    } catch (error) {
        dispatch(deleteRepairOrderFailure(error.message));
    }
};

export default repairOrdersSlice.reducer;
