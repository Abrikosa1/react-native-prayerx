import { all } from "redux-saga/effects";
import { watchLoadLists, watchAddList, watchRemoveList, watchRenameList, watchAddTask, watchLoadComments, watchLoadTasks, watchRemoveTask, watchAddComment, watchRemoveComment, watchUpdateTask, watchUpdateComment, watchLoadData } from "./DataSagas/dataSagas";
import { watchSignIn, watchSignUp } from "./UsersSagas/userSagas";

export default function *rootSaga() {
  yield all([
    watchSignIn(), 
    watchSignUp(),
    watchLoadLists(), 
    watchLoadTasks(), 
    watchLoadComments(), 
    watchLoadData(),
    watchAddList(), 
    watchRemoveList(), 
    watchRenameList(), 
    watchAddTask(), 
    watchRemoveTask(), 
    watchAddComment(), 
    watchRemoveComment(),
    watchUpdateTask(),
    watchUpdateComment(),
  ])
}
