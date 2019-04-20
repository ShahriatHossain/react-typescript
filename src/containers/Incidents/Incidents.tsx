import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-styled-flexboxgrid';

import axios from '../../axios-incidents';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/incident';
import Spinner from '../../components/UI/Spinner/Spinner';
import Modal from '../../components/UI/Modal/Modal';
import berlinPD from '../../assets/img/berlin-p-d.png';
import CommonHeader from '../../components/UI/CommonHeader/CommonHeader';
import { ServerIncident, Error } from '../../shared/interfaces';
import Incident from '../../components/Incident/Incident';
import Pagination from '../../components/UI/Pagination/Pagination';
import Filter from '../../components/UI/Filter/Filter';

class Incidents extends Component<any, any> {
    
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

    render() {
        // spinner will load while getting
        // response from server
        let incidents = (
            <Row>
                <Col xs={6} md={12}><Spinner />
                </Col>
            </Row>
        );

        // assign table when when got 
        // response from server
        if (!this.props.loading) {
            incidents = this.props.incidents.map((inc: ServerIncident) => (
                <Incident key={inc.id} data={inc} />
            ));


            // if error occurs load modal
            if (this.props.error) {
                incidents = (
                    <Row>
                        <Col xs={6} md={12}>
                            <Modal
                                show={this.props.error}
                                modalClosed={() => this.props.onfetchIncidentsFail(null)}>
                                {this.props.error ? this.props.error.message : null}
                            </Modal>
                        </Col>
                    </Row>
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

                <Filter />

                <Grid>
                    {incidents}
                </Grid>
                <Pagination />
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