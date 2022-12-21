import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

class About extends Component {

    render() {
        return (
            <div className='section-share section-about'>
                <div className='section-about-header'>Truyền thông nói gì về PhatPham</div>
                <div className='section-about-content'>
                    <div className='content-left'>
                        <iframe
                            width="100%"
                            height="440px"
                            src="https://www.youtube.com/embed/Ng0_x_aRd3Q"
                            // title="Intro PhatPham"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen>
                        </iframe>
                    </div>
                    <div className='content-right'>
                        <p>
                            Chào mừng các bạn đến với website của chúng tôi <br />
                            Chúng tôi chuyên cung cấp giải pháp xây dựng 1 website hoàn chỉnh tại các lĩnh vực<br />
                            Liên hệ chúng tôi thông qua Fanpage: PhatPham Studio <br />
                        </p>
                    </div>
                </div>
            </div >
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
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(About);