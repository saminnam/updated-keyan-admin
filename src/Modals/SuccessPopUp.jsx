import { useState } from "react";
import { TiTick } from "react-icons/ti";

const SuccessPopUp = () => {
  const [popupVisible, setPopupVisible] = useState(false);
  const togglePopup = () => {
    setPopupVisible(!popupVisible);
  };

  return (
    <div>
      {!popupVisible && (
        <div className="flex justify-center items-center fixed inset-0 bg-black bg-opacity-50 z-10 w-full">
          <div className="border top-10 flex flex-col gap-10 mx-auto bg-white shadow-[#28a745] shadow-md p-5 w-[350px] rounded-lg">
            <div className="flex justify-center">
              <TiTick className="p-4 shadow-md shadow-[#28a745] border rounded-full text-9xl text-[#28a745]" />
            </div>
            <div>
              <h3 className="text-center text-2xl font-bold font-serif mb-2">
                Yay, you're good to go!
              </h3>
              <p className="text-center text-gray-600">
                Your data has been saved successfully...
              </p>
            </div>
            <hr />
            <button
              onClick={togglePopup}
              className="border border-[#28a745] p-3 rounded-md bg-[#28a745] text-white hover:bg-white transition-all duration-300 hover:text-[#28a745]"
            >
              DONE
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuccessPopUp;
