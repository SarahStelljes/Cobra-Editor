import Modal from 'react-bootstrap/Modal';
import CloseButton from 'react-bootstrap/CloseButton';
import { closeFile } from "../assets/js/fileActions";

export default function FileActionModal({ setShowFileAction, showFileAction, setFileId, fileId }) {
    const handleActionClose = () => setShowFileAction(false);

    const closeFileAction = () => {
        setShowFileAction(false);
    }
    
    const fileClose = () => {
        closeFile(setShowFileAction, setFileId, fileId);
    }

    return (
        <Modal show={showFileAction} onHide={handleActionClose}>
        <Modal.Header className='bg-dark text-light'>
            <Modal.Title>
                File Action
            </Modal.Title>
            <CloseButton className='bg-light' onClick={closeFileAction} />
        </Modal.Header>
        <div className='modal-body justify-content-center align-items-center'>
            <ul className='flex-column justify-content-between align-items-center'>
                <li className='nav-item'>
                    <button className='btn btn-dark' onClick={fileClose}>Close File</button>
                </li>
            </ul>
        </div>
        </Modal>
    )
}