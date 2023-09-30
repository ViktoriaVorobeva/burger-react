import React from "react";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import ReactDOM, { createPortal } from "react-dom";
import modalStyles from "./modal.module.css";
import propTypes from 'prop-types';

const modalRoot = document.getElementById("react-modals");

function Modal({ children, title, getClose, isOpen }) {
  return ReactDOM.createPortal(
    <>
      {isOpen && (
        <>
          <div className={modalStyles.modal}>
            <div className={modalStyles.title}>
              {title && (
                <p className="text text_type_main-large">Детали ингридиента</p>
              )}
            </div>
            <div className={modalStyles.button}>
              <CloseIcon onClick={getClose} type="primary" />
            </div>
            {children}
          </div>
          <ModalOverlay close={getClose} />
        </>
      )}
    </>,
    modalRoot
  );
}

Modal.propTypes = {
  children: propTypes.element.isRequired,
  title: propTypes.bool.isRequired,
  getClose: propTypes.func.isRequired,
  isOpen: propTypes.bool.isRequired
};

export default Modal;
