import * as ReactModal from "react-modal";

ReactModal.setAppElement("body");

// modal styles needed for clean modal
const style = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    background: "transparent",
    border: "none",
  },
  overlay: {
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    background: "rgba(0, 0, 0, 0.50)",
  },
};

export function Modal({ isOpen, setIsOpen, children }) {
  return (
    <ReactModal
      isOpen={isOpen}
      style={style}
      onRequestClose={() => setIsOpen()}
      contentLabel="login"
    >
      {children}
    </ReactModal>
  );
}
