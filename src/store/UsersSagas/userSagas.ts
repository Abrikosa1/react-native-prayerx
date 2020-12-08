import {call, put, takeEvery} from "redux-saga/effects";
import { dataSagaActions } from "../DataSagas/dataSagaActions";
import { setErrors } from "../LoginSlice";

import {setCurrentUser} from "../UsersSlice";
import {userSagaActions} from "./userSagaActions";

//SIGN_IN
function fetchSignIn(action : any) {
    const url = "http://trello-purrweb.herokuapp.com/auth/sign-in";
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(action.payload)
    }).then((response : any) => {
        if (!response.ok) {
            throw response
        }
        return response.json()
    }).catch((error : any) => console.log('Error: ', error));
}

export function * signInSaga(action : any) {
    try {
        const data = yield call(fetchSignIn, action);
        if (data.hasOwnProperty('token')) {
            yield put(setCurrentUser(data));
            yield put(setErrors({error: false, errorMessage: ""}));
            yield put({type: dataSagaActions.LOAD_LISTS, payload: {token: data.token}});
            yield put({type: dataSagaActions.LOAD_TASKS, payload: {token: data.token}});
            yield put({type: dataSagaActions.LOAD_COMMENTS, payload: {token: data.token}});
        }
        if(data.name === 'EntityNotFound'){
            yield put(setErrors({error: true, errorMessage: data.name}));
        } 

    } catch (e) {
        console.log(e);
        yield put({type: "SIGN_IN_FAILED"});
    }
}

export function *watchSignIn() {
    yield takeEvery(userSagaActions.SIGN_IN, signInSaga);
}

//SIGN_UP
function fetchSignUp(action : any) {
    const url = "http://trello-purrweb.herokuapp.com/auth/sign-up";
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(action.payload)
    }).then((response : any) => {
        if (!response.ok) {
            throw response
        }
        return response.json()
    }).catch((error : any) => console.log('Error: ', error));
}

export function * signUpSaga(action : any) {
    try {
        const data = yield call(fetchSignUp, action);
    } catch (e) {
        console.log(e);
        yield put({type: "SIGN_UP_FAILED"});
    }
}

export function *watchSignUp() {
    yield takeEvery(userSagaActions.SIGN_UP, signUpSaga);
}