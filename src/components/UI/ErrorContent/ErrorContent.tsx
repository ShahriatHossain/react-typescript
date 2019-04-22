import React, { Component, Fragment } from 'react';
import { Row, Col } from 'react-styled-flexboxgrid';

import { ErrorContainer } from './Styles';

class ErrorContent extends Component<any, any> {

    shouldComponentUpdate(nextProps: any) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }

    render() {
        return (
            <Row>
                <Col xs={6} md={12}>
                    <ErrorContainer>
                        {this.props.children}
                    </ErrorContainer>
                </Col>
            </Row>
        )
    }
}

export default ErrorContent;