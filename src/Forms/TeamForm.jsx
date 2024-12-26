import { useEffect, useState } from "react";
import { API_BASE_URL } from "../Components/Api";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { RxCross2 } from "react-icons/rx";
import {
  addPerson,
  addPersonRole,
  setEditingItem,
  setImage,
  setPersonName,
  resetForm,
} from "../Redux/Actions/TeamsActions";
import { setError } from "../Redux/Actions/CommonActions";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import SuccessPopUp from "../Modals/SuccessPopUp";
import ErrorPopUp from "../Modals/ErrorPopUp";
import Loader from "../Components/Loader";

const TeamForm = () => {
  const [loading, setLoading] = useState(false);
  const [errorPopup, setErrorPopup] = useState(false);
  const [errors, setErrors] = useState({});
  const [successPopup, setSuccessPopup] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const dispatch = useDispatch();
  const { editingItem, name, role } = useSelector(
    (state) => state.teamMembersInfo
  );

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = () => {
    setLoading(true);
    dispatch(setError(null));
    axios
      .get(`${API_BASE_URL}team`)
      .then((response) => {
        dispatch(addPerson(response.data));
        setLoading(false);
        setErrorPopup(false);
      })
      .catch((error) => {
        console.error("Error fetching team members:", error.message);
        setErrorPopup(true);
      });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Please enter the name";
    if (!role.trim()) newErrors.role = "Please enter the role";
    const fileInput = document.querySelector("input[type='file']");
    const file = fileInput?.files[0];
    if (!file) newErrors.image = "Please upload an image";
    return newErrors;
  };

  const handleNameChange = (value) => {
    if (/^[a-zA-Z\s]*$/.test(value)) {
      dispatch(setPersonName(value));
      setErrors((prev) => ({ ...prev, name: "" }));
    } else {
      setErrors((prev) => ({
        ...prev,
        name: "Please enter the valid name",
      }));
    }
  };

  const handleRoleChange = (value) => {
    if (/^[a-zA-Z\s]*$/.test(value)) {
      dispatch(addPersonRole(value));
      setErrors((prev) => ({ ...prev, role: "" }));
    } else {
      setErrors((prev) => ({
        ...prev,
        role: "Please enter the valid role",
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validImageTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/webp",
      ];
      if (!validImageTypes.includes(file.type)) {
        setErrors((prev) => ({
          ...prev,
          image: "Please upload a valid image file (JPEG, PNG, GIF, or WEBP).",
        }));
        e.target.value = ""; 
        return;
      }

      if (file.size > 2 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          image: "The image size exceeds the 2MB limit",
        }));
        return;
      }

      dispatch(setImage(file));
      setErrors((prev) => ({ ...prev, image: "" }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = async () => {
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    const formData = new FormData();
    formData.append("Name", name.toUpperCase());
    formData.append("Role", role);
    const fileInput = document.querySelector("input[type='file']");
    if (fileInput && fileInput.files[0]) {
      formData.append("image", fileInput.files[0]);
    }

    try {
      if (editingItem) {
        await axios.put(`${API_BASE_URL}team/${editingItem._id}`, formData);
      } else {
        await axios.post(`${API_BASE_URL}team`, formData);
      }
      fetchTeamMembers();
      dispatch(resetForm());
      dispatch(setEditingItem(null));
      setImagePreview(null);
    } catch (err) {
      console.error("Error submitting team:", err.message);
      setErrorPopup(true);
    }
    setSuccessPopup(true);
  };

  const handleRemoveImage = () => {
    dispatch(setImage(null));
    setImagePreview(null);
    const fileInput = document.querySelector("input[type='file']");
    if (fileInput) {
      fileInput.value = "";
    }
  };

  return (
    <>
      {loading && loading ? (
        <div className="flex justify-center items-center h-[90vh]">
          <Loader />
        </div>
      ) : (
        <div className="mx-10 mt-5">
          <h2 className="text-2xl font-bold md:text-3xl font-serif mb-5">
            Add Teams
          </h2>
          <div className="flex justify-between flex-wrap gap-5">
            <div className="w-[400px] lg:w-[640px] border p-5 rounded-lg">
              <div className="mb-4 space-y-3">
                <label className="block text-base font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="Name"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  className="border focus:outline-[#2986FE] rounded w-full py-2 px-3"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name}</p>
                )}
                <label className="block text-base font-medium text-gray-700">
                  Role
                </label>
                <input
                  type="text"
                  name="Role"
                  placeholder="Role"
                  value={role}
                  onChange={(e) => handleRoleChange(e.target.value)}
                  className="border focus:outline-[#2986FE] rounded w-full py-2 px-3"
                />
                {errors.role && (
                  <p className="text-red-500 text-sm">{errors.role}</p>
                )}
                <div className="flex gap-5 items-center">
                  <input
                    type="file"
                    name="image"
                    onChange={handleFileChange}
                    accept="image/jpeg, image/png, image/gif, image/webp"
                    className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100"
                    required={!editingItem}
                  />
                  {imagePreview && (
                    <div className="mb-2">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-24 h-24 object-cover rounded-full"
                      />
                    </div>
                  )}
                  <RxCross2
                    className="cursor-pointer text-2xl"
                    onClick={handleRemoveImage}
                  />
                </div>
              </div>
              {errors.image && (
                <p className="text-red-500 text-sm">{errors.image}</p>
              )}

              <button
                type="submit"
                onClick={handleFormSubmit}
                className="bg-blue-500 text-xs font-medium uppercase tracking-tight mt-2 text-white px-4 py-3 rounded-md w-full hover:bg-transparent hover:text-blue-500 border border-blue-500 duration-300"
              >
                {editingItem ? "Update Team Member" : "Add Team Member"}
              </button>
            </div>
          </div>
          {successPopup && <SuccessPopUp />}
          {errorPopup && <ErrorPopUp />}
        </div>
      )}
    </>
  );
};

export default TeamForm;
