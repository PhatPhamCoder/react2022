import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorSchedule.scss';
import localization from 'moment/locale/vi';
import { LANGUAGES } from '../../../utils';
import Select from 'react-select';
import moment from 'moment/moment';
import { getScheduleDoctorByDate } from '../../../services/userService';

class DoctorSchedule extends Component {

    constructor(props) {
        super(props)
        this.state = {
            allDays: []
        }
    }

    async componentDidMount() {
        let { language } = this.props;

        console.log('moment vie', moment(new Date()).format('dddd - DD/MM'));
        console.log('moment en', moment(new Date()).locale('en').format('ddd - DD/MM'));

        this.setArrDays(language);

    }

    setArrDays = (language) => {
        let allDays = []
        for (let i = 0; i < 7; i++) {
            let object = {};
            if (language === LANGUAGES.VI) {
                object.label = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
            } else {
                object.label = moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM');
            }

            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();

            allDays.push(object);
        }
        this.setState({
            allDays: allDays
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        let { language } = this.props;
        if (language !== prevProps.language) {
            this.setArrDays(language);
        }
    }

    handleOnChangeSelect = async (event) => {
        if (this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1) {
            let doctorId = this.props.doctorIdFromParent;
            let date = event.target.value
            let res = await getScheduleDoctorByDate(doctorId, date)
            console.log('check schedule from react: ', res)
        }
    }

    render() {
        let { allDays } = this.state;
        return (
            <div className='doctor-schedule-container'>
                <div className='all=schedule'>
                    <select
                        className='form-control'
                        onChange={(event) => this.handleOnChangeSelect(event)}
                    >
                        {allDays && allDays.length > 0 &&
                            allDays.map((item, index) => {
                                return (
                                    <option
                                        key={index}
                                        item={item.value}
                                    >
                                        {item.label}
                                    </option>
                                )
                            })}

                    </select>
                </div>
                <div className='all-available-time'>

                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
