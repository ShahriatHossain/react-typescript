import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-styled-flexboxgrid';

import './Pagination.css';
import { Wrapper } from './Styles';

class Pagination extends Component<any, any> {
    render() {
        return (
            <Wrapper>
                <Grid>
                    <Row>
                        <Col xs={6} md={12}>
                            <div className="pagination">
                                <a href="#">First</a>
                                <a href="#">Prev</a>
                                <a href="#">1</a>
                                <a href="#" className="active">2</a>
                                <a href="#">3</a>
                                <a href="#">4</a>
                                <a href="#">5</a>
                                <a href="#">6</a>
                                <a href="#">Next</a>
                                <a href="#">Last</a>
                            </div>
                        </Col>
                    </Row>
                </Grid>
            </Wrapper>
        );
    }
}

export default Pagination;