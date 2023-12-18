import { createSlice } from "@reduxjs/toolkit";
import {
  fetchJobBasedOnId,
  fetchJobIds,
} from "../actions/jobAction";

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: "",
  jobsId: [],
  jobsData: [],
};

export const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobIds.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = "";
      })
      .addCase(fetchJobIds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.jobsId = action.payload;
        state.isError = "";
      })
      .addCase(fetchJobIds.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = "";
      })
      .addCase(fetchJobBasedOnId.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = "";
      })
      .addCase(fetchJobBasedOnId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.jobsData = [...state.jobsData, action.payload];
        state.isError = "";
      })
      .addCase(fetchJobBasedOnId.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = "";
      });
  },
});

const {} = jobSlice.actions;

export default jobSlice.reducer;
