import * as actionTypes from "./actionTypes";
import { ServerIncident, Error } from '../../shared/interfaces';

// all action creators here

// for incidents fetch success from server
export const fetchIncidentsSuccess = (incidents: ServerIncident[]) => ({
    type: actionTypes.FETCH_INCIDENTS_SUCCESS,
    incidents: incidents,
    tmpIncidents: incidents
});

// if incidents fetch fail from server
export const fetchIncidentsFail = (error: Error) => ({
    type: actionTypes.FETCH_INCIDENTS_FAIL,
    error: error
});

// for incidents fetch start from server
export const fetchIncidentsStart = () => ({
    type: actionTypes.FETCH_INCIDENTS_START
});

// for incidents data fetched from server
export const fetchIncidents = (incidents: ServerIncident[]) => ({
    type: actionTypes.FETCH_INCIDENTS,
    incidents
});

// incident fetch success from server
export const fetchIncidentDetailSuccess = (incident: ServerIncident) => ({
    type: actionTypes.FETCH_INCIDENT_DETAIL_SUCCESS,
    incident: incident
});

// incident fetch fail from server
export const fetchIncidentDetailFail = (error: Error) => ({
    type: actionTypes.FETCH_INCIDENT_DETAIL_FAIL,
    error: error
});

// incident fetch start from server
export const fetchIncidentDetailStart = () => ({
    type: actionTypes.FETCH_INCIDENT_DETAIL_START
});

// for incidents data fetched from server
export const fetchIncidentDetail = (value: string) => ({
    type: actionTypes.FETCH_INCIDENT_DETAIL,
    value
});

// to sort incidents asc order by column name
export const sortIncidents = (name: string, sortType: string) => ({
    type: actionTypes.SORT_INCIDENTS,
    colName: name,
    sortType
});

// to update url for sorting incidents asc order by column name
export const sortIncidentsUpdateUrl = (name: string, sortType: string, history: string) => ({
    type: actionTypes.SORT_INCIDENTS_UPDATE_URL,
    colName: name,
    sortType,
    history
});

// to filter incidents data by search text
export const filterIncidents = (val: string) => ({
    type: actionTypes.FILTER_INCIDENTS,
    val: val
});

// to filter incidents data by search text
export const filterIncidentsUpdateUrl = (val: string, history: string) => ({
    type: actionTypes.FILTER_INCIDENTS_UPDATE_URL,
    val: val,
    history
});