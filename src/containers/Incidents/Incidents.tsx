import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from 'react-styled-flexboxgrid';

import axios from '../../axios-incidents';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/incident';
import Spinner from '../../components/UI/Spinner/Spinner';
import Input from '../../components/UI/Input/Input';
import Modal from '../../components/UI/Modal/Modal';
import berlinPD from '../../assets/img/berlin-p-d.png';
import CommonHeader from '../../components/UI/CommonHeader/CommonHeader';
import { ServerIncident, Error } from '../../shared/interfaces';
import Incident from '../../components/Incident/Incident';

class Incidents extends Component<any, any> {
    // initiate input field's properties
    state = {
        searchForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Please search by status, incident type, floor'
                },
                value: '',
                validation: {
                    required: false
                },
                valid: false,
                touched: false
            },

        },
        formIsValid: false
    }

    componentDidMount() {
        // initiate data from server
        this.loadData();
    }

    loadData() {
        this.props.onFetchIncidents(this.props.location.search);
    }

    // filter incidents and update url
    filterIncidentsHandler = (event: any) => {
        this.props.onFilterIncidents(event.target.value, this.props.history);
    }

    // sort incidents in asc order and update url
    sortIncidentsHandler = (colName: string, sortType: string) => {
        this.props.onSortIncidents(colName, sortType, this.props.history);
    }

    // to dismiss error popup msg
    errorConfirmedHandler = () => {
        this.setState({ error: null });
    }

    render() {
        // spinner will load while getting
        // response from server
        let incidents = <Spinner />;

        // assign table when when got 
        // response from server
        if (!this.props.loading) {
            incidents = this.props.incidents.map((inc: ServerIncident) => (
                <Incident key={inc.id} data={inc} />
            ))

            // if error occurs load modal
            if (this.props.error) {
                incidents = <Modal
                    show={this.props.error}
                    modalClosed={() => this.props.onfetchIncidentsFail(null)}>
                    {this.props.error ? this.props.error.message : null}
                </Modal>
            }
        }

        return (
            <div>
                <CommonHeader
                    isLinkAble={false}
                    icon={berlinPD}
                    title="Police Department of Berlin"
                    subtitle="Stolen bykes"
                />
                <Input
                    elementType={this.state.searchForm.name.elementType}
                    touched={this.state.searchForm.name.touched}
                    elementConfig={this.state.searchForm.name.elementConfig}
                    changed={(event: any) => this.filterIncidentsHandler(event)} />

                <Grid>
                    {incidents}
                </Grid>
            </div>

        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        incidents: state.incident.incidents,
        loading: state.incident.loading,
        error: state.incident.error
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onFetchIncidents: (incidents: ServerIncident[]) => dispatch(actions.fetchIncidents(incidents)),
        onSortIncidents: (colName: any, sortType: any, history: any) => dispatch(actions.sortIncidentsUpdateUrl(colName, sortType, history)),
        onFilterIncidents: (val: any, history: any) => dispatch(actions.filterIncidentsUpdateUrl(val, history)),
        onfetchIncidentsFail: (error: Error) => dispatch(actions.fetchIncidentsFail(error))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Incidents, axios));