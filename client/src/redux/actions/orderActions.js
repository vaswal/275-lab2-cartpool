import {CHECKOUT, DELIVERY_NOT_RECEIVED, GET_ORDERS_BY_USER_ID, GET_ORDERS_READY_FOR_PICKUP} from "../../redux/constants/actionTypes";
import {HOSTNAME} from "../../constants/appConstants";

import axios from 'axios';

export function pickUpOrder(payload) {
    console.log("pickUpOrder payload");
    console.log(payload);

    return (dispatch) => {
        axios.post(`http://${HOSTNAME}:8080/order/delivery/pickUpOrder/`, null, {params: payload})
            .then((response) => dispatch(pickUpOrderDispatch(response.data)))
            .catch((err) => console.log(err));
    }
}

export const pickUpOrderDispatch = (returnData) => {
    console.log("pickUpOrderDispatch returnData");
    console.log(returnData);

    return {type: CHECKOUT, payload: returnData}
};


export function getOrdersReadyForPickup(payload) {
    console.log("getOrdersReadyForPickup payload");
    console.log(payload);

    return (dispatch) => {
        axios.get(`http://${HOSTNAME}:8080/order/getOrdersForPickup/${payload.poolerId}/${payload.storeId}`)
            .then((response) => dispatch(getOrdersReadyForPickupDispatch(response.data)))
            .catch((err) => console.log(err));
    }
}

export const getOrdersReadyForPickupDispatch = (returnData) => {
    console.log("getOrdersReadyForPickupDispatch returnData");
    console.log(returnData);

    return {type: GET_ORDERS_READY_FOR_PICKUP, payload: returnData}
};


export function markDeliveryNotReceived(payload) {
    console.log("markDeliveryNotReceived payload");
    console.log(payload);

    return (dispatch) => {
        axios.post(`http://${HOSTNAME}:8080/order/markDeliveryNotReceived/`, null, {params: payload})
            .then((response) => dispatch(markDeliveryNotReceivedDispatch(response.data)))
            .catch((err) => console.log(err));
    }
}

export const markDeliveryNotReceivedDispatch = (returnData) => {
    console.log("markDeliveryNotReceivedDispatch returnData");
    console.log(returnData);

    return {type: DELIVERY_NOT_RECEIVED, payload: returnData}
};

export function getOrdersByUserId(payload) {
    console.log("getOrdersPlaced payload");
    console.log(payload);

    return (dispatch) => {
        axios.get(`http://${HOSTNAME}:8080/order/getOrdersByOwnerId/${payload.userId}`)
            .then((response) => dispatch(getOrdersByUserIdDispatch(response.data)))
            .catch((err) => console.log(err));
    }
}

export const getOrdersByUserIdDispatch = (returnData) => {
    console.log("getOrdersPlacedDispatch returnData");
    console.log(returnData);

    return {type: GET_ORDERS_BY_USER_ID, payload: returnData}
};


