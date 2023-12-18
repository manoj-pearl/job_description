import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../services/api";

export const fetchJobIds = createAsyncThunk(
  "job/fetchJobIds",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await instance.get("jobstories.json", payload, {
        withCredentials: true,
      });
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      rejectWithValue(error);
    }
  }
);

export const fetchJobBasedOnId = createAsyncThunk(
  "job/fetchJobBasedOnId",
  async (payload, { rejectWithValue }) => {
    console.log("payload::: ", payload);
    try {
      const { data } = await instance.get(`item/${payload}.json`, payload, {
        withCredentials: true,
      });
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      rejectWithValue(error);
    }
  }
);
