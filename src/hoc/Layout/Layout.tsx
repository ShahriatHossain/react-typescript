import React, { Component, Fragment } from 'react';

import { Main } from './Styles';

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