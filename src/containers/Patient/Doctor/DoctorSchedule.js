import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorSchedule.scss';
import localization from 'moment/locale/vi';
import { LANGUAGES } from '../../../utils';
import moment from 'moment/moment';
import { getScheduleDoctorByDate } from '../../../services/userService';

class DoctorSchedule extends Component {

    constructor(props) {
        super(props)
        this.state = {
            allDays: [],
            availableTime: []
        }
    }

    componentDidMount() {
        let { language } = this.props;
        this.setArrDays(language);
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    setArrDays = (language) => {
        let allDays = []
        for (let i = 0; i < 7; i++) {
            let object = {};
            if (language === LANGUAGES.VI) {
                let labelVi = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
                // object.label = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
                object.label = this.capitalizeFirstLetter(labelVi);
            } else {
                object.label = moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM');
            }
            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
            allDays.push(object);
        }
        this.setState({
            allDays: allDays
        })
        console.log('check day', allDays)
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
            let date = event.target.value;
            let res = await getScheduleDoctorByDate(doctorId, date);
            if (res && res.errCode === 0) {
                this.setState({
                    availableTime: res.data ? res.data : []
                })
            }
            console.log('check schedule from react: ', res)
        }
    }

    render() {
        let { allDays, availableTime } = this.state;
        let { language } = this.props;
        return (
            <div className='doctor-schedule-container'>
                <div className='all-schedule'>
                    <select
                        onChange={(event) => this.handleOnChangeSelect(event)}
                    >
                        {allDays && allDays.length > 0 &&
                            allDays.map((item, index) => {
                                return (
                                    <option
                                        key={index}
                                        value={item.value} //Lấy giá trị Value trong Item
                                    >
                                        {item.label}
                                    </option>
                                )
                            })}

                    </select>
                </div>
                <div className='all-available-time'>
                    <div className='text-calender'>
                        <i class="fas fa-calendar-alt">
                            <span>Lịch khám</span>
                        </i>
                    </div>
                    <div className='time-content'>
                        {availableTime && availableTime.length > 0 ?
                            availableTime.map((item, index) => {
                                let TimeDisplay = language === LANGUAGES.VI ?
                                    item.timeTypeData.valueVi : item.timeTypeData.valueEn;
                                return (
                                    <button key={index}>{TimeDisplay}</button>
                                )
                            })
                            :
                            <div>
                                <h5><strong>Hiện tại không có lịch hẹn trong thời gian bạn chọn</strong></h5>
                                <h7>Vui lòng liên hệ với chúng tôi qua <strong style={{ color: "red", cursor: "pointer" }}>Hotline: 1900 7777</strong></h7>
                            </div>
                        }
                    </div>
                </div>
            </div >
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
