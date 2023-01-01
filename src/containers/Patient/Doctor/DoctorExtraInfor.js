import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorExtraInfor.scss';
import localization from 'moment/locale/vi';
import { LANGUAGES } from '../../../utils';
import moment from 'moment/moment';
import { getScheduleDoctorByDate } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';

class DoctorSchedule extends Component {

    constructor(props) {
        super(props)
        this.state = {
            iShowDetailInfor: true,
        }
    }

    async componentDidMount() {

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }

    }

    showHideDetailInfor = (status) => {
        this.setState({
            iShowDetailInfor: status
        })
    }

    render() {
        let { iShowDetailInfor } = this.state;

        return (
            <div className='doctor-extra-infor-container'>
                <div className='content-up'>
                    <div className='text-address'>
                        Địa chỉ phòng khám
                    </div>
                    <div className='name-clinic'>
                        Phòng khám da liễu
                    </div>
                    <div className='detail-address'>
                        284 Cống Quỳnh, Quận 1, Tp.HCM
                    </div>
                </div>
                <div className='content-down'>
                    {iShowDetailInfor === false ?
                        <div>
                            Giá khám: 250.000.
                            <span onClick={() => this.showHideDetailInfor(true)}>
                                Xem chi tiết
                            </span>
                        </div>
                        :
                        <>
                            <div className='title-price'>Giá khám</div>
                            <div className='detail-infor'>
                                <div className='price'>
                                    <span className='left'>Giá khám</span>
                                    <span className='right'>250.000đ</span>
                                </div>
                                <div className='note'>
                                    Giá khám ưu tiên
                                </div>
                            </div>
                            <div className='payment'>
                                Người bệnh có thể thanh toán bằng hình thức tiền mặt hoặc chuyển khoản
                            </div>
                            <span onClick={() => this.showHideDetailInfor(false)}>
                                Ẩn bảng giá
                            </span>
                        </>
                    }
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
