import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-styled-flexboxgrid';

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

class Incidents extends Component<any, any> {
    state: any = { currentIncidents: [], currentPage: null, totalPages: null }

    componentDidMount() {
        // initiate data from server
        this.loadData();
    }

    loadData() {
        this.props.onFetchIncidents(this.props.location.search);
    }

    // to dismiss error popup msg
    errorConfirmedHandler = () => {
        this.setState({ error: null });
    }

    onPageChanged = (data: any) => {
        const { currentPage, totalPages, pageLimit } = data;

        const offset = (currentPage - 1) * pageLimit;
        const currentIncidents = this.props.incidents.slice(offset, offset + pageLimit);

        this.setState({ currentPage, currentIncidents, totalPages });
    }

    findIncidentsHandler = (event: any, text: string, startDate: string, endDate: string) => {
        event.preventDefault();
        this.props.onFilterIncidents(text, startDate, endDate);
    }

    render() {
        const { currentIncidents, currentPage, totalPages } = this.state;
        const totalIncidents = this.props.incidents.length;

        // spinner will load while getting
        // response from server
        let incidents = <Spinner />;

        // assign table when when got 
        // response from server
        if (!this.props.loading) {
            incidents = currentIncidents.map((inc: BikeIncident) => (
                <Incident key={inc.id} data={inc} />
            ));

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
                    <TotalIncidents totalIncidents={totalIncidents} />
                    {incidents}
                </Grid>
                <Pagination totalRecords={totalIncidents} pageLimit={10}
                    pageNeighbours={0} onPageChanged={this.onPageChanged} />
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
        onFetchIncidents: (incidents: BikeIncident[]) => dispatch(actions.fetchIncidents(incidents)),
        onfetchIncidentsFail: (error: any) => dispatch(actions.fetchIncidentsFail(error)),
        onFilterIncidents: (text: string, startDate: string, endDate: string) =>
            dispatch(actions.filterIncidents(text, startDate, endDate))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Incidents, axios));