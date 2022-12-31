import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import HomeFooter from '../../HomePage/Section/HomeFooter';
import './DetailDoctor.scss';
import { getDetailInforDoctor } from '../../../services/userService'
import { LANGUAGES } from '../../../utils';
import DoctorSchedule from './DoctorSchedule';

class DetailDoctor extends Component {

    constructor(props) {
        super(props)
        this.state = {
            detailDoctor: {}
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id
            let res = await getDetailInforDoctor(id);
            if (res && res.errCode === 0) {
                this.setState({
                    detailDoctor: res.data
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
        let { detailDoctor } = this.state;
        let nameVi = '', nameEn = '';
        if (detailDoctor && detailDoctor.positionData) {
            nameVi = `${detailDoctor.positionData.valueVi}, ${detailDoctor.lastName} ${detailDoctor.firstName}`
            nameEn = `${detailDoctor.positionData.valueEn}, ${detailDoctor.firstName} ${detailDoctor.lastName}`
        }
        return (
            <React.Fragment>
                <HomeHeader isShowBanner={false} />
                <div className='doctor-detail-container'>
                    <div className='intro-doctor'>
                        <div className='content-left'
                            style={{ backgroundImage: `url(${detailDoctor.image ? detailDoctor.image : ''})` }}
                        >
                        </div>
                        <div className='content-right'>
                            <div className='up'>
                                {language === LANGUAGES.VI ? nameVi : nameEn}
                            </div>
                            <div className='down'>
                                {detailDoctor.markdown && detailDoctor.markdown.description
                                    && <span>
                                        {detailDoctor.markdown.description}
                                    </span>
                                }
                            </div>
                        </div>
                    </div>
                    <div className='schedule-doctor'>
                        <div className='content-left'>
                            <DoctorSchedule
                                doctorIdFromParent={detailDoctor && detailDoctor.id ? detailDoctor.id : -1}
                            />
                        </div>
                        <div className='content-right'>

                        </div>
                    </div>
                    <div className='detail-info-doctor'>
                        {detailDoctor.markdown && detailDoctor.markdown.contentHTML
                            &&
                            < div dangerouslySetInnerHTML={{
                                __html: detailDoctor.markdown.contentHTML
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
