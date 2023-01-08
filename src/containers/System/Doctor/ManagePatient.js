import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedDate, FormattedMessage } from 'react-intl';
import './ManagePatient.scss';
import DatePicker from '../../../components/Input/DatePicker';
import { getListPatientDorDoctor } from '../../../services/userService';
import moment from 'moment';
import { LANGUAGES } from '../../../utils';

class ManagePatient extends Component {

    constructor(props) {
        super(props)
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            dataPatient: []
        }
    }

    async componentDidMount() {
        let { user } = this.props;
        let { currentDate } = this.state;
        let formatedDate = new Date(currentDate).getTime();
        this.getDataPatient(user, formatedDate)

    }

    getDataPatient = async (user, formatedDate) => {
        let res = await getListPatientDorDoctor({
            doctorId: user.id,
            date: formatedDate
        })
        if (res && res.errCode === 0) {
            this.setState({
                dataPatient: res.data
            })
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
    }

    handleOnChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        }, () => {
            let { user } = this.props;
            let { currentDate } = this.state;
            let formatedDate = new Date(currentDate).getTime();
            this.getDataPatient(user, formatedDate)
        })
    }

    render() {
        let { currentDate, dataPatient } = this.state;
        let { language } = this.props;
        console.log("check state", this.state);
        return (
            <div className='manage-patient-container'>
                <div className='manage-patient-title'>
                    Quản lý bệnh nhân khám bệnh
                </div>
                <div className='manage-patient-body row'>
                    <div className='col-4 form-group'>
                        <label>Chọn ngày khám</label>
                        <DatePicker
                            className='form-control'
                            onChange={this.handleOnChangeDatePicker}
                            value={currentDate}
                        />
                    </div>
                    <div className='col-12 table-manage-patient'>
                        <table>
                            <tbody>
                                <tr>
                                    <th>STT</th>
                                    <th>Thời gian</th>
                                    <th>Họ và tên</th>
                                    <th>Giới tính</th>
                                    <th>Địa chỉ</th>
                                    <th>Trạng thái</th>
                                </tr>
                                {dataPatient && dataPatient.length > 0 ?
                                    dataPatient.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{language === LANGUAGES.VI ? item.timeTypeDataPatient.valueVI : item.timeTypeDataPatient.valueEN}</td>
                                                <td>{item.patientData.firstName}</td>
                                                <td>{language === LANGUAGES.VI ? item.patientData.genderData.valueVi : item.patientData.genderData.valueEn}</td>
                                                <td>{item.patientData.address}</td>
                                                <td className='btn-action-patient'>
                                                    <button className='btn btn-primary'>Xác nhận</button>
                                                    <button className='btn btn-warning'>Gửi hóa đơn</button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                    :
                                    <div className='check-no-data'>Không có lịch khám</div>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        user: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
