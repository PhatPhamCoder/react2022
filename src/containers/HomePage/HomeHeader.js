import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';

class HomeHeader extends Component {

    render() {
        return (
            <React.Fragment>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='left-content'>
                            <i class="fas fa-bars"></i>
                            <div className='header-logo'></div>
                        </div>
                        <div className='center-content'>
                            <div className='child-content'>
                                <div><b>Chuyên khoa</b></div>
                                <div className='sub-title'>Tìm bác sĩ theo chuyên khoa</div>
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
                                <i class="fas fa-question-circle"></i> Hỗ trợ
                            </div>
                            <div className='flag'>
                                VN
                            </div>
                        </div>
                    </div>
                </div>
                <div className='home-header-banner'>
                    <div className='content-up'>
                        <div className='title1'>NỀN TẢNG Y TẾ</div>
                        <div className='title2'>CHĂM SÓC SỨC KHỎE TOÀN DIỆN</div>
                        <div className='search'>
                            <i class="fas fa-search"></i>
                            <input type='text' placeholder='Tìm gói khám' />
                        </div>
                    </div>
                    <div className='content-down'>
                        <div className='option'>
                            <div className='content-child'>
                                <div className='content-icon'><i class="fas fa-hospital-alt"></i></div>
                                <div className='content-text'>Khám chuyên khoa</div>
                            </div>
                            <div className='content-child'>
                                <div className='content-icon'><i class="fas fa-mobile-alt"></i></div>
                                <div className='content-text'>Khám từ xa</div>
                            </div>
                            <div className='content-child'>
                                <div className='content-icon'><i class="fas fa-book"></i></div>
                                <div className='content-text'>Khám tổng quát</div>
                            </div>
                            <div className='content-child'>
                                <div className='content-icon'><i class="fas fa-binoculars"></i></div>
                                <div className='content-text'>Khám nha khoa</div>
                            </div>
                            <div className='content-child'>
                                <div className='content-icon'><i class="fas fa-medkit"></i></div>
                                <div className='content-text'>Gói phẫu thuật</div>
                            </div>
                            <div className='content-child'>
                                <div className='content-icon'><i class="fas fa-flask"></i></div>
                                <div className='content-text'>Sản phẩm y tế</div>
                            </div>
                            <div className='content-child'>
                                <div className='content-icon'><i class="fas fa-ambulance"></i></div>
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
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
