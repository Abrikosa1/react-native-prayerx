import { all } from "redux-saga/effects";
import { watchLoadData, watchAddList, watchRemoveList, watchRenameList } from "./DataSagas/dataSagas";
import { watchLogIn } from "./UsersSagas/userSagas";

export default function *rootSaga() {
  yield all([watchLogIn(), watchLoadData(), watchAddList(), watchRemoveList(), watchRenameList()])
}
