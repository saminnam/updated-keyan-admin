import { useEffect, useState } from "react";
import { API_BASE_URL } from "../Components/Api";
import SuccessPopUp from "../Modals/SuccessPopUp";
import ErrorPopUp from "../Modals/ErrorPopUp";
import {
  addService,
  setEditingItem,
  setTitle,
  setDescription,
  resetForm,
} from "../Redux/Actions/ServicesActions";
import {
  setLoading,
  setError,
  setSuccessPopUP,
  setShowImagePreview,
  setErrorPopUP,
} from "../Redux/Actions/CommonActions";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { FaRegEyeSlash } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";

const ServicesForm = () => {
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const { successPopUp, errorPopUp, showImagePreview } = useSelector(
    (state) => state.commonInfo
  );
  const { services, title, description, editingItem } = useSelector(
    (state) => state.servicesInfo
  );

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = () => {
    setLoading(true);
    setError(null);
    axios
      .get(`${API_BASE_URL}services`)
      .then((response) => {
        dispatch(addService(response.data));
      })
      .catch((error) => {
        console.log("Failed to fetch services", error);
        dispatch(setErrorPopUP(true));
      })
      .finally(() => {
        setLoading(false);
        dispatch(setErrorPopUP(false));
      });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = "Please enter the title.";
    if (!description.trim())
      newErrors.description = "Please enter the description.";
    return newErrors;
  };

  const handleTitleChange = (value) => {
    if (/^[a-zA-Z\s]*$/.test(value)) {
      dispatch(setTitle(value));
      setErrors((prev) => ({ ...prev, title: "" }));
    } else {
      setErrors((prev) => ({
        ...prev,
        title: "Please enter the valid title.",
      }));
    }
  };

  const handleDescriptionChange = (value) => {
    dispatch(setDescription(value));
  };

  const handleSubmit = () => {
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    const formDataObj = { title, description };

    const request = editingItem
      ? axios.put(`${API_BASE_URL}services/${editingItem._id}`, formDataObj)
      : axios.post(`${API_BASE_URL}services`, formDataObj);

    request
      .then(() => {
        fetchServices();
        dispatch(resetForm());
        dispatch(setEditingItem(null));
      })
      .catch((error) => {
        dispatch(setErrorPopUP(true));
        console.log("Failed to save the service. Please try again.", error);
      });
    dispatch(setSuccessPopUP(true));
  };

  return (
    <div className="mt-10">
      <div className="mx-10">
        <h2 className="text-2xl font-bold md:text-3xl font-serif mb-5">
          Add Services
        </h2>
        <div className="flex justify-between flex-wrap gap-5">
          <div className="w-[400px] lg:w-[640px]">
            <div className="mb-8 p-5 rounded-lg border flex flex-col space-y-4">
              <input
                type="text"
                name="title"
                placeholder="Service Title"
                value={title}
                onChange={(e) =>
                  handleTitleChange(e.target.value.toUpperCase())
                }
                className="border border-gray-300 rounded px-4 py-2 mr-2"
              />
              {errors.title && (
                <p className="text-red-500 text-xs">{errors.title}</p>
              )}
              <input
                type="text"
                name="description"
                placeholder="Service Description"
                value={description}
                onChange={(e) => handleDescriptionChange(e.target.value)}
                className="border border-gray-300 rounded px-4 py-2 mr-2"
              />
              {errors.description && (
                <p className="text-red-500 text-xs">{errors.description}</p>
              )}
              <button
                type="submit"
                className="bg-blue-500 text-xs font-medium uppercase tracking-tight text-white px-4 py-3 rounded-md w-full hover:bg-transparent hover:text-blue-500 border border-blue-500 duration-300"
                onClick={handleSubmit}
              >
                {editingItem ? "Update Service" : "Add Service"}
              </button>
            </div>
          </div>
          <div className="lg:w-[450px] rounded-lg">
            {services.length > 0 && (
              <div key={services[services.length - 1]._id}>
                <div className="border shadow-lg border-[#2986FE] rounded-lg  p-3 flex justify-between items-center">
                  <h2 className="font-medium uppercase tracking-tight text-xl">{`${
                    showImagePreview ? "Image Preview" : "Click To Preview"
                  }`}</h2>
                  <button
                    type="button"
                    onClick={() =>
                      dispatch(setShowImagePreview(!showImagePreview))
                    }
                  >
                    {showImagePreview ? (
                      <MdOutlineRemoveRedEye className="text-2xl text-[#2986FE]" />
                    ) : (
                      <FaRegEyeSlash className="text-2xl text-[#2986FE]" />
                    )}
                  </button>
                </div>

                {!showImagePreview ? null : (
                  <div className="mb-4 border p-4 mt-5">
                    <h2 className="font-bold text-center py-2">
                      {services[services.length - 1].title}
                    </h2>
                    <p className="text-justify">
                      {services[services.length - 1].description}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      {successPopUp && <SuccessPopUp />}
      {errorPopUp && <ErrorPopUp />}
    </div>
  );
};

export default ServicesForm;
