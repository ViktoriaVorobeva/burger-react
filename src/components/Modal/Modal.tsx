import React, { ReactNode } from "react";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import ReactDOM, { createPortal } from "react-dom";
import modalStyles from "./modal.module.css";
import propTypes from 'prop-types';
import { useNavigate} from "react-router-dom";

const modalRoot = document.getElementById("react-modals") as HTMLElement;

interface IModal {
  title?: string,
  onClose?: () => void,
}

const Modal = ({ children, title, onClose }: React.PropsWithChildren<IModal>) => {
  let navigate = useNavigate();

  const closeModal = () => {
    onClose ? onClose() : navigate('/');
};

  React.useEffect(() => {
    const closeByEsc = ((e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal()
      }
    });
    document.addEventListener('keydown', closeByEsc);
    return () => document.removeEventListener('keydown', closeByEsc)
  }, [closeModal]);

  return ReactDOM.createPortal(
        <>
          <div data-cy="modal" className={modalStyles.modal}>
            <div className={modalStyles.title}>
              {title && (
                <p className="text text_type_main-large">{title}</p>
              )}
            </div>
            <div data-cy="close-button" className={modalStyles.button}>
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
