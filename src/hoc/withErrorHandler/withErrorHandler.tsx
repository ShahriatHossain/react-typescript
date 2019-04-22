import React, { Component, Fragment } from 'react';

const withErrorHandler = (WrappedComponent: any, axios: any) => {
    return class extends Component<any, any> {
        reqInterceptor: any = {};
        resInterceptor: any = {};
        // initiate to check component is mounted or not
        _isMounted = false;

        constructor(props: any) {
            super(props);

            this.state = {
                error: null
            };

            // add req an resp interceptor to fire globally 
            this.reqInterceptor = axios.interceptors.request.use((req: any) => {
                if (this._isMounted) this.setState({ error: null });
                return req;
            });
            this.resInterceptor = axios.interceptors.response.use((res: any) => res, (error: any) => {
                if (this._isMounted) this.setState({ error: error });
            });
        }

        componentDidMount() {
            this._isMounted = true;
        }

        componentWillUnmount() {
            // remove interceptor on component unmount
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);

            this._isMounted = false;
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