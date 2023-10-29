import React from "react";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import ReactDOM, { createPortal } from "react-dom";
import modalStyles from "./modal.module.css";
import propTypes from 'prop-types';
import { useNavigate } from "react-router-dom";

const modalRoot = document.getElementById("react-modals");

function Modal({ children, title }) {
  let navigate = useNavigate();
  function onDismiss() {
    navigate(-1);
  }

  React.useEffect(() => {
    const closeByEsc = ((e) => {
      if (e.key === 'Escape') {
        onDismiss()
      }
    });
    document.addEventListener('keydown', closeByEsc);
    return () => document.removeEventListener('keydown', closeByEsc)
  }, [onDismiss]);
  return ReactDOM.createPortal(
        <>
          <div className={modalStyles.modal}>
            <div className={modalStyles.title}>
              {title && (
                <p className="text text_type_main-large">{title}</p>
              )}
            </div>
            <div className={modalStyles.button}>
              <CloseIcon onClick={onDismiss} type="primary" />
            </div>
            {children}
          </div>
          <ModalOverlay close={onDismiss} />
        </>,
    modalRoot
  );
}

Modal.propTypes = {
  children: propTypes.element.isRequired,
  title: propTypes.string,
};

export default Modal;
