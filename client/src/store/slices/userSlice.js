import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { AwardIcon } from "lucide-react";
import { PiTrendUpBold } from "react-icons/pi";
import { data } from "react-router-dom";
import { toast } from "react-toastify";


const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    isLoading: false,
  },
  reducers: {
    fetchAllUserRequest: (state) => {
      state.isLoading = true;
    },
    fetchAllUserSuccess: (state, action) => {
      state.isLoading = true;
      state.users = action.payload;
    },
    fetchAllUserFailed: (state) => {
      state.isLoading = false;
    },

    addNewAdminRequest: (state) => {
      state.isLoading = true;
    },
    addNewAdminSuccess: (state) => {
      state.isLoading = false;
    },
    addNewAdminFailed: (state) => {
      state.isLoading = false;
    },
  },
});

export const fetchAllUsers = () => async (dispatch) => {
  dispatch(userSlice.actions.fetchAllUserRequest());
  await axios
    .get("http://localhost:4000/api/v1/user/all", { withCredentials: true })
    .then((res) => {
      dispatch(userSlice.actions.fetchAllUserSuccess(res.data.users));
    })
    .catch((err) => {
      dispatch(userSlice.actions.fetchAllUserFailed(err.response.data.message));
    });
};

export const addNewAdmin = (data) => async (dispatch) => {
  dispatch(userSlice.actions.addNewAdminRequest());
  await axios
    .get("http://localhost:4000/api/v1/user/add/new-admin", data, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      dispatch(userSlice.actions.addNewAdminSuccess());
      toast.success(res.data.message);
    })
    .catch((err) => {
      dispatch(userSlice.actions.addNewAdminFailed());
      toast.error(err.response.data.message);
    });
};




export default userSlice.reducer;