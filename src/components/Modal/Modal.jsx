import React from "react";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import ReactDOM, { createPortal } from "react-dom";
import modalStyles from "./modal.module.css";
import propTypes from 'prop-types';
import { useNavigate} from "react-router-dom";

const modalRoot = document.getElementById("react-modals");

function Modal({ children, title, onClose }) {
  let navigate = useNavigate();

  const closeModal = () => {
    onClose ? onClose() : navigate('/');
};

  React.useEffect(() => {
    const closeByEsc = ((e) => {
      if (e.key === 'Escape') {
        closeModal()
      }
    });
    document.addEventListener('keydown', closeByEsc);
    return () => document.removeEventListener('keydown', closeByEsc)
  }, [closeModal]);

  return ReactDOM.createPortal(
        <>
          <div className={modalStyles.modal}>
            <div className={modalStyles.title}>
              {title && (
                <p className="text text_type_main-large">{title}</p>
              )}
            </div>
            <div className={modalStyles.button}>
              <CloseIcon onClick={closeModal} type="primary" />
            </div>
            {children}
          </div>
          <ModalOverlay close={closeModal} />
        </>,
    modalRoot
  );
}

Modal.propTypes = {
  children: propTypes.element.isRequired,
  title: propTypes.string,
};

export default Modal;
