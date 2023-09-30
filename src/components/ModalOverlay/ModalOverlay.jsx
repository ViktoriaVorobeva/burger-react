import React, { useEffect } from "react";
import modalOverlayStyles from './modal-overlay.module.css';
import propTypes from 'prop-types';

function ModalOverlay({close}) {
  const checkKey = (key) => {
    return key === 27;
  }
  
  const closeESC = (e) => {
    if (checkKey(e.keyCode)) {
        close(e);
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', closeESC);
    document.addEventListener('click', close);
    return () => {
      document.removeEventListener('keydown', closeESC);
      document.removeEventListener('click', close);
    }
  }, []);

  return (
    <div className={modalOverlayStyles.container}></div>
  );
}

ModalOverlay.propTypes = {
  close: propTypes.func.isRequired,
};

export default ModalOverlay;