import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import GetCanvasTemplate from './GetCanvasTemplate/GetCanvasTemplate';

const RightMain = () => {
    return (
      <>
        <GetCanvasTemplate placement='end' name='end' />
      </>
    );
  }
  
  export default RightMain;
  