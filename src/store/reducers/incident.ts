import { orderBy, isEmpty } from 'lodash';

import * as actionTypes from '../actions/actionTypes';
import { updateObject, getFilterdResult } from '../../shared/utility';
import { ServerIncident } from '../../shared/interfaces';

const initialState = {
    incidents: [],
    tmpIncidents: [],
    loading: false,
    events: []
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

// to sort incidents as asc or desc order
const sortIncidents = (state: any, action: any) => {
    let incidents = state.incidents;
    incidents = orderBy(incidents, [action.colName], [action.sortType]); // Use Lodash to sort array by property

    return updateObject(state, {
        incidents: incidents
    });
};

// to filter incidents data
const filterIncidents = (state: any, action: any) => {
    let machines = { ...state.tmpIncidents };
    machines = getFilterdResult(machines, action.val)

    machines = isEmpty(action.val) ?
        state.tmpIncidents : machines;

    return updateObject(state, {
        machines: machines
    });
};

const reducer = (state = initialState, action: any) => {
    switch (action.type) {
        // fetch incidents from server 
        case actionTypes.FETCH_INCIDENTS_START: return fetchIncidentsStart(state, action);
        case actionTypes.FETCH_INCIDENTS_SUCCESS: return fetchIncidentsSuccess(state, action);
        case actionTypes.FETCH_INCIDENTS_FAIL: return fetchIncidentsFail(state, action);
        // to sort and filter incidents
        case actionTypes.SORT_INCIDENTS: return sortIncidents(state, action);
        case actionTypes.FILTER_INCIDENTS: return filterIncidents(state, action);
        // fetch incident detail from server
        case actionTypes.FETCH_INCIDENT_DETAIL_START: return fetchIncidentDetailStart(state, action);
        case actionTypes.FETCH_INCIDENT_DETAIL_FAIL: return fetchIncidentDetailFail(state, action);
        case actionTypes.FETCH_INCIDENT_DETAIL_SUCCESS: return fetchIncidentDetailSuccess(state, action);

        default: return state;
    }
};

export default reducer;