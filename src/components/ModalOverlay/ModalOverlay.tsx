import React from "react";
import modalOverlayStyles from './modal-overlay.module.css';

type TModalOverlay = {
  close: () => void
}

const ModalOverlay:React.FC<TModalOverlay> = ({close}) => {  
  return (
    <div onClick={close} className={modalOverlayStyles.container}></div>
  );
}

export default ModalOverlay;