import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from 'react-styled-flexboxgrid';

import CommonHeader from '../../components/UI/CommonHeader/CommonHeader';
import berlinPD from '../../assets/img/berlin-p-d.png';
import axios from '../../axios-incidents';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/incident';
import Spinner from '../../components/UI/Spinner/Spinner';
import ErrorContent from '../../components/UI/ErrorContent/ErrorContent';
import IncidentDescribe from '../../components/IncidentDescribe/IncidentDescribe';

class IncidentDetail extends Component<any, any> {
    componentDidMount() {
        // initiate incident from server
        this.loadData();
    }

    loadData() {
        this.props.onFetchIncident(this.props.match.params.id);
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
        if (!this.props.loading)
            incident = <IncidentDescribe incident={this.props.incident} />

        // if error occurs load error content
        if (this.props.error) {
            incident = <ErrorContent>
                {this.props.error ? this.props.error.message : null}
            </ErrorContent>
        }
        return (
            <div>
                <CommonHeader
                    isLinkAble={true}
                    url="/incidents"
                    icon={berlinPD}
                    title="Police Department of Berlin"
                    subtitle="Stolen bykes"
                />
                <Grid>
                    {incident}
                </Grid>
            </div>

        );
    }

}

const mapStateToProps = (state: any) => {
    return {
        incident: state.incident.incident,
        loading: state.incident.loading,
        error: state.incident.error
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onFetchIncident: (value: string) => dispatch(actions.fetchIncidentDetail(value)),
        onFetchIncidentFail: (error: any) => dispatch(actions.fetchIncidentDetailFail(error))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(IncidentDetail, axios));