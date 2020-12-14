import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeEvery } from "redux-saga/effects";
import { Comment, List, Task } from "../../types";
import { putLists, putTasks, putComments } from "../DataSlice";
import { dataSagaActions } from "./dataSagaActions";

const fetchDataUrl: any = {
    LOAD_LISTS: 'http://trello-purrweb.herokuapp.com/columns',
    LOAD_TASKS: 'http://trello-purrweb.herokuapp.com/cards',
    LOAD_COMMENTS: 'http://trello-purrweb.herokuapp.com/comments',
}
//LOAD_DATA
function fetchData(action: any) {
    return fetch(fetchDataUrl[action.type], {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + action.payload.token,
            'Content-Type': 'application/json;charset=utf-8'
        }
    })
    .then((response) => {
      if (!response.ok) { throw response }
      return response.json()
    })
    .catch((error) => console.log('Error: ', error));
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
        console.log(e)
        yield put({type: "TODO_FETCH_FAILED"});
    }
}

export function *watchLoadLists() {
    yield takeEvery(dataSagaActions.LOAD_LISTS.type, fetchDataSaga);
}

export function *watchLoadTasks() {
    yield takeEvery(dataSagaActions.LOAD_TASKS.type, fetchDataSaga);
}

export function *watchLoadComments() {
    yield takeEvery(dataSagaActions.LOAD_COMMENTS.type, fetchDataSaga);
}

function *fetchAllDataSaga(action: PayloadAction<{token: string}>) {
    try {
        yield put({type:dataSagaActions.LOAD_TASKS.type, payload: {token: action.payload.token}});
        yield put({type:dataSagaActions.LOAD_LISTS.type, payload: {token: action.payload.token}});
        yield put({type:dataSagaActions.LOAD_COMMENTS.type, payload: {token: action.payload.token}});
    } catch (e) {
        console.log(e)
        yield put({type: "FETCH_DATA_FAILED"});
    }
}

export function *watchLoadData() {
    yield takeEvery(dataSagaActions.LOAD_DATA.type, fetchAllDataSaga);
}

/*ADD_LIST */
function fetchAddList(action: PayloadAction<{token: string, newList: List}>) {
    const url = "http://trello-purrweb.herokuapp.com/columns";
    return fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + action.payload.token,
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(action.payload.newList)
    })
    .then((response) => {
      if (!response.ok) { throw response }
      return response.json()
    })
    .catch((error) => console.log('Error: ', error));
}

function *addListSaga(action: PayloadAction<{token: string, newList: List}>) {
    try {
        const data = yield call(fetchAddList, action);
        yield put({type:dataSagaActions.LOAD_LISTS.type, payload: {token: action.payload.token}});
    } catch (e) {
        console.log(e);
        yield put({ type: "ADD_LIST_FAILED", e });
    }
}

export function *watchAddList() {
    yield takeEvery(dataSagaActions.ADD_LIST.type, addListSaga);
}

//REMOVE_LIST
function fetchRemoveList(action: PayloadAction<{id: number, token: string }>) {
    const url = "http://trello-purrweb.herokuapp.com/columns/" + action.payload.id;
    return fetch(url, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + action.payload.token,
            'Content-Type': 'application/json;charset=utf-8'
        }
    })
    .then((response) => {
      if (!response.ok) { throw response }
      return response.json()
    })
    .catch((error) => console.log('Error: ', error));
}

function *removeListSaga(action: PayloadAction<{id: number, token: string }>) {
    try {
        const data = yield call(fetchRemoveList, action);
        yield put({type:dataSagaActions.LOAD_LISTS.type, payload: {token: action.payload.token}});
    } catch (e) {
        console.log(e);
        yield put({type: "REMOVE_LIST_FAILED"});
    }
}

export function *watchRemoveList() {
    yield takeEvery(dataSagaActions.REMOVE_LIST.type, removeListSaga);
}

//UPDATE_LIST
function fetchRenameList(action: PayloadAction<{id: number, token: string, newList: List }>) {
    const url = "http://trello-purrweb.herokuapp.com/columns/" + action.payload.id;
    return fetch(url, {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + action.payload.token,
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(action.payload.newList)
    })
    .then((response) => {
      if (!response.ok) { throw response }
      return response.json()
    })
    .catch((error) => console.log('Error: ', error));
}

function *renameListSaga(action: PayloadAction<{id: number, token: string, newList: List }>) {

    try {
        const data = yield call(fetchRenameList, action);
        yield put({type:dataSagaActions.LOAD_LISTS.type, payload: {token: action.payload.token}});
    } catch (e) {
        console.log(e);
        yield put({type: "RENAME_LIST_FAILED"});
    }
}

export function *watchRenameList() {
    yield takeEvery(dataSagaActions.UPDATE_LIST.type, renameListSaga);
}

//ADD_TASK
function fetchAddTask(action: PayloadAction<{ token: string, newTask: Task }>) {
    const url = `http://trello-purrweb.herokuapp.com/columns/${action.payload.newTask.columnId}/cards`;
    return fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + action.payload.token,
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(action.payload.newTask)
    })
    .then((response) => {
      if (!response.ok) { throw response }
      return response.json()
    })
    .catch((error) => console.log('Error: ', error));
}

