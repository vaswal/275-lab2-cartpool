import {SIGN_IN, SIGN_IN_ERROR, SIGN_UP, SIGN_UP_ERROR, VERIFY_EMAIL, VERIFY_EMAIL_ERROR} from "../../redux/constants/actionTypes";
import {HOSTNAME} from "../../constants/appConstants";

import axios from 'axios';

export function signIn(payload) {
    console.log("signIn payload");
    console.log(payload);

    return (dispatch) => {
        axios.post(`http://${HOSTNAME}:8080/account/login`, null, {params: payload})
            .then((response) => dispatch(signInDispatch(response.data)))
            .catch((err) => dispatch(signInErrorDispatch(err)));
    }
}

export const signInDispatch = (returnData) => {
    console.log("Inside signInDispatch");
    console.log(returnData);

    return {type: SIGN_IN, payload: returnData}
};

export const signInErrorDispatch = (error) => {
    console.log("Inside signInErrorDispatch", error);

    return {type: SIGN_IN_ERROR, payload: error}
};

export function signUp(payload) {
    console.log("signUp payload");
    console.log(payload);

    return (dispatch) => {
        axios.post(`http://${HOSTNAME}:8080/account/signup`, null, {params: payload})
            .then((response) => dispatch(signUpDispatch(response.data)))
            .catch((err) => dispatch(signUpErrorDispatch(err)));
    }
}

export const signUpDispatch = (returnData) => {
    console.log("Inside signUpDispatch");
    console.log(returnData);

    return {type: SIGN_UP, payload: returnData}
};
export const signUpErrorDispatch = (err) => {
    console.log("Inside signUpErrorDispatch");

    return {type: SIGN_UP_ERROR, payload: err}
};


export function verifyEmail(payload) {
    console.log("verifyEmail payload");
    console.log(payload);

    return (dispatch) => {
        axios.post(`http://${HOSTNAME}:8080/account/verify`, null, {params: payload})
            .then((response) => dispatch(verifyEmailDispatch(response.data)))
            .catch((error) => dispatch(verifyEmailErrorDispatch(error)));
    }
}

export const verifyEmailDispatch = (returnData) => {
    console.log("verifyEmail signUpDispatch");
    console.log(returnData);

    return {type: VERIFY_EMAIL, payload: returnData}
};

export const verifyEmailErrorDispatch = (error) => {
    console.log("verifyEmailErrorDispatch error");
    console.log(error);

    return {type: VERIFY_EMAIL_ERROR, payload: null}
};