import React, {useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import CloseButton from 'react-bootstrap/CloseButton';
import { open } from '@tauri-apps/api/dialog';
import { closeFile, fileAction } from '../assets/js/fileActions';

export default function FileModal({ show, setShow, setShowFileAction, setFileId, getOpenFiles }) {

    const handleClose = () => setShow(false);

    const newFile = (id, path) => {
        return (
            <Nav.Item id={id} className="btn-secondary">
                <Nav.Link eventKey={path}>{id}</Nav.Link>
            </Nav.Item>
        )
    }

    const openFile = async () => {
        const selectedPath = await open({
            multiple: false,
            title: "Select file"
        });

        if(!selectedPath) return;

        console.log(selectedPath);
        setShow(false);
        const btn = document.createElement('button');
        btn.className= "btn-secondary btn";
        const rexString = "\\"
        let btnText = JSON.stringify(selectedPath);
        btnText = btnText.split(rexString);
        btnText = btnText[btnText.length - 1];
        btnText = btnText.split('"')[0];
        btn.id = btnText;
        btn.innerHTML = btnText;
        let fileType = btnText.split('.')[1];
        fileAction(btn, 700, setShowFileAction, setFileId);

        let newOpenedFiles = [];

        if(newOpenedFiles.length < 1) {
            newOpenedFiles = [...getOpenFiles];
        }
        newOpenedFiles.push({ id: btn.id, path: selectedPath, fileType: fileType });

        const tabBar = document.getElementById('tab-bar');
        tabBar.appendChild(btn);
        
        console.log(newOpenedFiles);
        if(localStorage.getItem('OpenFileTabs')) {
            localStorage.removeItem('OpenFileTabs')
        }
        localStorage.setItem('OpenFileTabs', JSON.stringify(newOpenedFiles));
    };

    const openFolder = async () => {
        const selectedPath = await open({
            multiple: false,
            title: "Select folder",
            directory: true,
        });

        if(!selectedPath) return;

        console.log(selectedPath);
        setShow(false);
    }

    const close = () => {
        setShow(false);
    };

    return (
        <>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header className='bg-dark text-light'>
                <Modal.Title>
                  File
                </Modal.Title>
                <CloseButton className="bg-light" onClick={close}/>
              </Modal.Header>
              <div className='modal-body bg-secondary'>
                  <ul className='nav flex-column justify-content-between align-items-center'>
                      <li className='nav-item'>
                          <button className='btn btn-dark' onClick={openFile}>Open File</button>
                      </li>
                      <li className='nav-item'>
                          <button className='btn btn-dark' onClick={openFolder}>Open Folder</button>
                      </li>
                  </ul>
              </div>
            </Modal>
        </>
    )
}