import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { postVerifyBookAppointment } from '../../services/userService';
import HomeHeader from '../HomePage/HomeHeader';
import HomeFooter from '../HomePage/Section/HomeFooter';
import './verifyEmail.scss'
import { flatMap } from 'lodash';
class verifyEmail extends Component {

    constructor(props) {
        super(props)
        this.state = {
            statusVerify: false,
            errCode: 0
        }
    }

    async componentDidMount() {
        if (this.props.location && this.props.location.search) {
            let urlParams = new URLSearchParams(this.props.location.search)
            let token = urlParams.get('token');
            let doctorId = urlParams.get('doctorId');
            let res = await postVerifyBookAppointment({
                doctorId: doctorId,
                token: token,
            })

            if (res && res.errCode === 0) {
                this.setState({
                    statusVerify: true,
                    errCode: res.errCode
                })
            } else {
                this.setState({
                    statusVerify: true,
                    errCode: res && res.errCode ? res.errCode : -1
                })
            }
        }
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
    }

    render() {
        let { statusVerify, errCode } = this.state;
        console.log("check state", this.state)
        return (
            <>
                <HomeHeader />
                <div className='verify-email-container'>
                    {statusVerify === false ?
                        <div class="loader"></div>
                        :
                        <div>
                            {+errCode === 0 ?
                                <div className='verify-booking-succeed'>
                                    <i class="far fa-check-circle"></i>
                                    <div className='verify-booking-content'>
                                        <div className='up'>
                                            Successful
                                        </div>
                                        <div className='down'>
                                            Xác nhận lịch hẹn thành công
                                        </div>
                                    </div>
                                </div>
                                :
                                <div>
                                    <div className='verify-booking-failed'>
                                        <i class="fas fa-times-circle">
                                        </i>
                                        <div className='verify-booking-content'>
                                            <div className='up'>
                                                Error
                                            </div>
                                            <div className='down'>
                                                Lịch hẹn không tồn tại hoặc đã được xác nhận
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                    }
                </div>
            </>

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

export default connect(mapStateToProps, mapDispatchToProps)(verifyEmail);
