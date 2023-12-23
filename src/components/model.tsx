import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef } from "react";

type props = {
  isOpen: boolean;

  onClose: (value: boolean) => void;
  children: React.ReactElement[];
  closeModal: () => void;
};

function Modal({ isOpen, onClose, closeModal, children }: props) {
  const panelRef = useRef<HTMLDivElement>(null);

  function mouseleave() {
    closeModal();
  }

  useEffect(() => {}, []);

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
                afterEnter={() => {
                  panelRef.current?.addEventListener("mouseleave", mouseleave);
                }}
                afterLeave={() => {
                  panelRef.current?.removeEventListener(
                    "mouseleave",
                    mouseleave,
                  );
                }}
              >
                <Dialog.Panel
                  ref={panelRef}
                  className="w-full max-w-md transform overflow-hidden rounded-2xl bg-black p-6 text-left align-middle text-white shadow-xl transition-all"
                >
                  {children}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export default Modal;
