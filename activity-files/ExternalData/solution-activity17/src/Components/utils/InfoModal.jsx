import { useLayoutEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'bootstrap';

const InfoModal = ({ closeModal, message }) => {
    const modalRef = useRef()
    
    const showModal = () => {
        const modalEle = modalRef.current
        const bsModal = new Modal(modalEle, {
            backdrop: 'static',
            keyboard: false
        })
        bsModal.show()
    }
    
    const hideModal = () => {
        const modalEle = modalRef.current
        const bsModal= Modal.getInstance(modalEle)
        bsModal.hide()
    }

    useLayoutEffect(() => {
        showModal()
    }, []);
    
    return (
        <div>
            <div className="modal fade" ref={modalRef} tabIndex="-1" role="alertdialog" aria-modal="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Todo App Info</h5>
                            <button type="button" className="btn-close" onClick={() => { hideModal(); closeModal(); }} aria-label="Close"></button>
                        </div>
                        <div className="modal-body text-danger">
                            {message}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" onClick={() => { hideModal(); closeModal(); }}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

InfoModal.propTypes = {
    closeModal: PropTypes.func.isRequired,
    message: PropTypes.string.isRequired
}

export default InfoModal;
