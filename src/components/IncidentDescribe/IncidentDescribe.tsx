import React from 'react';
import { Row, Col } from 'react-styled-flexboxgrid';
import moment from 'moment-timezone';

import { Wrapper, Title, Metadata, Photo, DescHeader, Description } from './Styles';
import noImage from '../../assets/img/no-image-large.png';

const incidentDescribe = (props: any) => {
    if (!props.incident) return null;

    const img = props.incident.media.image_url ? props.incident.media.image_url : noImage;

    return (
            <Row>
                <Col xs={6} md={12}>
                    <Wrapper>
                        <Title>{props.incident.title}</Title>
                        <Metadata>
                            <strong>Stolen</strong> {moment.unix(props.incident.occurred_at).tz("Europe/Berlin").format('MMM D ha z')}
                            <strong> at </strong>{props.incident.address}
                        </Metadata>
                        <Photo src={img} />
                        <DescHeader>DESCRIPTION OF INCIDENT</DescHeader>
                        <Description>
                            {props.incident.description}
                        </Description>
                    </Wrapper>
                </Col>
            </Row>
    );
}

export default incidentDescribe;