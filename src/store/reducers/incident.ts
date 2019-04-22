import { isEmpty, filter } from 'lodash';
import moment from 'moment';

import * as actionTypes from '../actions/actionTypes';
import { updateObject, getFilterdResult } from '../../shared/utility';
import { BikeIncident } from '../../shared/interfaces';

const initialState = {
    incidents: <BikeIncident[]>[],
    tmpIncidents: <BikeIncident[]>[],
    loading: false,
    randKey: 0
};

// all reducers here

// fetch incident start from server
const fetchIncidentsStart = (state: any, action: any) => {
    return updateObject(state, { loading: true });
};

// when fetch incidents success from server
const fetchIncidentsSuccess = (state: any, action: any) => {
    return updateObject(state, {
        incidents: action.incidents,
        tmpIncidents: action.incidents,
        loading: false
    });
};

// when fail to fetch incidents from server
const fetchIncidentsFail = (state: any, action: any) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
};

// fetch incident start from server
const fetchIncidentDetailStart = (state: any, action: any) => {
    return updateObject(state, { loading: true });
};

// when fetch incidents success from server
const fetchIncidentDetailSuccess = (state: any, action: any) => {
    return updateObject(state, {
        incident: action.incident,
        loading: false
    });
};

// when fail to fetch incidents from server
const fetchIncidentDetailFail = (state: any, action: any) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
};

// to filter incidents
const filterIncidents = (state: any, action: any) => {
    let incidents = state.tmpIncidents;

    if (action.startDate && action.endDate) {
        // convert start and end time into timestamp
        const startTime = moment(action.startDate, 'YYYY-MM-DD').unix();
        const endTime = moment(action.endDate, 'YYYY-MM-DD').unix();

        // filter by date range
        incidents = filter(incidents, (inc: BikeIncident) => {
            const occurredDate = moment.unix(inc.occurred_at).format('YYYY-MM-DD');
            const occurredTime = moment(occurredDate, 'YYYY-MM-DD').unix();
            return occurredTime >= startTime && occurredTime <= endTime;
        });
    }

    // filter by text
    if (!isEmpty(action.text))
        incidents = getFilterdResult(incidents, action.text);

    const randKey = Math.floor((Math.random() * 100) + 1);

    return updateObject(state, {
        incidents,
        randKey
    });
};

const reducer = (state = initialState, action: any) => {
    switch (action.type) {
        // fetch incidents from server 
        case actionTypes.FETCH_INCIDENTS_START: return fetchIncidentsStart(state, action);
        case actionTypes.FETCH_INCIDENTS_SUCCESS: return fetchIncidentsSuccess(state, action);
        case actionTypes.FETCH_INCIDENTS_FAIL: return fetchIncidentsFail(state, action);
        // fetch incident detail from server
        case actionTypes.FETCH_INCIDENT_DETAIL_START: return fetchIncidentDetailStart(state, action);
        case actionTypes.FETCH_INCIDENT_DETAIL_FAIL: return fetchIncidentDetailFail(state, action);
        case actionTypes.FETCH_INCIDENT_DETAIL_SUCCESS: return fetchIncidentDetailSuccess(state, action);
        case actionTypes.FILTER_INCIDENTS: return filterIncidents(state, action);

        default: return state;
    }
};

export default reducer;