import { createPortal } from "react-dom";
import { AiOutlineClose } from "react-icons/ai";

const Modal = ({ open , close , children}) => {
  return createPortal(
    <>
      {open && (
        <>
          <div
          className="m-auto relative z-50 min-h-[200px] max-w-[80%] bg-white p-4">
            <div className="flex justify-end">
                <AiOutlineClose onClick={close} className="self-end text-2xl" />
            </div>
            {children}
          </div>
          <div onClick={close} className="absolute top-0 z-40 h-screen w-screen backdrop-blur" />
        </>
      )}
    </>
    ,document.getElementById("modal-root")
);
};

export default Modal;