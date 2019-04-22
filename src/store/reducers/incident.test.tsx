import reducer from './incident';
import * as actionTypes from '../actions/actionTypes';
import { BikeIncident } from '../../shared/interfaces';

// reducers testing here

describe('incident reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            incidents: [],
            tmpIncidents: [],
            loading: false
        });
    });

    it('should fetch incident upon success', () => {
        expect(reducer({
            incidents: [],
            tmpIncidents: [],
            loading: false
        }, {
                type: actionTypes.FETCH_INCIDENTS_SUCCESS,
                incidents: [{ title: 'hello', description: 'hello' }],
                tmpIncidents: [{ title: 'hello', description: 'hello' }],
                loading: false
            })).toEqual({
                incidents: [{ title: 'hello', description: 'hello' }],
                tmpIncidents: [{ title: 'hello', description: 'hello' }],
                loading: false
            });
    });

    it('should fetch incident detail upon success', () => {
        expect(reducer({
            incidents: [],
            tmpIncidents: [],
            loading: false
        }, {
                type: actionTypes.FETCH_INCIDENT_DETAIL_SUCCESS,
                incident: {},
                loading: false
            })).toEqual({
                incident: {},
                loading: false
            });
    });
});
