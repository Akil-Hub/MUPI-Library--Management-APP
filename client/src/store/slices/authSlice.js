import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { data } from "react-router-dom";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoading: false,
    error: null,
    message: null,
    user: null,
    isAuthenticated: false,
  },
  reducers: {
    registerRequest: (state) => {
      state.isLoading = true;
      state.error = null;
      state.message = null;
    },
    registerSuccess: (state, action) => {
      state.isLoading = false;
      state.message = action.payload.message;
    },
    registerFailed: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    otpVerificationRequest: (state) => {
      state.isLoading = true;
      state.error = null;
      state.message = null;
    },
    otpVerificationSuccess: (state, action) => {
      state.isLoading = false;
      state.message = action.payload.message;
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    otpVerificationFailed: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    loginRequest: (state) => {
      state.isLoading = true;
      state.error = null;
      state.message = null;
    },
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.message = action.payload.message;
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    loginFailed: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    logoutRequest: (state) => {
      state.isLoading = true;
      state.message = null;
      state.error = null;
    },
    logoutSuccess: (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
      state.isAuthenticated = false;
      state.user = null;
    },
    logoutFailed: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.message = null;
    },

    getUserRequest: (state) => {
      state.isLoading = true;
      state.error = null;
      state.message = null;
    },
    getUserSuccess: (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    getUserFailed: (state) => {
      state.isLoading = false;
      state.user = null;
      state.isAuthenticated = false;
    },
    forgotPasswordRequest: (state) => {
      state.isLoading = true;
      state.error = null;
      state.message = null;
    },
    forgotPasswordSuccess: (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
    },
    forgotPasswordFailed: (state,action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    resetPasswordRequest: (state) => {
      state.isLoading = true;
      state.error = null;
      state.message = null;
    },
    resetPasswordSuccess: (state, action) => {
      state.isLoading = false;
      state.message = action.payload.message;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    resetPasswordFailed: (state,action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    updatePasswordRequest: (state) => {
      state.isLoading = true;
      state.error = null;
      state.message = null;
    },
    updatePasswordSuccess: (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
     
    },
    updatePasswordFailed: (state,action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
 


    resetAuthSlice: (state) => {
      state.error = null;
      state.isLoading = false;
      state.message = null;
      state.user = state.user;
      state.isAuthenticated = state.isAuthenticated;
    },
  },
});

export const resetAuthSlice = () => (dispatch) => {
  dispatch(authSlice.actions.resetAuthSlice());
};

export const register = (data) => async (dispatch) => {
  dispatch(authSlice.actions.registerRequest());
  await axios
    .post("http://localhost:4000/api/v1/auth/register", data, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      dispatch(authSlice.actions.registerSuccess(res.data));
    })
    .catch((error) => {
      dispatch(authSlice.actions.registerFailed(error.response.data.message));
    });
};

export const otpVerification = (email, otp) => async (dispatch) => {
  dispatch(authSlice.actions.otpVerificationRequest());
  await axios
    .post(
      "http://localhost:4000/api/v1/auth/verify-otp",
      { email, otp },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => {
      dispatch(authSlice.actions.otpVerificationSuccess(res.data));
    })
    .catch((error) => {
      dispatch(
        authSlice.actions.otpVerificationFailed(error.response.data.message)
      );
    });
};

export const login = (data) => async (dispatch) => {
  dispatch(authSlice.actions.loginRequest());
  await axios
    .post("http://localhost:4000/api/v1/auth/login", data, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      dispatch(authSlice.actions.loginSuccess(res.data));
    })
    .catch((error) => {
      dispatch(authSlice.actions.loginFailed(error.response.data.message));
    });
};

export const logout = () => async (dispatch) => {
  dispatch(authSlice.actions.logoutRequest());
  await axios
    .get("http://localhost:4000/api/v1/auth/logout", {
      withCredentials: true,
    })
    .then((res) => {
      console.log('Backend response:', res.data);
      dispatch(authSlice.actions.logoutSuccess(res.data.message));
      dispatch(authSlice.actions.resetAuthSlice());
    })
    .catch((error) => {
      dispatch(authSlice.actions.logoutFailed(error.response?.data?.message));
    });
};

export const getUser = () => async (dispatch) => {
  dispatch(authSlice.actions.getUserRequest());
  await axios
    .get("http://localhost:4000/api/v1/auth/me", {
      withCredentials: true,
    })
    .then((res) => {
      dispatch(authSlice.actions.getUserSuccess(res.data));
    })
    .catch((error) => {
      dispatch(authSlice.actions.getUserFailed(error.response.data.message));
    });
};

export const forgotPassword = (email) => async (dispatch) => {
  dispatch(authSlice.actions.forgotPasswordRequest());
  await axios
    .post("http://localhost:4000/api/v1/auth/password/forgot", { email }, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      dispatch(authSlice.actions.forgotPasswordSuccess(res.data.message));
    })
    .catch((error) => {
      const errorMessage = error.response?.data?.message || error.message || "Failed to send reset email";
      dispatch(authSlice.actions.forgotPasswordFailed(errorMessage));
    });
};

export const resetPassword = (data ,token ) => async (dispatch) => {
  dispatch(authSlice.actions.resetPasswordRequest());
  await axios
    .put(`http://localhost:4000/api/v1/auth/password/reset/${token}`,(data), {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      dispatch(authSlice.actions.resetPasswordSuccess(res.data.message));
    })
    .catch((error) => {
      dispatch(authSlice.actions.resetPasswordFailed(error.response.data.message));
    });
};

export const updatePassword = (data  ) => async (dispatch) => {
  dispatch(authSlice.actions.updatePasswordRequest());
  await axios
    .put(`http://localhost:4000/api/v1/auth/password/update`,(data), {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      dispatch(authSlice.actions.updatePasswordSuccess(res.data.message));
    })
    .catch((error) => {
      dispatch(authSlice.actions.updatePasswordFailed(error.response.data.message));
    });
};

export default authSlice.reducer;