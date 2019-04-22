import React from 'react';
import { Row, Col } from 'react-styled-flexboxgrid';

const noRecord = (props: any) => {
    return (
        <Row>
            <Col md={12}>No record found.</Col>
        </Row>
    )
}

export default noRecord;