import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import ApiServices from "meet-hour-react-web-sdk";

export default function Modal(props: any) {
  const [open, setOpen] = useState(true);

  const cancelButtonRef = useRef(null);

  const joinMeeting = async () => {
    const body = {
      meeting_id: props.popupFields.meeting_id,
    };
    const response = await ApiServices.generateJwt(localStorage.getItem("accessToken") || "",body);
    localStorage.setItem(
      "meetingToken",
      response.jwt
    );
    window.location.pathname = "/join-meeting";
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="p-8 grid gap-2">
                    <div className="h-14 flex justify-center items-center w-full rounded-lg bg-green-100 text-green-600">Your meeting has been created successfully!</div>
                  <div className="font-semibold text-gray-600">Meeting id: <span className="font-normal text-gray-700">{props.popupFields.meeting_id}</span></div>
                  <div className="font-semibold text-gray-600">Meeting passcode: <span className="font-normal text-gray-700">{props.popupFields.passcode}</span></div>
                  <div className="font-semibold text-gray-600">Meeting URL: <span className="font-normal text-gray-700">{props.popupFields.joinURL}</span></div>
                  <div className="flex justify-center"><button className="bg-emerald-600 font-semibold px-4 py-2 mt-1 text-white rounded-md" onClick={joinMeeting}>Join Meeting</button></div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
