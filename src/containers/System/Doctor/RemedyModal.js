import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './RemedyModal.scss';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import _ from 'lodash';
import { Toast } from 'react-toastify';
import * as actions from '../../../store/actions'
import { CommonUtils } from '../../../utils';

class RemedyModal extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            imageBase64: '',
        }
    }

    async componentDidMount() {
        if (this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email
            })
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.dataModal !== prevProps.dataModal) {
            this.setState({
                email: this.props.dataModal.email
            })
        }

    }

    handleOnChangeEmail = async (event) => {
        this.setState({
            email: event.target.value
        })
    }

    handleOnChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            this.setState({
                imageBase64: base64,
            })
        }
    }

    handleSendRemedy = () => {
        this.props.sendRemedy(this.state);
        this.props.closeRemedyModal();
    }

    render() {
        let { isOpenModal, closeRemedyModal } = this.props;
        let { email } = this.state;
        return (
            <Modal
                isOpen={isOpenModal}
                // toggle={ }
                className={'booking-modal-container'}
                size="lg"
                centered
            >
                <div>
                    <div class="modal-header">
                        <h5 class="modal-title">Gửi hóa đơn đến bệnh nhân</h5>
                        <button type="button" class="close" aria-label="Close" onClick={closeRemedyModal}>
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <ModalBody>
                        <div className='row'>
                            <div className='col-6 form-group'>
                                <label>Email bệnh nhân</label>
                                <input className='form-control' type='email' value={email}
                                    onChange={(event) => this.handleOnChangeEmail(event)}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label>File hóa đơn</label>
                                <input className='form-control-file' type='file'
                                    onChange={(event) => this.handleOnChangeImage(event)}
                                />
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary"
                            onClick={() => this.handleSendRemedy()}
                        >Send</Button>
                        <Button color="secondary" onClick={closeRemedyModal}>Cancel</Button>
                    </ModalFooter>
                </div>
            </Modal >
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
        getGenders: () => dispatch(actions.fetchGenderStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
