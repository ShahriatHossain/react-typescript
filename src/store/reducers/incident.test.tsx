import reducer from './incident';
import * as actionTypes from '../actions/actionTypes';
import { genRandomKey } from '../../shared/utility';

const mockMath = Object.create(global.Math);
mockMath.random = () => 0.5;
global.Math = mockMath;

// reducers testing here

describe('incident reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            incidents: [],
            tmpIncidents: [],
            loading: false,
            randKey: 0
        });
    });

    it('should fetch incident upon success', () => {
        expect(reducer({
            incidents: [],
            tmpIncidents: [],
            loading: false,
            randKey: Math.random()
        }, {
                type: actionTypes.FETCH_INCIDENTS_SUCCESS,
                incidents: [{ title: 'hello', description: 'hello' }],
                tmpIncidents: [{ title: 'hello', description: 'hello' }],
                loading: false,
                randKey: Math.random()
            })).toEqual({
                incidents: [{ title: 'hello', description: 'hello' }],
                tmpIncidents: [{ title: 'hello', description: 'hello' }],
                loading: false,
                randKey: genRandomKey()
            });
    });

    it('should fetch incident detail upon success', () => {
        expect(reducer({
            incidents: [],
            tmpIncidents: [],
            loading: false,
            randKey: 0
        }, {
                type: actionTypes.FETCH_INCIDENT_DETAIL_SUCCESS,
                incident: {},
                incidents: [],
                tmpIncidents: [],
                loading: false,
                randKey: 0
            })).toEqual({
                incident: {},
                incidents: [],
                tmpIncidents: [],
                loading: false,
                randKey: 0
            });
    });
});
