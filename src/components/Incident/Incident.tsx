import React from 'react';
import { Col, Row } from 'react-styled-flexboxgrid';

import { Container, Wrapper, Title, Description, Address, Thumb } from './Styles';
import noImage from '../../assets/img/no-image.png';

const incident = (props: any) => {
    const img = props.data.media.image_url_thumb ? props.data.media.image_url_thumb : noImage;
    return (
        <Container>
            <Row>
                <Col xs={6} md={2}>
                    <Thumb>
                        <img src={img} />
                    </Thumb>
                </Col>
                <Col xs={6} md={10}>
                    <Wrapper>
                        <Title><a href="">{props.data.title}</a></Title>
                        <Description>{props.data.description}</Description>
                        <Address>{props.data.occurred_at} - {props.data.address}</Address>
                    </Wrapper>
                </Col>
            </Row>
        </Container>
    )
}

export default incident;