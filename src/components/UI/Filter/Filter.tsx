import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-styled-flexboxgrid';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import Input from '../Input/Input';
import Button from '../../../components/UI/Button/Button';
import { Container, Form, Calendar } from './Styles';
import { updateObject, checkValidity } from '../../../shared/utility';
import calendar from '../../../assets/img/calendar.png';
import moment from 'moment';

class Filter extends Component<any, any> {
    // initiate state
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
        startDate: null,
        endDate: null,
        isFromDatePickOpen: false,
        isToDatePickOpen: false
    }

    // select start date
    handleFromDateChange = (date: any) => {
        this.inputChangedHandler('fromDate', null, moment(date).format('YYYY-MM-DD'));
        this.handleFromDatePickOpen();
    }

    // select end date
    handleToDateChange = (date: any) => {
        this.inputChangedHandler('toDate', null, moment(date).format('YYYY-MM-DD'));
        this.handleToDatePickOpen();
    }

    // open start datepicker
    handleFromDatePickOpen = () => {
        this.setState({ isFromDatePickOpen: !this.state.isFromDatePickOpen });
    }

    // open end datepicker
    handleToDatePickOpen = () => {
        this.setState({ isToDatePickOpen: !this.state.isToDatePickOpen });
    }

    // change value for input by indentifier
    inputChangedHandler = (inputIdentifier: string, event?: any, byVal?: string) => {
        const value = byVal ? byVal : event.target.value;
        const updatedFormElement = updateObject(this.state.searchForm[inputIdentifier], {
            value: value,
            valid: checkValidity(value, this.state.searchForm[inputIdentifier].validation),
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

    // render UI
    render() {
        // initiate start and end datepicker
        let fromDatePick = null;
        let toDatePick = null;
        // check start datepicker should open
        if (this.state.isFromDatePickOpen)
            fromDatePick = <DatePicker
                dateFormat="yyyy/MM/dd"
                selected={this.state.startDate}
                onChange={this.handleFromDateChange}
                withPortal
                inline />
        // check end datepicker should ope
        if (this.state.isToDatePickOpen)
            toDatePick = <DatePicker
                dateFormat="yyyy/MM/dd"
                selected={this.state.endDate}
                onChange={this.handleToDateChange}
                withPortal
                inline />

        return (
            <Container>
                <Grid>
                    <Row>
                        <Form onSubmit={(event) => this.props.findIncidents(
                            event,
                            this.state.searchForm.searchText.value,
                            this.state.searchForm.fromDate.value,
                            this.state.searchForm.toDate.value
                        )}>
                            <Col md={4}>
                                <Input
                                    key={this.state.searchForm.searchText.id}
                                    elementType={this.state.searchForm.searchText.elementType}
                                    elementConfig={this.state.searchForm.searchText.elementConfig}
                                    value={this.state.searchForm.searchText.value}
                                    invalid={!this.state.searchForm.searchText.valid}
                                    shouldValidate={this.state.searchForm.searchText.validation}
                                    touched={this.state.searchForm.searchText.touched}
                                    changed={(event: any) => this.inputChangedHandler('searchText', event)} />
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
                                    changed={(event: any) => this.inputChangedHandler('fromDate', event)} />

                            </Col>
                            <Col md={1}>
                                <Calendar src={calendar} onClick={this.handleFromDatePickOpen} />
                                {fromDatePick}
                            </Col>
                            <Col md={2}>
                                <Input
                                    key={this.state.searchForm.toDate.id}
                                    elementType={this.state.searchForm.toDate.elementType}
                                    elementConfig={this.state.searchForm.toDate.elementConfig}
                                    value={this.state.searchForm.toDate.value}
                                    invalid={!this.state.searchForm.toDate.valid}
                                    shouldValidate={this.state.searchForm.toDate.validation}
                                    touched={this.state.searchForm.toDate.touched}
                                    changed={(event: any) => this.inputChangedHandler('toDate', event)} />

                            </Col>
                            <Col md={1}>
                                <Calendar src={calendar} onClick={this.handleToDatePickOpen} />
                                {toDatePick}
                            </Col>
                            <Col md={2}>
                                <Button btnType="success">FIND CASES</Button>
                            </Col>
                        </Form>
                    </Row>
                </Grid>
            </Container>

        )
    }
}

export default Filter;