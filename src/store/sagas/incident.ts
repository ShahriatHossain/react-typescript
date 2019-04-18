import { put, take, call } from "redux-saga/effects";
import queryString from 'query-string';
import moment from 'moment';

import axios from "../../axios-incidents";
import * as actions from "../actions/incident";
import { Incident, Error } from '../../shared/interfaces';
import { capitalize } from '../../shared/utility';

export function* fetchIncidentDetailSaga(action: any) {
    // dispatch fetch incident start action
    yield put(actions.fetchIncidentDetailStart());

    try {
        // retrieve data from server
        const response = yield axios.get("/api/v2/incidents/" + action.value);
        let incident = <Incident>response.data.incident;
        // receive error if occurred
        const error = response.data.error;

        // dispatch fetch incident success action with payload
        yield put(actions.fetchIncidentDetailSuccess(incident));

        // checking error to throw an exception
        if (error) {
            throw error;
        }

    } catch (error) {
        // dispatch fetch incidents fail action with error payload
        yield put(actions.fetchIncidentDetailFail(error));
    }
}

export function* fetchIncidentsSaga(action: any) {
    // dispatch fetch incident start action
    yield put(actions.fetchIncidentsStart());

    try {
        // retrieve data from server
        const response = yield axios.get("/api/v2/incidents");
        const incidents = <Incident[]> response.data.incidents;
        const error = response.data.error;

        // checking error to throw an exception
        if (error) {
            throw error;
        }

        // dispatch fetch incidents success action with payload
        yield put(actions.fetchIncidentsSuccess(incidents));

        // parsing values from query string url
        const values = yield queryString.parse(action.values);

        // dispatch filter incidents action with payload
        yield put(actions.filterIncidents(values.filter));

        // dispatch sort incidents actions by sort value from query string with payload
        yield put(actions.sortIncidents(values.sortBy, values.sort));

    } catch (error) {
        // dispatch fetch incidents fail action with error payload
        yield put(actions.fetchIncidentsFail(error));
    }
}

export function* sortIncidentsSaga(action: any) {
    // dispatch sort incident asc or desc action
    yield put(actions.sortIncidents(action.colName, action.sortType));

    // update url
    yield action.history.push('/incidents?sort=' + action.sortType + '&sortBy=' + action.colName)
}

export function* filterIncidentsSaga(action: any) {
    // dispatch fitler incidents action
    yield put(actions.filterIncidents(action.val));

    // update url
    yield action.history.push('/incidents?filter=' + action.val)
}

