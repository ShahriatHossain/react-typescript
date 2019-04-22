import { put } from "redux-saga/effects";

import axios from "../../axios-incidents";
import * as actions from "../actions/incident";
import { BikeIncident } from '../../shared/interfaces';
import {Error} from '../../shared/classes';

export function* fetchIncidentDetailSaga(action: any) {
    // dispatch fetch incident start action
    yield put(actions.fetchIncidentDetailStart());

    try {
        // retrieve data from server
        const response = yield axios.get("/api/v2/incidents/" + action.value);
        // check response correct
        if(!response) throw new Error('Opps, something happened.');

        // casting server data
        let incident = <BikeIncident>response.data.incident;

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
        // check response correct
        if(!response) throw new Error('Opps, something happened.');
        
        // mapping server record
        let incidents = response.data.incidents.map((inc: any) => {
            return <BikeIncident> {
                id: inc.id,
                title: inc.title,
                description: inc.description,
                address: inc.address,
                occurred_at: inc.occurred_at,
                updated_at: inc.updated_at,
                media: inc.media
            }
        });
        incidents = incidents.filter((inc: BikeIncident) => inc.title || inc.description);

        const error = response.data.error;

        // checking error to throw an exception
        if (error) {
            throw error;
        }

        // dispatch fetch incidents success action with payload
        yield put(actions.fetchIncidentsSuccess(incidents));

    } catch (error) {
        // dispatch fetch incidents fail action with error payload
        yield put(actions.fetchIncidentsFail(error));
    }
}
