import * as actionTypes from "./actionTypes";
import { BikeIncident } from '../../shared/interfaces';

// all action creators here

// for incidents fetch success from server
export const fetchIncidentsSuccess = (incidents: BikeIncident[]) => ({
    type: actionTypes.FETCH_INCIDENTS_SUCCESS,
    incidents: incidents,
    tmpIncidents: incidents
});

// if incidents fetch fail from server
export const fetchIncidentsFail = (error: any) => ({
    type: actionTypes.FETCH_INCIDENTS_FAIL,
    error: error
});

// for incidents fetch start from server
export const fetchIncidentsStart = () => ({
    type: actionTypes.FETCH_INCIDENTS_START
});

// for incidents data fetched from server
export const fetchIncidents = (incidents: BikeIncident[]) => ({
    type: actionTypes.FETCH_INCIDENTS,
    incidents
});

// incident fetch success from server
export const fetchIncidentDetailSuccess = (incident: BikeIncident) => ({
    type: actionTypes.FETCH_INCIDENT_DETAIL_SUCCESS,
    incident: incident
});

// incident fetch fail from server
export const fetchIncidentDetailFail = (error: any) => ({
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

// to filter incidents by text or date range
// to filter machines data by search text
export const filterIncidents = (text: string, startDate: string, endDate: string) => ({
    type: actionTypes.FILTER_INCIDENTS,
    text,
    startDate,
    endDate
});