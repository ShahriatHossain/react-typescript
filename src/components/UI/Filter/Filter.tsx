import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-styled-flexboxgrid';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import Input from '../Input/Input';
import Button from '../../../components/UI/Button/Button';
import { Container, Form, Calendar } from './Styles';
import { updateObject, checkValidity } from '../../../shared/utility';
import calendar from '../../../assets/img/calendar.png';

class Filter extends Component<any, any> {
    // initiate input field's properties
    state: any = {
        searchForm: {
            searchText: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Search case descriptions'
                },
                value: '',
                validation: {
                    required: false
                },
                valid: false,
                touched: false,
                col: 6
            },
            fromDate: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'from'
                },
                value: '',
                validation: {
                    required: false
                },
                valid: false,
                touched: false,
                col: 2
            },
            toDate: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'to'
                },
                value: '',
                validation: {
                    required: false
                },
                valid: false,
                touched: false,
                col: 2
            },
        },
        formIsValid: false,
        startDate: new Date()
    }

    inputChangedHandler = (event: any, inputIdentifier: any) => {

        const updatedFormElement = updateObject(this.state.searchForm[inputIdentifier], {
            value: event.target.value,
            valid: checkValidity(event.target.value, this.state.searchForm[inputIdentifier].validation),
            touched: true
        });
        const updatedSearchForm = updateObject(this.state.searchForm, {
            [inputIdentifier]: updatedFormElement
        });

        let formIsValid = true;
        for (let inputIdentifier in updatedSearchForm) {
            formIsValid = updatedSearchForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({ searchForm: updatedSearchForm, formIsValid: formIsValid });
    }

    handleDatePickerChange = (date: any) => {
        this.setState({
            startDate: date
        });
    }

    // filter incidents and update url
    filterIncidentsHandler = (event: any) => {
        this.props.onFilterIncidents(event.target.value, this.props.history);
    }

    // sort incidents in asc search and update url
    sortIncidentsHandler = (colName: string, sortType: string) => {
        this.props.onSortIncidents(colName, sortType, this.props.history);
    }

    searchHandler = (event: any) => {
        event.preventDefault();

        const formData: any = {};
        for (let formElementIdentifier in this.state.searchForm) {
            formData[formElementIdentifier] = this.state.searchForm[formElementIdentifier].value;
        }

    }

    render() {

        return (
            <Container>
                <Grid>
                    <Row>
                        <Form onSubmit={this.searchHandler}>
                            <Col md={4}>
                                <Input
                                    key={this.state.searchForm.searchText.id}
                                    elementType={this.state.searchForm.searchText.elementType}
                                    elementConfig={this.state.searchForm.searchText.elementConfig}
                                    value={this.state.searchForm.searchText.value}
                                    invalid={!this.state.searchForm.searchText.valid}
                                    shouldValidate={this.state.searchForm.searchText.validation}
                                    touched={this.state.searchForm.searchText.touched}
                                    changed={(event: any) => this.inputChangedHandler(event, this.state.searchForm.searchText.id)} />
                            </Col>
                            <Col md={2}>
                                <Input
                                    key={this.state.searchForm.fromDate.id}
                                    elementType={this.state.searchForm.fromDate.elementType}
                                    elementConfig={this.state.searchForm.fromDate.elementConfig}
                                    value={this.state.searchForm.fromDate.value}
                                    invalid={!this.state.searchForm.fromDate.valid}
                                    shouldValidate={this.state.searchForm.fromDate.validation}
                                    touched={this.state.searchForm.fromDate.touched}
                                    changed={(event: any) => this.inputChangedHandler(event, this.state.searchForm.fromDate.id)} />

                            </Col>
                            <Col md={1}><Calendar src={calendar} /></Col>
                            <Col md={2}>
                                <Input
                                    key={this.state.searchForm.toDate.id}
                                    elementType={this.state.searchForm.toDate.elementType}
                                    elementConfig={this.state.searchForm.toDate.elementConfig}
                                    value={this.state.searchForm.toDate.value}
                                    invalid={!this.state.searchForm.toDate.valid}
                                    shouldValidate={this.state.searchForm.toDate.validation}
                                    touched={this.state.searchForm.toDate.touched}
                                    changed={(event: any) => this.inputChangedHandler(event, this.state.searchForm.toDate.id)} />

                            </Col>
                            <Col md={1}><Calendar src={calendar} /></Col>
                            <Col md={2}>
                                <Button btnType="success" disabled={!this.state.formIsValid}>Find cases</Button>
                            </Col>
                        </Form>
                    </Row>
                </Grid>
            </Container>

        )
    }
}

export default Filter;