import {
  ORDER_CREATE_FAILURE,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_REQUEST,
  ORDER_DETAILS_FAILURE,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_REQUEST,
  ORDER_PAY_FAILURE,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_REQUEST,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_MY_FAILURE,
  ORDER_LIST_FAILURE,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_REQUEST,
  ORDER_DELIVER_FAILURE,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_REQUEST,
} from "../constants/orderConstants";
import axios from "axios";
import { logout } from "./userActions";

const url = process.env.REACT_APP_BASE_URL;

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_CREATE_REQUEST });

    //Equivalent to getState.userLogin.userInfo
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(`${url}/api/orders`, order, config);
    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({
      type: ORDER_CREATE_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST });

    //Equivalent to getState.userLogin.userInfo
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`${url}/api/orders/${id}`, config);
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({
      type: ORDER_DETAILS_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

export const payOrder =
  (orderId, paymentResult) => async (dispatch, getState) => {
    try {
      dispatch({ type: ORDER_PAY_REQUEST });

      //Equivalent to getState.userLogin.userInfo
      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.put(
        `${url}/api/orders/${orderId}/pay`,
        paymentResult,
        config
      );
      dispatch({ type: ORDER_PAY_SUCCESS, payload: data });
    } catch (error) {
      console.log(error);
      dispatch({
        type: ORDER_PAY_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.response,
      });
    }
  };

export const listMyOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_LIST_MY_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`${url}/api/orders/myorders`, config);

    dispatch({
      type: ORDER_LIST_MY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: ORDER_LIST_MY_FAILURE,
      payload: message,
    });
  }
};

export const listOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`${url}/api/orders`, config);

    dispatch({
      type: ORDER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: ORDER_LIST_FAILURE,
      payload: message,
    });
  }
};

export const deliverOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_DELIVER_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `${url}/api/orders/${order._id}/deliver`,
      {},
      config
    );

    dispatch({
      type: ORDER_DELIVER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: ORDER_DELIVER_FAILURE,
      payload: message,
    });
  }
};
