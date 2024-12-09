import { useEffect, useState } from "react";
import { API_BASE_URL } from "../Components/Api";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { FaRegEyeSlash } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import {
  addPerson,
  addPersonRole,
  setEditingItem,
  setImage,
  setPersonName,
  resetForm,
} from "../Redux/Actions/TeamsActions";
import {
  setLoading,
  setError,
  setShowImagePreview,
  setSuccessPopUP,
  setErrorPopUP,
} from "../Redux/Actions/CommonActions";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import SuccessPopUp from "../Modals/SuccessPopUp";
import ErrorPopUp from "../Modals/ErrorPopUp";

const TeamForm = () => {
  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(null);
  const dispatch = useDispatch();
  const { teamMembers, editingItem, name, role } = useSelector(
    (state) => state.teamMembersInfo
  );
  const { error, loading, showImagePreview, successPopUp, errorPopUp } =
    useSelector((state) => state.commonInfo);

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = () => {
    setLoading(true);
    setError(null);
    axios
      .get(`${API_BASE_URL}team`)
      .then((response) => {
        dispatch(addPerson(response.data));
      })
      .catch((error) => {
        console.error("Error fetching team members:", error.message);
        dispatch(setErrorPopUP(true));
      })
      .finally(() => {
        dispatch(setLoading(false));
        dispatch(setErrorPopUP(false));
      });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Please enter the name.";
    if (!role.trim()) newErrors.role = "Please enter the role.";
    const fileInput = document.querySelector("input[type='file']");
    const file = fileInput?.files[0];
    if (!file) newErrors.image = "Please upload an image.";
    return newErrors;
  };

  const handleNameChange = (value) => {
    if (/^[a-zA-Z\s]*$/.test(value)) {
      dispatch(setPersonName(value));
      setErrors((prev) => ({ ...prev, name: "" }));
    } else {
      setErrors((prev) => ({
        ...prev,
        name: "Please enter the valid name.",
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
        role: "Please enter the valid role.",
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          image: "The image size exceeds the 2MB limit.",
        }));
      } else {
        dispatch(setImage(file));
        setErrors((prev) => ({ ...prev, image: "" }));
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
      }
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
      dispatch(setErrorPopUP(true));
    }
    dispatch(setSuccessPopUP(true));
  };

  const handleRemoveImage = () => {
    dispatch(setImage(null));
    const fileInput = document.querySelector("input[type='file']");
    if (fileInput) {
      fileInput.value = "";
    }
  };

  return (
    <div className="mx-10 mt-5">
      <h2 className="text-2xl font-bold md:text-5xl font-serif mb-5">
        Add Teams
      </h2>
      <div className="flex justify-between flex-wrap gap-5">
        <div className="w-[400px] lg:w-[640px] border p-5 rounded-lg">
          <div className="mb-4 space-y-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="Name"
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              className="border rounded w-full py-2 px-3"
              required
            />
            {errors.name && (
              <p className="text-red-500 text-xs">{errors.name}</p>
            )}

            <label className="block text-gray-700">Role</label>
            <input
              type="text"
              name="Role"
              value={role}
              onChange={(e) => handleRoleChange(e.target.value)}
              className="border rounded w-full py-2 px-3"
              required
            />
            {errors.role && (
              <p className="text-red-500 text-xs">{errors.role}</p>
            )}
            <div className="flex justify-between items-center">
              <input
                type="file"
                name="image"
                onChange={handleFileChange}
                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100"
                required={!editingItem}
              />
              <RxCross2
                className="cursor-pointer"
                onClick={handleRemoveImage}
              />
            </div>
          </div>
          {errors.image && (
            <p className="text-red-500 text-xs">{errors.image}</p>
          )}
          {imagePreview && (
            <div className="mb-2">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-24 h-24 object-cover rounded-lg"
              />
            </div>
          )}
          <button
            type="submit"
            onClick={handleFormSubmit}
            className="bg-blue-500 text-xs font-medium uppercase tracking-tight mt-2 text-white px-4 py-3 rounded-md w-full hover:bg-transparent hover:text-blue-500 border border-blue-500 duration-300"
          >
            {editingItem ? "Update Team Member" : "Add Team Member"}
          </button>
        </div>
        <div className="lg:w-[450px] justify-center flex">
          {teamMembers.length > 0 && (
            <div
              key={teamMembers[teamMembers.length - 1]._id}
              className="flex flex-col"
            >
              <div className="border shadow-lg border-[#2986FE] rounded-lg w-[400px] p-3 flex justify-between items-center">
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
                <div className="mt-5">
                  <img
                    src={`http://localhost:3000/Images/${
                      teamMembers[teamMembers.length - 1].image
                    }`}
                    alt={teamMembers[teamMembers.length - 1].title}
                    className="object-cover w-[400px] h-[250px] rounded"
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {successPopUp && <SuccessPopUp />}
      {errorPopUp && <ErrorPopUp />}
    </div>
  );
};

export default TeamForm;
