import React from 'react';
import { Row, Col } from 'react-styled-flexboxgrid';

const spinner = () => (
    <Row>
        <Col xs={6} md={12}>
            <div>Loading...</div>
        </Col>
    </Row>
);

export default spinner;