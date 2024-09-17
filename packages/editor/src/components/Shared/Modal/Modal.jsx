import React from "react";
import ReactModal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "store/reducers/componentSlice";
import { AiFillCloseCircle } from "react-icons/ai";

const customStyles = {
  content: {
    top: "40%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "4px",
    overflowY: "auto",
    overflowX: "hidden",
    padding: "25px",
    background: "#fff",
    minWidth: "40%",
    maxHeight: "70%",
    boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.25);",
    color: "#757575",
    border: "1px solid rgba(100,100,100,0.6)",
  },
  overlay: {
    background: "rgba(0,0,0,0.4)",
    zIndex: "6",
  },
};
const closeButtonWrapperStyle = {
  position: "absolute",
  top: "4px",
  right: "4px",
  cursor: "pointer",
};
const childrenStyle = {
  marginTop: "10px",
};
ReactModal.setAppElement("#root");

export default function Modal() {
  const modal = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(setModal(false));
  };
  return (
    <ReactModal
      isOpen={!!modal}
      onRequestClose={closeModal}
      style={customStyles}
      shouldCloseOnEsc
      shouldCloseOnOverlayClick
    >
      <div style={closeButtonWrapperStyle} onClick={closeModal}>
        <AiFillCloseCircle style={{ fontSize: "3vh" }} />
      </div>
      <div style={childrenStyle}>{modal}</div>
    </ReactModal>
  );
}
