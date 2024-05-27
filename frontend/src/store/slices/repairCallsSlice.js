import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const name = 'repairCalls';

export const initialState = {
    repairCalls: [],
    repairCall: null,
    fetchLoading: false,
    fetchError: null,
    updateLoading: false,
    updateError: null,
    deleteLoading: false,
    deleteError: null,
};

const repairCallsSlice = createSlice({
    name,
    initialState,
    reducers: {
        fetchRepairCallsRequest(state) {
            state.fetchLoading = true;
            state.fetchError = null;
        },
        fetchRepairCallsSuccess(state, { payload: repairCalls }) {
            state.fetchLoading = false;
            state.repairCalls = repairCalls;
        },
        fetchRepairCallsFailure(state, { payload: error }) {
            state.fetchLoading = false;
            state.fetchError = error;
        },
        fetchOneRepairCallRequest(state) {
            state.fetchLoading = true;
            state.fetchError = null;
        },
        fetchOneRepairCallSuccess(state, { payload: repairCall }) {
            state.fetchLoading = false;
            state.repairCall = repairCall;
        },
        fetchOneRepairCallFailure(state, { payload: error }) {
            state.fetchLoading = false;
            state.fetchError = error;
        },
        updateRepairCallRequest(state) {
            state.updateLoading = true;
            state.updateError = null;
        },
        updateRepairCallSuccess(state, { payload: updatedCall }) {
            state.updateLoading = false;
            state.repairCalls = state.repairCalls.map(call =>
                call.id === updatedCall.id ? updatedCall : call
            );
        },
        updateRepairCallFailure(state, { payload: error }) {
            state.updateLoading = false;
            state.updateError = error;
        },
        deleteRepairCallRequest(state) {
            state.deleteLoading = true;
            state.deleteError = null;
        },
        deleteRepairCallSuccess(state, { payload: deletedCall }) {
            state.deleteLoading = false;
            state.repairCalls = state.repairCalls.filter(call => call.id !== deletedCall.id);
        },
        deleteRepairCallFailure(state, { payload: error }) {
            state.deleteLoading = false;
            state.deleteError = error;
        }
    }
});

export const {
    fetchRepairCallsRequest,
    fetchRepairCallsSuccess,
    fetchRepairCallsFailure,
    fetchOneRepairCallRequest,
    fetchOneRepairCallSuccess,
    fetchOneRepairCallFailure,
    updateRepairCallRequest,
    updateRepairCallSuccess,
    updateRepairCallFailure,
    deleteRepairCallRequest,
    deleteRepairCallSuccess,
    deleteRepairCallFailure,
} = repairCallsSlice.actions;

export const fetchRepairCalls = (query = '') => async dispatch => {
    dispatch(fetchRepairCallsRequest());
    try {
        const response = await axios.get(`https://05e558db2c5f94f2.mokky.dev/repair-calls${query}`);
        dispatch(fetchRepairCallsSuccess(response.data));
    } catch (error) {
        dispatch(fetchRepairCallsFailure(error.message));
    }
};

export const fetchOneRepairCall = (id) => async dispatch => {
    dispatch(fetchOneRepairCallRequest());
    try {
        const response = await axios.get(`https://05e558db2c5f94f2.mokky.dev/repair-calls/${id}`);
        dispatch(fetchOneRepairCallSuccess(response.data));
    } catch (error) {
        dispatch(fetchOneRepairCallFailure(error.message));
    }
};

export const updateRepairCall = (call) => async dispatch => {
    dispatch(updateRepairCallRequest());
    try {
        const response = await axios.patch(`https://05e558db2c5f94f2.mokky.dev/repair-calls/${call.id}`, call);
        dispatch(updateRepairCallSuccess(response.data));
    } catch (error) {
        dispatch(updateRepairCallFailure(error.message));
    }
};

export const deleteRepairCall = (id) => async dispatch => {
    dispatch(deleteRepairCallRequest());
    try {
        await axios.delete(`https://05e558db2c5f94f2.mokky.dev/repair-calls/${id}`);
        dispatch(deleteRepairCallSuccess({ id: id }));
    } catch (error) {
        dispatch(deleteRepairCallFailure(error.message));
    }
};

export default repairCallsSlice.reducer;
