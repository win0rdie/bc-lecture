/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { createPortal } from "react-dom";
import css from "./Modal.module.css";

const modalElement = document.getElementById("modal");

const Modal = ({ onClose = () => {}, keyMap = {}, children }) => {
  const handleClose = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "Escape") {
        onClose();
        return;
      }
      if (Object.hasOwn(keyMap, e.code)) {
        const func = keyMap[e.code];
        func();
      }
    };

    document.body.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return createPortal(
    <div className={css.overlay} onClick={handleClose}>
      <div className={css.content}>{children}</div>
    </div>,
    modalElement
  );
};

export default Modal;

// import React, { Component } from 'react';
// import { createPortal } from 'react-dom';
// import css from './Modal.module.css';

// const modalElement = document.getElementById('modal');
// class Modal extends Component {
//   static defaultProps = {
//     onClose: () => {},
//     keyMap: {},
//   };
//   componentDidMount() {
//     document.body.addEventListener('keydown', this.handleKeyDown);
//   }

//   componentWillUnmount() {
//     document.body.removeEventListener('keydown', this.handleKeyDown);
//   }

//   handleKeyDown = event => {
//     if (event.code === 'Escape') {
//       this.props.onClose();
//       return;
//     }
//     if (Object.hasOwn(this.props.keyMap, event.code)) {
//       const func = this.props.keyMap[event.code];
//       func();
//     }
//   };

//   handleClose = event => {
//     if (event.target === event.currentTarget) {
//       this.props.onClose();
//     }
//   };

//   render() {
//     return createPortal(
//       <div className={css.overlay} onClick={this.handleClose}>
//         <div className={css.content}>{this.props.children}</div>
//       </div>,
//       modalElement
//     );
//   }
// }

// export default Modal;
