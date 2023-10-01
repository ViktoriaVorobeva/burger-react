import React from "react";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import ReactDOM, { createPortal } from "react-dom";
import modalStyles from "./modal.module.css";
import propTypes from 'prop-types';

const modalRoot = document.getElementById("react-modals");

function Modal({ children, title, getClose }) {
  return ReactDOM.createPortal(
        <>
          <div className={modalStyles.modal}>
            <div className={modalStyles.title}>
              {title && (
                <p className="text text_type_main-large">{title}</p>
              )}
            </div>
            <div className={modalStyles.button}>
              <CloseIcon onClick={getClose} type="primary" />
            </div>
            {children}
          </div>
          <ModalOverlay close={getClose} />
        </>,
    modalRoot
  );
}

Modal.propTypes = {
  children: propTypes.element.isRequired,
  title: propTypes.string,
  getClose: propTypes.func.isRequired,
};

export default Modal;
