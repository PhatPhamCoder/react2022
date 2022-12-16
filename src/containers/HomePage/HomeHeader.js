import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from "../../utils";

import { changeLanguageApp } from "../../store/actions"

class HomeHeader extends Component {

    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)
    }

    render() {
        let language = this.props.language;

        return (
            <React.Fragment>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='left-content'>
                            <i className="fas fa-bars"></i>
                            <div className='header-logo'></div>
                        </div>
                        <div className='center-content'>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="homeheader.speciality" /></b></div>
                                <div className='sub-title'><FormattedMessage id="homeheader.searchdoctor" /></div>
                            </div>
                            <div className='child-content'>
                                <div><b>Cơ sở y tế</b></div>
                                <div className='sub-title'>Chọn bệnh viện phòng khám</div>
                            </div>
                            <div className='child-content'>
                                <div><b>Bác sĩ</b></div>
                                <div className='sub-title'>Chọn bác sĩ giỏi</div>
                            </div>
                            <div className='child-content'>
                                <div><b>Gói khám</b></div>
                                <div className='sub-title'>Khám sức khỏe tổng quát</div>
                            </div>
                        </div>
                        <div className='right-content'>
                            <div className='support'>
                                <i className="fas fa-question-circle"></i> Hỗ trợ
                            </div>
                            <div className={language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'}>
                                <span onClick={() => this.changeLanguage(LANGUAGES.VI)}>VN</span>
                            </div>
                            <div className={language === LANGUAGES.EN ? 'language-vi active' : 'language-en'}>
                                <span onClick={() => this.changeLanguage(LANGUAGES.EN)}>EN</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='home-header-banner'>
                    <div className='content-up'>
                        <div className='title1'>NỀN TẢNG Y TẾ</div>
                        <div className='title2'>CHĂM SÓC SỨC KHỎE TOÀN DIỆN</div>
                        <div className='search'>
                            <i className="fas fa-search"></i>
                            <input type='text' placeholder='Tìm gói khám' />
                        </div>
                    </div>
                    <div className='content-down'>
                        <div className='option'>
                            <div className='content-child'>
                                <div className='content-icon'><i className="fas fa-hospital-alt"></i></div>
                                <div className='content-text'>Khám chuyên khoa</div>
                            </div>
                            <div className='content-child'>
                                <div className='content-icon'><i className="fas fa-mobile-alt"></i></div>
                                <div className='content-text'>Khám từ xa</div>
                            </div>
                            <div className='content-child'>
                                <div className='content-icon'><i className="fas fa-book"></i></div>
                                <div className='content-text'>Khám tổng quát</div>
                            </div>
                            <div className='content-child'>
                                <div className='content-icon'><i className="fas fa-binoculars"></i></div>
                                <div className='content-text'>Khám nha khoa</div>
                            </div>
                            <div className='content-child'>
                                <div className='content-icon'><i className="fas fa-medkit"></i></div>
                                <div className='content-text'>Gói phẫu thuật</div>
                            </div>
                            <div className='content-child'>
                                <div className='content-icon'><i className="fas fa-flask"></i></div>
                                <div className='content-text'>Sản phẩm y tế</div>
                            </div>
                            <div className='content-child'>
                                <div className='content-icon'><i className="fas fa-ambulance"></i></div>
                                <div className='content-text'>Sức khỏe doanh nghiệp</div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment >
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
