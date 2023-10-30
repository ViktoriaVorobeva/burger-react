import React from "react";
import modalOverlayStyles from './modal-overlay.module.css';
import propTypes from 'prop-types';

function ModalOverlay({close}) {  
  return (
    <div onClick={close} className={modalOverlayStyles.container}></div>
  );
}

ModalOverlay.propTypes = {
  close: propTypes.func.isRequired,
};

export default ModalOverlay;