function *addTaskSaga(action: PayloadAction<{ token: string, newTask: Task }>) {
    try {
        const data = yield call(fetchAddTask, action);
        yield put({type:dataSagaActions.LOAD_TASKS.type, payload: {token: action.payload.token}});
    } catch (e) {
        console.log(e);
        yield put({type: "ADD_TASK_FAILED"});
    }
}

export function *watchAddTask() {
    yield takeEvery(dataSagaActions.ADD_TASK.type, addTaskSaga);
}

//REMOVE_TASK
function fetchRemoveTask(action: PayloadAction<{ id: number, token: string }>) {
    const url = "http://trello-purrweb.herokuapp.com/cards/" + action.payload.id;
    return fetch(url, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + action.payload.token,
            'Content-Type': 'application/json;charset=utf-8'
        }
    })
    .then((response) => {
      if (!response.ok) { throw response }
      return response.json()
    })
    .catch((error) => console.log('Error: ', error));
}

function *removeTaskSaga(action: PayloadAction<{ id: number, token: string }>) {
    try {
        const data = yield call(fetchRemoveTask, action);
        yield put({type:dataSagaActions.LOAD_TASKS.type, payload: {token: action.payload.token}});
    } catch (e) {
        console.log(e);
        yield put({type: "REMOVE_TASK_FAILED"});
    }
}

export function *watchRemoveTask() {
    yield takeEvery(dataSagaActions.REMOVE_TASK.type, removeTaskSaga);
}


//ADD_COMMENT
function fetchAddComment(action: PayloadAction<{ cardId: number, token: string, newComment: Comment }>) {
    const url = `http://trello-purrweb.herokuapp.com/cards/${action.payload.cardId}/comments`;
    return fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + action.payload.token,
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(action.payload.newComment)
    })
    .then((response) => {
      if (!response.ok) { throw response }
      return response.json()
    })
    .catch((error) => console.log('Error: ', error));
}

function *addCommentSaga(action: PayloadAction<{ cardId: number, token: string, newComment: Comment }>) {
    try {
        const data = yield call(fetchAddComment, action);
        yield put({type:dataSagaActions.LOAD_COMMENTS.type, payload: {token: action.payload.token}});
    } catch (e) {
        console.log(e);
        yield put({type: "ADD_COMMENT_FAILED"});
    }
}

export function *watchAddComment() {
    yield takeEvery(dataSagaActions.ADD_COMMENT.type, addCommentSaga);
}


//REMOVE_TASK
function fetchRemoveComment(action: PayloadAction<{ id: number, token: string }>) {
    const url = "http://trello-purrweb.herokuapp.com/comments/" + action.payload.id;
    return fetch(url, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + action.payload.token,
            'Content-Type': 'application/json;charset=utf-8'
        }
    })
    .then((response) => {
      if (!response.ok) { throw response }
      return response.json()
    })
    .catch((error) => console.log('Error: ', error));
}

function *removeCommentSaga(action: PayloadAction<{ id: number, token: string }>) {
    try {
        const data = yield call(fetchRemoveComment, action);
        yield put({type:dataSagaActions.LOAD_COMMENTS.type, payload: {token: action.payload.token}});
    } catch (e) {
        console.log(e);
        yield put({type: "REMOVE_COMMENT_FAILED"});
    }
}

export function *watchRemoveComment() {
    yield takeEvery(dataSagaActions.REMOVE_COMMENT.type, removeCommentSaga);
}


//UPDATE_TASK
function fetchUpdateTask(action: PayloadAction<{ taskId: number, token: string, newTask: Task }>) {
    const url = "http://trello-purrweb.herokuapp.com/cards/" + action.payload.taskId;
    return fetch(url, {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + action.payload.token,
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(action.payload.newTask)
    })
    .then((response) => {
      if (!response.ok) { throw response }
      return response.json()
    })
    .catch((error) => console.log('Error: ', error));
}

function *updateTaskSaga(action: PayloadAction<{ taskId: number, token: string, newTask: Task }>) {
    try {
        const data = yield call(fetchUpdateTask, action);
        yield put({type:dataSagaActions.LOAD_TASKS.type, payload: {token: action.payload.token}});
    } catch (e) {
        console.log(e);
        yield put({type: "UPDATE_TASK_FAILED"});
    }
}

export function *watchUpdateTask() {
    yield takeEvery(dataSagaActions.UPDADE_TASK.type, updateTaskSaga);
}


//UPDATE_COMMENT
function fetchUpdateComment(action: PayloadAction<{ commentId: number, token: string, newComment: Comment }>) {
    const url = "http://trello-purrweb.herokuapp.com/comments/" + action.payload.commentId;
    return fetch(url, {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + action.payload.token,
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(action.payload.newComment)
    })
    .then((response) => {
      if (!response.ok) { throw response }
      return response.json()
    })
    .catch((error) => console.log('Error: ', error));
}

function *updateCommentSaga(action: PayloadAction<{ commentId: number, token: string, newComment: Comment }>) {
    try {
        const data = yield call(fetchUpdateComment, action);
        yield put({type:dataSagaActions.LOAD_COMMENTS.type, payload: {token: action.payload.token}});
    } catch (e) {
        console.log(e);
        yield put({type: "UPDATE_COMMENT_FAILED"});
    }
}

export function *watchUpdateComment() {
    yield takeEvery(dataSagaActions.UPDATE_COMMENT.type, updateCommentSaga);
}
