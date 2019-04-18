import { takeEvery, all } from "redux-saga/effects";

import * as actionTypes from "../actions/actionTypes";
import * as sagas from "./incident";

export function* watchIncident() {
    yield all([
        takeEvery(actionTypes.FETCH_INCIDENTS, sagas.fetchIncidentsSaga),
        takeEvery(actionTypes.SORT_INCIDENTS_UPDATE_URL, sagas.sortIncidentsSaga),
        takeEvery(actionTypes.FILTER_INCIDENTS_UPDATE_URL, sagas.filterIncidentsSaga),
        takeEvery(actionTypes.FETCH_INCIDENT_DETAIL, sagas.fetchIncidentDetailSaga)
    ]);
}