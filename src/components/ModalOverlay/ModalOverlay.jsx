import React, { useEffect } from "react";
import modalOverlayStyles from './modal-overlay.module.css';
import propTypes from 'prop-types';

function ModalOverlay({close}) {  
  useEffect(() => {
    const closeESC = (e) => {
      if (e.key === 'Escape') {
          close(e);
      }
    }
    document.addEventListener('keydown', closeESC);
    return () => {
      document.removeEventListener('keydown', closeESC);
    }
  }, []);

  return (
    <div onClick={close} className={modalOverlayStyles.container}></div>
  );
}

ModalOverlay.propTypes = {
  close: propTypes.func.isRequired,
};

export default ModalOverlay;