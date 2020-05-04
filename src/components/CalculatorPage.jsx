import React from 'react';
import { connect } from 'react-redux';
import { set_fligth } from '../reducers/Action'

import { DatePicker, TimePicker } from "@material-ui/pickers";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { set_country, is_sending } from '../reducers/Action'


import './CalculatiorPage.scss'


class CalculatiorPageClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            departDateTime: null,
            arrivalDateTime: null,
            isChecked: false,
            gmtOffset: '',
            countryISO: '',
            countryName: '',
        };

    }

    componentDidMount() {
        this.props.dispatch(is_sending(true));
        fetch('http://api.timezonedb.com/v2.1/list-time-zone?key=UFV4EW6OEFHO&format=json')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                debugger
                let countryCode = ''
                let arrayCountry = data.zones.filter(el => {
                    if (el.countryCode !== countryCode) {
                        countryCode = el.countryCode;
                        return true;
                    }
                })
                arrayCountry = arrayCountry.slice(0, 30)
                this.props.dispatch(set_country(arrayCountry));
                this.props.dispatch(is_sending(false));
                console.log(arrayCountry);
            });
    }

    handleChange = (event) => {
        let selectedCountry = this.props.storeState.arrayCountry.filter(el => el.countryCode === event.target.value);
        let countryName = selectedCountry[0].countryName
        selectedCountry = Math.abs(selectedCountry[0].gmtOffset + new Date().getTimezoneOffset() * 60)
        selectedCountry = selectedCountry / 60 / 60
        console.log(selectedCountry)
        this.setState({
            gmtOffset: selectedCountry,
            countryISO: event.target.value,
            countryName: countryName,
        });
    };


    checkForm = () => {
        this.setState({ isChecked: true })
        if (this.state.departDateTime && this.state.arrivalDateTime && this.state.countryName && (this.state.arrivalDateTime.getTime() + this.state.gmtOffset * 3600000) > this.state.departDateTime.getTime()) {
            let fligth = {
                departDateTime: this.state.departDateTime,
                arrivalDateTime: this.state.arrivalDateTime,
                countryName: this.state.countryName,
                gmtOffset: this.state.gmtOffset,
            }
            this.props.dispatch(set_fligth(fligth))
            this.props.history.push(`/result/${String(this.state.gmtOffset)}&${this.state.departDateTime.getTime()}&${this.state.arrivalDateTime.getTime()}`)
        }
    }

    render() {
        let dateCheck;
        if (this.state.arrivalDateTime && this.state.departDateTime) {
            dateCheck = (this.state.arrivalDateTime.getTime() + this.state.gmtOffset * 3600000) > this.state.departDateTime.getTime();
            console.log((this.state.arrivalDateTime.getTime() + this.state.gmtOffset * 3600000) > this.state.departDateTime.getTime())
        }
        console.log(!this.state.countryISO && this.state.isChecked, "is", !this.state.countryISO, this.state.isChecked)
        return (
            <div className="calculator">
                <div className="calculator-block">
                    <TimePicker
                        clearable
                        ampm={false}
                        disablePast={true}
                        label="Время вылета"
                        error={!this.state.departDateTime && this.state.isChecked}
                        value={this.state.departDateTime}
                        onChange={(value) => { this.setState({ departDateTime: value }) }}
                    />
                </div>
                <div className="calculator-block">
                    <DatePicker
                        label="Дата вылета"
                        disablePast={true}
                        error={!this.state.departDateTime && this.state.isChecked}
                        value={this.state.departDateTime}
                        onChange={(value) => { this.setState({ departDateTime: value }) }}
                        animateYearScrolling
                    />
                </div>
                <div className="calculator-block">
                    <FormControl className="calculator-block-country">
                        <InputLabel id="demo-controlled-open-select-label"> Страна </InputLabel>
                        <Select
                            labelId="demo-controlled-open-select-label"
                            id="demo-controlled-open-select"
                            error={!this.state.countryISO && this.state.isChecked}
                            value={this.state.countryISO}
                            onChange={event => { this.handleChange(event); this.setState({ isChecked: false }) }}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {this.props.storeState.arrayCountry.map(el =>
                                <MenuItem key={el.countryCode} value={el.countryCode}> {el.countryName} </MenuItem>
                            )}
                        </Select>
                    </FormControl>
                </div>
                <div className="calculator-block">
                    <TimePicker
                        clearable
                        ampm={false}
                        label="Время прибытия"
                        error={!dateCheck && this.state.arrivalDateTime || (!this.state.arrivalDateTime && this.state.isChecked)}
                        value={this.state.arrivalDateTime}
                        onChange={(value) => { this.setState({ arrivalDateTime: value }) }}
                    />
                </div>
                <div className="calculator-block">
                    <DatePicker
                        label="Дата прибытия"
                        disablePast={true}
                        error={!dateCheck && this.state.arrivalDateTime || (!this.state.arrivalDateTime && this.state.isChecked)}
                        value={this.state.arrivalDateTime}
                        onChange={(value) => { this.setState({ arrivalDateTime: value }) }}
                        animateYearScrolling
                    />
                </div>
                <div className="calculator-block" onClick={this.checkForm}>
                    <span className="calculator-block-btn">Посчитать</span>
                </div>
            </div>
        );
    }
}

const CalculatiorPage = connect(
    (state) => ({
        storeState: state.AppReduser,
    }),
)(CalculatiorPageClass);

export default CalculatiorPage;
