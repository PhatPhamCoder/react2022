import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorExtraInfor.scss';
import localization from 'moment/locale/vi';
import { LANGUAGES } from '../../../utils';
import moment from 'moment/moment';
import { getExtraInforDoctorById } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';
import NumericFormat from 'react-number-format';
import { PatternFormat } from 'react-number-format';

class DoctorSchedule extends Component {

    constructor(props) {
        super(props)
        this.state = {
            iShowDetailInfor: false,
            extraInfor: {}
        }
    }

    async componentDidMount() {

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
        if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
            let res = await getExtraInforDoctorById(this.props.doctorIdFromParent);
            if (res && res.errCode === 0) {
                this.setState({
                    extraInfor: res.data
                })
            }
        }
    }

    showHideDetailInfor = (status) => {
        this.setState({
            iShowDetailInfor: status
        })
    }

    render() {
        let { iShowDetailInfor, extraInfor } = this.state;
        let { language } = this.props
        return (
            <div className='doctor-extra-infor-container'>
                <div className='content-up'>

                    <div className='text-address'>
                        <FormattedMessage id='admin.manage-doctor.address-clinic' />
                    </div>
                    <div className='name-clinic'>
                        {extraInfor && extraInfor.nameClinic ? extraInfor.nameClinic : ''}
                    </div>
                    <div className='detail-address'>
                        {extraInfor && extraInfor.addressClinic ? extraInfor.addressClinic : ''}
                    </div>
                </div>
                <div className='content-down'>
                    {iShowDetailInfor === false ?
                        <div className='short-infor'>
                            <FormattedMessage id='detail-doctor.doctor-extra-infor.price' />:
                            {extraInfor && extraInfor.priceTypeData && language === LANGUAGES.VI &&
                                <NumericFormat
                                    value={extraInfor.priceTypeData.valueVi}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={'VND'}
                                    className='currency'
                                />
                            }

                            {extraInfor && extraInfor.priceTypeData && language === LANGUAGES.EN &&
                                <NumericFormat
                                    value={extraInfor.priceTypeData.valueEn}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={'$'}
                                    className='currency'
                                />
                            }
                            <span onClick={() => this.showHideDetailInfor(true)} style={{ color: 'skyblue', cursor: 'pointer', paddingleft: '10px' }}>
                                <FormattedMessage id='detail-doctor.doctor-extra-infor.see-detail' />
                            </span>
                        </div>
                        :
                        <>
                            <div className='title-price'><FormattedMessage id='detail-doctor.doctor-extra-infor.price' /></div>
                            <div className='detail-infor'>
                                <div className='price'>
                                    <span className='left'><FormattedMessage id='detail-doctor.doctor-extra-infor.price' /></span>
                                    <span className='right'>
                                        {extraInfor && extraInfor.priceTypeData && language === LANGUAGES.VI &&
                                            <NumericFormat
                                                value={extraInfor.priceTypeData.valueVi}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                suffix={'VND'}
                                                className='currency'
                                            />
                                        }

                                        {extraInfor && extraInfor.priceTypeData && language === LANGUAGES.EN &&
                                            <NumericFormat
                                                value={extraInfor.priceTypeData.valueEn}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                suffix={'$'}
                                                className='currency'
                                            />
                                        }
                                    </span>
                                </div>
                                <div className='note'>
                                    {extraInfor && extraInfor.note ? extraInfor.note : ''}
                                </div>
                            </div>
                            <div className='payment'>
                                Người bệnh có thể thanh toán bằng hình thức:
                                {extraInfor && extraInfor.paymentTypeData ? extraInfor.paymentTypeData.valueVi : ''}
                            </div>
                            <span onClick={() => this.showHideDetailInfor(false)} style={{ color: 'skyblue', cursor: 'pointer' }}>
                                <FormattedMessage id='detail-doctor.doctor-extra-infor.hide-price' />
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
