import { HiOutlinePencilSquare } from "react-icons/hi2";
import { setPopUpVisible } from "../Redux/Actions/CommonActions";
import { useDispatch, useSelector } from "react-redux";

const EditPopUp = () => {
  const dispatch = useDispatch();
  const { popUpVisible } = useSelector((state) => state.commonInfo);
  const togglePopup = () => {
    dispatch(setPopUpVisible(!popUpVisible));
  };
  return (
    <div>
      {!popUpVisible && (
        <div className="flex justify-center items-center fixed inset-0 bg-black bg-opacity-50 z-10 w-full">
          <div className="border top-10 flex justify-center items-center flex-col p-8 rounded-lg bg-white w-[400px]">
            <div className="p-5 rounded-full mb-3 shadow-inner shadow-[#2986FE]">
              <HiOutlinePencilSquare className="text-8xl text-[#2986FE] rounded-2xl" />
            </div>
            <h2 className="text-xl font-bold mb-3">
              You are about to edit the data
            </h2>
            <h2 className="text-xl text-gray-500 mb-3 text-center">
              Your data has been sent to the form you can edit and update there.
            </h2>
            <div className="flex justify-end items-center gap-5 mt-2 ">
              <button
                className="px-5 py-2 border rounded-lg text-white shadow-sm transition-all duration-300 hover:text-[#2986FE] hover:bg-white border-[#2986FE] bg-[#2986FE]"
                onClick={togglePopup}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditPopUp;
