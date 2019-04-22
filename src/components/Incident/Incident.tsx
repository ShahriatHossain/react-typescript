import React from 'react';
import { Col, Row } from 'react-styled-flexboxgrid';
import moment from 'moment';
import { Link } from 'react-router-dom';

import { Container, Wrapper, Title, Description, Address, Thumb } from './Styles';
import noImage from '../../assets/img/no-image.png';

const incident = (props: any) => {
    if(!props.data) return null;
    
    // assigning no image place holder 
    //if image not available
    const img = props.data.media.image_url_thumb ? props.data.media.image_url_thumb : noImage;
    return (
        <Container>
            <Row>
                <Col xs={6} md={2}>
                    <Thumb src={img} />
                </Col>
                <Col xs={6} md={10}>
                    <Wrapper>
                        <Title><Link to={'/incidents/' + props.data.id}>{props.data.title}</Link></Title>
                        <Description>{props.data.description}</Description>
                        <Address>{moment.unix(props.data.occurred_at).format('ddd MMM D YYYY')} - {props.data.address}</Address>
                    </Wrapper>
                </Col>
            </Row>
        </Container>
    )
}

export default incident;