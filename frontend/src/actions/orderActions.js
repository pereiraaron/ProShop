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
import api from "../api";
import getErrorMessage from "../utils/getErrorMessage";
import { logout } from "./userActions";

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_CREATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const { data } = await api.post(`/api/orders`, order, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAILURE,
      payload: getErrorMessage(error),
    });
  }
};

export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const { data } = await api.get(`/api/orders/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAILURE,
      payload: getErrorMessage(error),
    });
  }
};

export const payOrder =
  (orderId, paymentResult) => async (dispatch, getState) => {
    try {
      dispatch({ type: ORDER_PAY_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const { data } = await api.put(
        `/api/orders/${orderId}/pay`,
        paymentResult,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      dispatch({ type: ORDER_PAY_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ORDER_PAY_FAILURE,
        payload: getErrorMessage(error),
      });
    }
  };

export const listMyOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_LIST_MY_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const { data } = await api.get(`/api/orders/myorders`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });

    dispatch({ type: ORDER_LIST_MY_SUCCESS, payload: data });
  } catch (error) {
    const message = getErrorMessage(error);
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({ type: ORDER_LIST_MY_FAILURE, payload: message });
  }
};

export const listOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const { data } = await api.get(`/api/orders`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });

    dispatch({ type: ORDER_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message = getErrorMessage(error);
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({ type: ORDER_LIST_FAILURE, payload: message });
  }
};

export const deliverOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DELIVER_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const { data } = await api.put(
      `/api/orders/${order._id}/deliver`,
      {},
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );

    dispatch({ type: ORDER_DELIVER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ORDER_DELIVER_FAILURE,
      payload: getErrorMessage(error),
    });
  }
};
