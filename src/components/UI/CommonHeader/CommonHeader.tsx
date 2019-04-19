import React from 'react';
import { NavLink } from 'react-router-dom';
import { Grid, Col, Row } from 'react-styled-flexboxgrid';

import { TitlesWrapper, Title, SubTitle, Logo } from './Styles';

const commonHeader = (props: any) => {
    // checking title is linkable or not
    let title = props.isLinkAble ? <NavLink
        to={props.url}
        exact
        activeStyle={{
            color: '#fa923f',
            textDecoration: 'underline'
        }}>
        {props.title}
    </NavLink> : <span>{props.title}</span>;

    return (
        <Grid>
            <Row>
                <Col md={1}>
                    <Logo><img src={props.icon} alt={props.title} /></Logo>
                </Col>
                <Col md={11}>
                    <TitlesWrapper>
                        <Title>{title}</Title> <br />
                        <SubTitle>{props.subtitle}</SubTitle>
                    </TitlesWrapper>
                </Col>
            </Row>
        </Grid>

    )
}

export default commonHeader;