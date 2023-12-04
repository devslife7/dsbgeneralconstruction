/*
  Dependencies:
    npm install @headlessui/react
    npm install react-icons
*/

import { CloseSVG } from "@/public/svgs"
import { Dialog, Transition } from "@headlessui/react"
import { Fragment } from "react"

type Props = {
    closeModal: () => void
    isModalOpen: boolean
    title?: string
    children?: React.ReactNode
}

export function Modal({
    closeModal,
    isModalOpen,
    title = "Title",
    children = <div>Modal Content</div>,
}: Props) {
    return (
        <Transition appear show={isModalOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-full p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white rounded-lg shadow-xl">
                                <Dialog.Title className="flex justify-between mb-8 text-2xl font-medium leading-6 text-center text-gray-900">
                                    {title}
                                    <CloseSVG
                                        className="text-gray-500 rounded-md text-1xl hover:bg-gray-100 hover:cursor-pointer hover:text-red-500"
                                        onClick={closeModal}
                                    />
                                </Dialog.Title>

                                {children}
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}
