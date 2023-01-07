import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from "../../utils";
import { changeLanguageApp } from "../../store/actions";
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
                            <div className='header-logo' />
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
                                <span onClick={() => this.changeLanguage(LANGUAGES.VI)}>
                                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAACXBIWXMAAAsTAAALEwEAmpwYAAABQklEQVR4nO2XwUrDQBRF8z3dzEtSJzQBwQ/oMgs34kbQRf/Bj3CnCxEKorjwQwRpplbUlrRLa21wZanlykRNCqXu4gzyLlwYZl6Yw5s7A3EcFovFql6KqJYIcWiTFVGtAOwQxYkQsMkdopgBE+6g+GcZ7AaU21rAUcvHsOXbC5hdBsguAjsBVZ2wGEZYjEKoDbIPMD3wgXGUO933zQI+NAnT8wDZVen3m7AA1OPlNV2rv/nTDj7FHma3jQJqnWcqRH/bNXPE3QZhcirXwunu3UVkPoNv18EKnJ4zlsFlK1dg/ljm78cf/RDKswBwsON9QT1HGB/J3Hqs5/SaccDJicw7mO6VT8tg18P8PsTLsTQM6ApM2xK9rdWL0NskvJ7JvMYYoNKb0y819F1j8oiTisyACXdQWJRBZfuPO4vFYjmV6ROmP1+8ixsJeQAAAABJRU5ErkJggg==" />
                                </span>
                            </div>
                            <div className={language === LANGUAGES.EN ? 'language-vi active' : 'language-en'}>
                                <span onClick={() => this.changeLanguage(LANGUAGES.EN)}>
                                    <img src="data:image/png;base64,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" />
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                {this.props.isShowBanner === true &&
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
                }

            </React.Fragment >
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
