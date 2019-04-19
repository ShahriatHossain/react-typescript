import React, { Component, Fragment } from 'react';
import styled from 'styled-components';

const Main = styled.main`
    margin: 20px;
`;

class Layout extends Component {

    render() {
        return (
            <Fragment>
                <Main>
                    {this.props.children}
                </Main>
            </Fragment>
        )
    }
}

export default Layout;