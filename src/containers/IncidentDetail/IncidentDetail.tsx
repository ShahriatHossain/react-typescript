import React, { Component } from 'react';
import { connect } from 'react-redux';

import CommonHeader from '../../components/UI/CommonHeader/CommonHeader';
import berlinPD from '../../assets/img/berlin-p-d.png';
import { getIncidentTabs } from '../../shared/utility';
import axios from '../../axios-incidents';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/incident';
import Spinner from '../../components/UI/Spinner/Spinner';
import Modal from '../../components/UI/Modal/Modal';
import { Error, ServerIncident } from '../../shared/interfaces';

class IncidentDetail extends Component<any, any> {
    state = {
        selectedTab: 'details'
    }

    componentDidMount() {
        // initiate incident from server
        this.loadData();
    }

    loadData() {
        this.props.onFetchIncident(this.props.match.params.id);
    }

    clickTabHandler = (tabName: string) => {
        this.setState({
            ...this.state,
            selectedTab: tabName
        });
    }

    // to dismiss error popup msg
    errorConfirmedHandler = () => {
        this.setState({ ...this.state, error: null });
    }


    render() {

        // spinner will load while getting
        // response from server
        let incident = <Spinner />;

        // assign table when when got 
        // response from server
        if (!this.props.loading) {
            incident = <span />;
        }

        // if error occurs load modal
        if (this.props.error) {
            incident = <Modal
                show={this.props.error}
                modalClosed={() => this.props.onFetchIncidentFail(null)}>
                {this.props.error ? this.props.error.message : null}
            </Modal>
        }
        return (
            <div>
                <CommonHeader
                    isLinkAble={true}
                    url="/incidents"
                    icon={berlinPD}
                    title="Incidents" />
                {incident}
            </div>

        );
    }

}

const mapStateToProps = (state: any) => {
    return {
        liveEvents: state.incident.events,
        incident: state.incident.incident,
        loading: state.incident.loading,
        error: state.incident.error
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onFetchIncident: (value: string) => dispatch(actions.fetchIncidentDetail(value)),
        onFetchIncidentFail: (error: Error) => dispatch(actions.fetchIncidentDetailFail(error))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(IncidentDetail, axios));