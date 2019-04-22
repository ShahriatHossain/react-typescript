import React from 'react';
import { Row, Col } from 'react-styled-flexboxgrid';

const totalIncidents = (props: any) => {
    if(props.totalIncidents <= 0) return null;

    return (
        <Row>
            <Col xsOffset={11} xs={1}>
                total: {props.totalIncidents}
            </Col>
        </Row>
    )
}

export default totalIncidents;