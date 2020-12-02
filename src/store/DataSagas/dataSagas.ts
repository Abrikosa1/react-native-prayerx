import { call, put, takeEvery } from "redux-saga/effects";
import { putData } from "../DataSlice";
import { dataSagaActions } from "./dataSagaActions";

//LOAD_DATA
function fetchData(action: any) {
    const url = "http://trello-purrweb.herokuapp.com/columns";
    return fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + action.payload.token,
            'Content-Type': 'application/json;charset=utf-8'
        }
    })
    .then((response : any) => {
      if (!response.ok) { throw response }
      return response.json()
    })
    .catch((error : any) => console.log('Error: ', error));
}

function *fetchDataSaga(action: any) {
    try {
        const data = yield call(fetchData, action);
        console.log(data);
        yield put(putData(data));
    } catch (e) {
        yield put({type: "TODO_FETCH_FAILED"});
    }
}

export function *watchLoadData() {
    yield takeEvery(dataSagaActions.LOAD_DATA, fetchDataSaga);
}

/*ADD_LIST */
function fetchAddList(action: any) {
    const url = "http://trello-purrweb.herokuapp.com/columns";
    return fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + action.payload.token,
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(action.payload.newList)
    })
    .then((response : any) => {
      if (!response.ok) { throw response }
      return response.json()
    })
    .catch((error : any) => console.log('Error: ', error));
}

function *addListSaga(action: any) {
    try {
        const data = yield call(fetchAddList, action);
        console.log(data)
        yield put({type:dataSagaActions.LOAD_DATA, payload: {token: action.payload.token}});
    } catch (e) {
        yield put({type: "ADD_LIST_FAILED"});
    }
}

export function *watchAddList() {
    yield takeEvery(dataSagaActions.ADD_LIST, addListSaga);
}

//REMOVE_LIST
function fetchRemoveList(action: any) {
    const url = "http://trello-purrweb.herokuapp.com/columns/" + action.payload.id;
    return fetch(url, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + action.payload.token,
            'Content-Type': 'application/json;charset=utf-8'
        }
    })
    .then((response : any) => {
      if (!response.ok) { throw response }
      return response.json()
    })
    .catch((error : any) => console.log('Error: ', error));
}

function *removeListSaga(action: any) {
    try {
        const data = yield call(fetchRemoveList, action);
        yield put({type:dataSagaActions.LOAD_DATA, payload: {token: action.payload.token}});
    } catch (e) {
        yield put({type: "REMOVE_LIST_FAILED"});
    }
}

export function *watchRemoveList() {
    yield takeEvery(dataSagaActions.REMOVE_LIST, removeListSaga);
}

//RENAME_LIST
function fetchRenameList(action: any) {
    const url = "http://trello-purrweb.herokuapp.com/columns/" + action.payload.id;
    return fetch(url, {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + action.payload.token,
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(action.payload.newList)
    })
    .then((response : any) => {
      if (!response.ok) { throw response }
      console.log('resp:', response)
      return response.json()
    })
    .catch((error : any) => console.log('Error: ', error));
}

function *renameListSaga(action: any) {

    try {
        const data = yield call(fetchRenameList, action);
        console.log(data)
        yield put({type:dataSagaActions.LOAD_DATA, payload: {token: action.payload.token}});
    } catch (e) {
        yield put({type: "RENAME_LIST_FAILED"});
    }
}

export function *watchRenameList() {
    yield takeEvery(dataSagaActions.RENAME_LIST, renameListSaga);
}
