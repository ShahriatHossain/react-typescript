import React, { Component, Fragment } from 'react';

const withErrorHandler = (WrappedComponent: any, axios: any) => {
    return class extends Component<any, any> {
        reqInterceptor: any = {};
        resInterceptor: any = {};

        constructor(props: any) {
            super(props);

            this.state = {
                error: null
            };

            // add req an resp interceptor to fire globally 
            this.reqInterceptor = axios.interceptors.request.use((req: any) => {
                this.setState({ error: null });
                return req;
            });
            this.resInterceptor = axios.interceptors.response.use((res: any) => res, (error: any) => {
                this.setState({ error: error });
            });
        }

        componentWillMount() {
            // add req an resp interceptor to fire globally 
            this.reqInterceptor = axios.interceptors.request.use((req: any) => {
                this.setState({ error: null });
                return req;
            });
            this.resInterceptor = axios.interceptors.response.use((res: any) => res, (error: any) => {
                this.setState({ error: error });
            });
        }

        componentWillUnmount() {
            // remove interceptor on component unmount
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        render() {
            return (
                <Fragment>
                    <WrappedComponent {...this.props} {... this.state.error} />
                </Fragment>
            );
        }
    }
}

export default withErrorHandler;