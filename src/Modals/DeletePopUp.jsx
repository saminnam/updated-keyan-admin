import { RiDeleteBin6Line } from "react-icons/ri";
import { useSelector } from "react-redux";

const DeletePopUp = ({ onConfirmDelete, onCancel }) => {
  const { popUpVisible } = useSelector((state) => state.commonInfo);

  return (
    popUpVisible && (
      <div className="flex justify-center items-center fixed inset-0 bg-black bg-opacity-50 z-10 w-full">
        <div className="border top-10 flex justify-center items-center flex-col p-8 rounded-lg bg-white">
          <div className="p-5 rounded-full shadow-inner shadow-red-500 mb-3">
            <RiDeleteBin6Line className="text-7xl text-red-500 rounded-2xl" />
          </div>
          <h2 className="text-xl font-bold mb-3">
            You are about to delete a data
          </h2>
          <h2 className="text-xl text-gray-500 mb-3">
            Are you sure you want to delete this data?
          </h2>
          <div className="flex justify-end items-center gap-5 mt-2">
            <button
              className="px-5 py-2 border rounded-lg shadow-sm hover:bg-red-500 transition-all duration-300 hover:text-white"
              onClick={onCancel}
            >
              No
            </button>
            <button
              className="px-5 py-2 border rounded-lg text-white shadow-sm transition-all duration-300 hover:text-red-500 hover:bg-white border-red-500 bg-red-500"
              onClick={onConfirmDelete}
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default DeletePopUp;
