import { backendServer } from "../store";
import axios from "axios";

export const signup = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: "signupRequest",
    });

    const { data } = await axios.post(`${backendServer}/user/new`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });
    dispatch({
      type: "signupSuccess",
      payload: {
        message: data.message,
      },
    });
  } catch (error) {
    dispatch({
      type: "signupFail",
      payload: error.response.data.message,
    });
  }
};

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: "loginRequest",
    });

    //Using axios
    const { data } = await axios.post(
      `${backendServer}/user/login`,
      {
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    dispatch({
      type: "loginSuccess",
      payload: {
        message: data.message,
      },
    });
  } catch (error) {
    dispatch({
      type: "loginFail",
      payload: error.response.data.message,
    });
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "loadUserRequest",
    });
    const { data } = await axios.get(
      `${backendServer}/user/me`,

      {
        withCredentials: true,
      }
    );
    dispatch({
      type: "loadUserSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "loadUserFail",
      payload: error.response.data.message,
    });
  }
};

export const logout = () => async (dispatch) => {
  try {
    dispatch({
      type: "logoutRequest",
    });
    const { data } = await axios.get(
      `${backendServer}/user/logout`,

      {
        withCredentials: true,
      }
    );
    dispatch({
      type: "logoutSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "logoutFail",
      payload: error.response.data.message,
    });
  }
};
