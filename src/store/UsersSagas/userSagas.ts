import {call, put, takeEvery} from "redux-saga/effects";
import { dataSagaActions } from "../DataSagas/dataSagaActions";

import {setCurrentUser} from "../UsersSlice";
import {userSagaActions} from "./userSagaActions";

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
            yield put({type: dataSagaActions.LOAD_LISTS, payload: {token: data.token}});
            yield put({type: dataSagaActions.LOAD_TASKS, payload: {token: data.token}});
            yield put({type: dataSagaActions.LOAD_COMMENTS, payload: {token: data.token}});
        }
    } catch (e) {
        yield put({type: "SIGN_IN_FAILED"});
    }
}

export function * watchLogIn() {
    yield takeEvery(userSagaActions.SIGN_IN, signInSaga);
}