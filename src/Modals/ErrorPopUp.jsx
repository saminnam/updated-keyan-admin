import { IoClose } from "react-icons/io5";
import { useState } from "react";

const ErrorPopUp = () => {
  const [popupVisible, setPopupVisible] = useState(false);
  const togglePopup = () => {
    setPopupVisible(!popupVisible);
  };
  return (
    <div>
      {!popupVisible && (
        <div className="flex justify-center items-center fixed inset-0 bg-black bg-opacity-50  z-10 w-full">
          <div className="border flex flex-col  top-10 gap-10 mx-auto bg-white shadow-[#dc3545] shadow-md p-5 w-[350px] rounded-lg">
            <div className="flex justify-center">
              <IoClose className="p-4 shadow-md shadow-[#dc3545] border rounded-full text-9xl text-[#dc3545]" />
            </div>
            <div>
              <h3 className="text-center text-2xl font-bold font-serif mb-2">
                Something went wrong!
              </h3>
              <p className="text-center text-gray-600">
                Seems like you missed something please check it.
              </p>
            </div>
            <hr />
            <button
              className="border border-[#dc3545] p-3 rounded-md bg-[#dc3545] text-white hover:bg-white transition-all duration-300 hover:text-[#dc3545]"
              onClick={togglePopup}
            >
              GO BACK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ErrorPopUp;
