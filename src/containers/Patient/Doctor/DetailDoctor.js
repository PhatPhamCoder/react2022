import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import HomeFooter from '../../HomePage/Section/HomeFooter';
import './DetailDoctor.scss';
import { getDetailInforDoctor } from '../../../services/userService'
import { LANGUAGES } from '../../../utils';

class DetailDoctor extends Component {

    constructor(props) {
        super(props)
        this.state = {
            detaileDoctor: {}
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id
            let res = await getDetailInforDoctor(id);
            if (res && res.errCode === 0) {
                this.setState({
                    detaileDoctor: res.data
                })
            }

            // imageBase64 = new Buffer(item.image, 'base64').toString('binary');
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    render() {
        console.log('check state', this.state);
        let { language } = this.props;
        let { detaileDoctor } = this.state;
        let nameVi = '', nameEn = '';
        if (detaileDoctor && detaileDoctor.positionData) {
            nameVi = `${detaileDoctor.positionData.valueVi}, ${detaileDoctor.lastName} ${detaileDoctor.firstName}`
            nameEn = `${detaileDoctor.positionData.valueEn}, ${detaileDoctor.firstName} ${detaileDoctor.lastName}`
        }
        return (
            <React.Fragment>
                <HomeHeader isShowBanner={false} />
                <div className='doctor-detail-container'>
                    <div className='intro-doctor'>
                        <div className='content-left'
                            style={{ backgroundImage: `url(${detaileDoctor.image ? detaileDoctor.image : ''})` }}
                        >
                        </div>
                        <div className='content-right'>
                            <div className='up'>
                                {language === LANGUAGES.VI ? nameVi : nameEn}
                            </div>
                            <div className='down'>
                                {detaileDoctor.markdown && detaileDoctor.markdown.description
                                    && <span>
                                        {detaileDoctor.markdown.description}
                                    </span>
                                }
                            </div>
                        </div>
                    </div>
                    <div className='schedule-doctor'>

                    </div>
                    <div className='detail-info'>
                        {detaileDoctor.markdown && detaileDoctor.markdown.contentHTML
                            &&
                            < div dangerouslySetInnerHTML={{
                                __html: detaileDoctor.markdown.contentHTML
                            }}>
                            </div>
                        }
                    </div>
                    <div className='comment-doctor'>

                    </div>
                </div>
                <HomeFooter />
            </React.Fragment >

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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);