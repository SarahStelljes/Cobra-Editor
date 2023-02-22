import React, { useState, useEffect } from 'react';
import { fs } from '@tauri-apps/api/fs';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Modal from 'react-bootstrap/Modal';
import CloseButton from 'react-bootstrap/CloseButton';

// import TopNav from './components/TopNav';
// import FileModal from './components/FileModal';

import './App.css';
import './assets/bootstrap-5.3.0-alpha1-dist/bootstrap-5.3.0-alpha1-dist/css/bootstrap.css';
// import FileActionModal from './components/FileActionModal';
import Button from 'react-bootstrap/esm/Button';
import { open, ask } from '@tauri-apps/api/dialog';

function App() {
  const [show, setShow] = useState(false);
  const [showFileAction, setShowFileAction] = useState(false);
  const [filePath, setFilePath] = useState('');
  const [fileId, setFileId] = useState('');
  const [fileOpened, setFileOpened] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);
  const [openedFiles, setOpenedFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState('');

  let openFiles = localStorage.getItem('OpenFileTabs');
  let getOpenFiles = [];
        
  if(openFiles) {
    getOpenFiles = [...JSON.parse(openFiles)];
  }
  
  let tA;
  
  let t;

  const fileAction = (e) => {
    e = e || window.event;
    const target = e.target.attributes || e.srcElement;
    const path = target.path.value;
    const id = target.id.value;

    let start = 700;
    console.log("id is:");
    console.log(id);
    console.log(`clicked:`);
    console.log(path);

    // let repeatable = true;
    let repeat = () => {
      console.log(start);
      if(start < 1) {
        // repeatable = false;
        setShowFileAction(true);
        clearTimeout(t);
        start = 700;
        setFilePath(path);
        setFileId(id);
      } else {
        t = setTimeout(repeat, start);
        start = start / 2;
      }
    }

    repeat();

  }

  const clearFileActionTimeout = () => clearTimeout(t);

  const onPageLoad = () => {
    getOpenFiles.forEach(() => {
      setFileOpened(true);
      console.log('file supposed to open');
    })
    clearTimeout(tA);
  }

  const defaultKey = () => {
    if(openFiles) {
      if(getOpenFiles.length > 0) {
        return getOpenFiles[0].id;
      }
      return null;
    }
  }

  useEffect(() => {
    setOpenedFiles(getOpenFiles);
  }, [])

  // File Modal
  const handleShow = () => setShow(true);

  const close = () => setShow(false);

  const openFile = async () => {
    const selectedPath = await open({
      multiple: false,
      title: 'Select File'
    });

    if(!selectedPath) return;

    setShow(false);
    let btnId = JSON.stringify(selectedPath);
    btnId = btnId.split("\\");
    btnId = btnId[btnId.length - 1];
    btnId = btnId.split('"')[0];
    let fileType = btnId.split('.')[1];
    
    setFileOpened(true);
    const fileObj = { id: btnId, path: selectedPath, fileType: fileType }
    getOpenFiles.push(fileObj);

    if(openFiles) {
      localStorage.removeItem('OpenFileTabs');
    }

    localStorage.setItem('OpenFileTabs', JSON.stringify(getOpenFiles));
  }

  const handleClose = () => setShow(false);

  const openFolder = async () => {
    const selectedPath = await open({
      multiple: false,
      title: 'Select folder',
      directory: true
    });

    if(!selectedPath) return;

    console.log(selectedPath);
    setShow(false);
  }

  // File Action Modal
  const handleActionClose = () => setShowFileAction(false);

  const closeFile = () => {
    ask("Are you sure you want to close this file?").then(result => {
      if(result) {
        // get the element tab-nav
        const tabNav = document.getElementById('tab-nav');

        // get the tab's id based on the file's id (might be able to reduce code?)
        const tabId = document.getElementById(fileId).parentElement.id;
        
        // get the tab itself based on tabId
        const tab = document.getElementById(tabId);

        // remove tab from tab-nav
        tabNav.removeChild(tab);


        // close file action modal
        setShowFileAction(false);
      } else {
        return;
      }
    })
  }

  return (
    <div className="App w-100 h-100 bg-dark">
      <Tab.Container defaultActiveKey={defaultKey}>
        <Col>
          <Row>
            <Nav varient="pills" id="tab-nav">
              <Nav.Item id="File-NavItem">
                <Button className="btn-light" id="FileBTN" onClick={handleShow}>File</Button>
              </Nav.Item>
              {openedFiles.map(file => (
                <Nav.Item key={file.id} id={file.path} className="bg-secondary" >
                  <Nav.Link className="text-light" eventKey={file.path} onMouseDown={fileAction} onMouseUp={clearFileActionTimeout} path={file.path} >{file.id}</Nav.Link>
                </Nav.Item>
              ))}
            </Nav>
          </Row>
          <Row>
            <Tab.Content id="tab-content">
            </Tab.Content>
          </Row>
        </Col>
      </Tab.Container>


      <Modal show={show} onHide={handleClose}>
        <Modal.Header className='bg-dark text-light'>
          <Modal.Title>
            File
          </Modal.Title>
          <CloseButton className='bg-light' onClick={close} />
        </Modal.Header>
        <Nav>
          <Nav.Item id="open-file">
            <Button className='btn-dark' onClick={openFile}>
              Open File
            </Button>
          </Nav.Item>
          <Nav.Item id="open-folder">
            <Button className='btn-dark' onClick={openFolder}>
              Open Folder
            </Button>
          </Nav.Item>
        </Nav>
      </Modal>

      <Modal show={showFileAction} onHide={handleActionClose}>
        <Modal.Header className='bg-dark text-light'>
          <Modal.Title>
            File Action
          </Modal.Title>
          <CloseButton className='bg-light' onClick={handleActionClose} />
        </Modal.Header>
        <Nav className='flex-column'>
          <Nav.Item id="close-file">
            <Button className="btn-dark" onClick={closeFile}>
              Close File
            </Button>
          </Nav.Item>
        </Nav>
      </Modal>
      {/* <TopNav setShow={setShow} setSelectedFile={setSelectedFile} />
      
      <FileContentPage selectedFile={selectedFile} /> */}

      {/* <FileModal show={show} setShow={setShow} setShowFileAction={setShowFileAction} setFileId={setFileId} getOpenFiles={getOpenFiles} />

      <FileActionModal setShowFileAction={setShowFileAction} showFileAction={showFileAction} setFileId={setFileId} fileId={fileId} /> */}
    </div>
  );
}

export default App;
