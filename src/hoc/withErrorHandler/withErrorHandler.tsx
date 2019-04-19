import React, { Component, Fragment } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import { Error } from '../../shared/interfaces';

const withErrorHandler = (WrappedComponent: any, axios: any) => {
    return class extends Component<any, any> {
        state: any = {
            error: Error
        }
        
        reqInterceptor = {}
        resInterceptor = {}

        componentWillMount() {
            // add req an resp interceptor to fire globally 
            this.reqInterceptor = axios.interceptors.request.use((req: any) => {
                this.setState({ error: null });
                return req;
            });
            this.resInterceptor = axios.interceptors.response.use((res: any) => res, (error: Error) => {
                this.setState({ error: error });
            });
        }

        componentWillUnmount() {
            // remove interceptor on component unmount
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        // setting error null when modal dismissed
        errorConfirmedHandler = () => {
            this.setState({ error: Error });
        }

        render() {
            return (
                <Fragment>
                    <Modal
                        show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Fragment>
            );
        }
    }
}

export default withErrorHandler;