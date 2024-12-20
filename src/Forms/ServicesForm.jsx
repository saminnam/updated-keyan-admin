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
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Loader from "../Components/Loader";

const ServicesForm = () => {
  const [loading, setLoading] = useState(false);
  const [errorPopup, setErrorPopup] = useState(false);
  const [successPopup, setSuccessPopup] = useState(false);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const { title, description, editingItem } = useSelector(
    (state) => state.servicesInfo
  );

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = () => {
    setLoading(true);
    setErrorPopup(false);
    axios
      .get(`${API_BASE_URL}services`)
      .then((response) => {
        dispatch(addService(response.data));
        setLoading(false);
      })
      .catch((error) => {
        console.log("Failed to fetch services", error);
        setErrorPopup(true);
        setLoading(false);
      });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = "Please enter the title";
    if (!description.trim())
      newErrors.description = "Please enter the description";
    return newErrors;
  };

  const handleTitleChange = (value) => {
    if (/^[a-zA-Z\s]*$/.test(value)) {
      dispatch(setTitle(value));
      setErrors((prev) => ({ ...prev, title: "" }));
    } else {
      setErrors((prev) => ({
        ...prev,
        title: "Please enter the valid title",
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
    setLoading(true);
    setSuccessPopup(false);
    setErrorPopup(false);
    const request = editingItem
      ? axios.put(`${API_BASE_URL}services/${editingItem._id}`, formDataObj)
      : axios.post(`${API_BASE_URL}services`, formDataObj);

    request
      .then(() => {
        fetchServices();
        dispatch(resetForm());
        dispatch(setEditingItem(null));
        setSuccessPopup(true);
      })
      .catch((error) => {
        setErrorPopup(true);
        console.log("Failed to save the service. Please try again.", error);
      })
      .finnaly(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      {loading && loading ? (
        <div className="flex justify-center items-center h-[90vh]">
          <Loader />
        </div>
      ) : (
        <div className="mt-5 mx-10">
          <h2 className="text-2xl font-bold md:text-3xl font-serif mb-5">
            Add Services
          </h2>
          <div className="flex justify-between flex-wrap gap-5">
            <div className="w-[400px] lg:w-[640px]">
              <div className="mb-4 p-5 rounded-lg border space-y-3">
                <label className="block text-base font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  placeholder="Title"
                  name="title"
                  value={title}
                  onChange={(e) =>
                    handleTitleChange(e.target.value.toUpperCase())
                  }
                  className="border focus:outline-[#2986FE] w-full border-gray-300 rounded px-4 py-2 mr-2"
                />
                {errors.title && (
                  <p className="text-red-500 text-sm">{errors.title}</p>
                )}
                <label className="block text-base font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  type="text"
                  placeholder="Description"
                  name="description"
                  rows={3}
                  value={description}
                  onChange={(e) => handleDescriptionChange(e.target.value)}
                  className="border focus:outline-[#2986FE] w-full border-gray-300 rounded px-4 py-2 mr-2"
                ></textarea>

                {errors.description && (
                  <p className="text-red-500 text-sm">{errors.description}</p>
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
          </div>
        </div>
      )}
      {successPopup && <SuccessPopUp />}
      {errorPopup && <ErrorPopUp />}
    </div>
  );
};

export default ServicesForm;
