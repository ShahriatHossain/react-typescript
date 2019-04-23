import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from 'react-styled-flexboxgrid';

import axios from '../../axios-incidents';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/incident';
import Spinner from '../../components/UI/Spinner/Spinner';
import ErrorContent from '../../components/UI/ErrorContent/ErrorContent';
import berlinPD from '../../assets/img/berlin-p-d.png';
import CommonHeader from '../../components/UI/CommonHeader/CommonHeader';
import { BikeIncident } from '../../shared/interfaces';
import Incident from '../../components/Incident/Incident';
import Pagination from '../../components/UI/Pagination/Pagination';
import Filter from '../../components/UI/Filter/Filter';
import TotalIncidents from '../../components/TotalIncidents/TotalIncidents';
import NoRecord from '../../components/UI/NoRecord/NoRecord';

export class Incidents extends Component<any, any> {
    // initiate flag to check component is mounted or not
    _isMounted = false;

    // initiate state
    state: any = { currentIncidents: [], currentPage: null, totalPages: null }

    componentDidMount() {
        this._isMounted = true;
        // initiate data from server
        this.loadData();
    }

    loadData() {
        this.props.onFetchIncidents(this.props.location.search);
    }

    // when page hanged
    onPageChanged = (data: any) => {
        const { currentPage, totalPages, pageLimit } = data;

        const offset = (currentPage - 1) * pageLimit;
        const currentIncidents = this.props.incidents.slice(offset, offset + pageLimit);

        if (this._isMounted)
            this.setState({ currentPage, currentIncidents, totalPages });
    }

    // filter incidents
    findIncidentsHandler = (event: any, text: string, startDate: string, endDate: string) => {
        event.preventDefault();
        this.props.onFilterIncidents(text, startDate, endDate);
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        const { currentIncidents } = this.state;

        // spinner will load while getting
        // response from server
        let incidents = <Spinner />;

        // assign table when got 
        // response from server
        if (!this.props.loading) {
            incidents = this.props.incidents.length > 0 ? currentIncidents.map((inc: BikeIncident) => (
                <Incident key={inc.id} data={inc} />
            )) : <NoRecord />;

            // if error occurs load error content
            if (this.props.error) {
                incidents = (
                    <ErrorContent>
                        {this.props.error ? this.props.error.message : null}
                    </ErrorContent>
                );
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
                <Filter findIncidents={this.findIncidentsHandler} />
                <Grid>
                    <TotalIncidents totalIncidents={this.props.incidents.length} />
                    {incidents}
                </Grid>

                {this.props.incidents.length > 0 && (<Pagination key={this.props.randKey} totalRecords={this.props.incidents.length} pageLimit={10}
                    pageNeighbours={0} onPageChanged={this.onPageChanged} />)}
            </div>

        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        incidents: state.incident.incidents,
        loading: state.incident.loading,
        error: state.incident.error,
        randKey: state.incident.randKey
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onFetchIncidents: (incidents: BikeIncident[]) => dispatch(actions.fetchIncidents(incidents)),
        onfetchIncidentsFail: (error: any) => dispatch(actions.fetchIncidentsFail(error)),
        onFilterIncidents: (text: string, startDate: string, endDate: string) =>
            dispatch(actions.filterIncidents(text, startDate, endDate))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Incidents, axios));