import { call, put, takeEvery } from "redux-saga/effects";
import { putLists, putTasks, putComments } from "../DataSlice";
import { dataSagaActions } from "./dataSagaActions";

const fetchDataUrl:any = {
    LOAD_LISTS: 'http://trello-purrweb.herokuapp.com/columns',
    LOAD_TASKS: 'http://trello-purrweb.herokuapp.com/cards',
    LOAD_COMMENTS: 'http://trello-purrweb.herokuapp.com/comments',
}
//LOAD_LISTS
function fetchData(action: any) {
    return fetch(fetchDataUrl[action.type], {
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
        
        if(action.type === 'LOAD_LISTS')
            yield put(putLists(data));
        else if(action.type === 'LOAD_TASKS')
            yield put(putTasks(data));
        else if(action.type === 'LOAD_COMMENTS')
            yield put(putComments(data));
    } catch (e) {
        yield put({type: "TODO_FETCH_FAILED"});
    }
}

export function *watchLoadLists() {
    yield takeEvery(dataSagaActions.LOAD_LISTS, fetchDataSaga);
}

export function *watchLoadTasks() {
    yield takeEvery(dataSagaActions.LOAD_TASKS, fetchDataSaga);
}

export function *watchLoadComments() {
    yield takeEvery(dataSagaActions.LOAD_COMMENTS, fetchDataSaga);
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
        yield put({type:dataSagaActions.LOAD_LISTS, payload: {token: action.payload.token}});
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
        yield put({type:dataSagaActions.LOAD_LISTS, payload: {token: action.payload.token}});
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
      return response.json()
    })
    .catch((error : any) => console.log('Error: ', error));
}

function *renameListSaga(action: any) {

    try {
        const data = yield call(fetchRenameList, action);
        yield put({type:dataSagaActions.LOAD_LISTS, payload: {token: action.payload.token}});
    } catch (e) {
        yield put({type: "RENAME_LIST_FAILED"});
    }
}

export function *watchRenameList() {
    yield takeEvery(dataSagaActions.RENAME_LIST, renameListSaga);
}

//ADD_TASK
function fetchAddTask(action: any) {
    const url = `http://trello-purrweb.herokuapp.com/columns/${action.payload.newTask.column}/cards`;
    return fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + action.payload.token,
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(action.payload.newTask)
    })
    .then((response : any) => {
      if (!response.ok) { throw response }
      return response.json()
    })
    .catch((error : any) => console.log('Error: ', error));
}

function *addTaskSaga(action: any) {
    try {
        const data = yield call(fetchAddTask, action);
        yield put({type:dataSagaActions.LOAD_TASKS, payload: {token: action.payload.token}});
    } catch (e) {
        yield put({type: "ADD_TASK_FAILED"});
    }
}

export function *watchAddTask() {
    yield takeEvery(dataSagaActions.ADD_TASK, addTaskSaga);
}

//REMOVE_TASK
function fetchRemoveTask(action: any) {
    const url = "http://trello-purrweb.herokuapp.com/cards/" + action.payload.id;
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

function *removeTaskSaga(action: any) {
    try {
        const data = yield call(fetchRemoveTask, action);
        yield put({type:dataSagaActions.LOAD_TASKS, payload: {token: action.payload.token}});
    } catch (e) {
        yield put({type: "REMOVE_TASK_FAILED"});
    }
}

export function *watchRemoveTask() {
    yield takeEvery(dataSagaActions.REMOVE_TASK, removeTaskSaga);
}


//ADD_COMMENT
function fetchAddComment(action: any) {
    const url = `http://trello-purrweb.herokuapp.com/cards/${action.payload.cardId}/comments`;
    return fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + action.payload.token,
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(action.payload.newComment)
    })
    .then((response : any) => {
      if (!response.ok) { throw response }
      return response.json()
    })
    .catch((error : any) => console.log('Error: ', error));
}

function *addCommentSaga(action: any) {
    try {
        const data = yield call(fetchAddComment, action);
        yield put({type:dataSagaActions.LOAD_COMMENTS, payload: {token: action.payload.token}});
    } catch (e) {
        yield put({type: "ADD_COMMENT_FAILED"});
    }
}

export function *watchAddComment() {
    yield takeEvery(dataSagaActions.ADD_COMMENT, addCommentSaga);
}


//REMOVE_TASK
function fetchRemoveComment(action: any) {
    const url = "http://trello-purrweb.herokuapp.com/comments/" + action.payload.id;
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

function *removeCommentSaga(action: any) {
    try {
        const data = yield call(fetchRemoveComment, action);
        yield put({type:dataSagaActions.LOAD_COMMENTS, payload: {token: action.payload.token}});
    } catch (e) {
        yield put({type: "REMOVE_COMMENT_FAILED"});
    }
}

export function *watchRemoveComment() {
    yield takeEvery(dataSagaActions.REMOVE_COMMENT, removeCommentSaga);
}
