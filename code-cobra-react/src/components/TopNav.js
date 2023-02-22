import React, {useEffect} from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { fileAction, closeFile } from '../assets/js/fileActions';
import TabNav from './TabNav';

export default function TopNav({ setShow, getFileText }) {
    const handleShow = () => setShow(true);
    return (
        <>
            <Navbar bg="dark" id="tab-bar">
                <Button className="btn-light m-l-1" id="FileBTN" onClick={handleShow}>
                    File
                </Button>
            </Navbar>
        </>
    );
}