import { useEffect, useState } from "react";
import { API_BASE_URL } from "../Components/Api";
import {
  addTestimonial,
  setPersonRating,
  setEditingItem,
  resetForm,
  setContent,
  setImage,
  setPersonName,
} from "../Redux/Actions/TestimonialsActions";
import SuccessPopUp from "../Modals/SuccessPopUp";
import ErrorPopUp from "../Modals/ErrorPopUp";
import { RxCross2 } from "react-icons/rx";
import {
  setLoading,
  setError,
  setSuccessPopUP,
  setErrorPopUP,
} from "../Redux/Actions/CommonActions";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const TestimonialsForm = () => {
  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(null);
  const dispatch = useDispatch();
  const { editingItem, name, content, rating } = useSelector(
    (state) => state.testimonialsInfo
  );
  const { error, loading, successPopUp, errorPopUp } = useSelector(
    (state) => state.commonInfo
  );

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = () => {
    setLoading(true);
    setError(null);
    axios
      .get(`${API_BASE_URL}testimonials`)
      .then((response) => {
        dispatch(addTestimonial(response.data));
        dispatch(setLoading(false));
        dispatch(setErrorPopUP(false));
      })
      .catch((error) => {
        dispatch(setErrorPopUP(true));
        console.error("Error fetching services:", error.message);
      });
  };

  const handleRemoveImage = () => {
    dispatch(setImage(null));
    setImagePreview(null);
    const fileInput = document.querySelector("input[type='file']");
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Please enter the name";
    if (!content.trim()) newErrors.content = "Please enter the content";
    if (!rating) newErrors.rating = "Please enter the rating";
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

  const handleContentChange = (value) => {
    dispatch(setContent(value));
    setErrors((prev) => ({ ...prev, content: "" }));
  };

  const handleRatingChange = (value) => {
    dispatch(setPersonRating(value));
    setErrors((prev) => ({ ...prev, rating: "" }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          image: "The image size exceeds the 2MB limit",
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

  const handleSubmit = async () => {
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    const formDataObj = new FormData();
    const fileInput = document.querySelector("input[type='file']");
    if (fileInput && fileInput.files[0]) {
      formDataObj.append("image", fileInput.files[0]);
    }
    formDataObj.append("name", name.toUpperCase());
    formDataObj.append("content", content);
    formDataObj.append("rating", rating);

    try {
      if (editingItem) {
        await axios.put(
          `${API_BASE_URL}testimonials/${editingItem._id}`,
          formDataObj
        );
      } else {
        await axios.post(`${API_BASE_URL}testimonials`, formDataObj);
      }
      fetchTestimonials();
      dispatch(resetForm());
      dispatch(setEditingItem(null));
      setImagePreview(null);
    } catch (err) {
      console.error("Error submitting testimonial:", err.message);
      dispatch(setErrorPopUP(true));
    }
    dispatch(setSuccessPopUP(true));
  };

  return (
    <div className="mx-10 mt-5">
      <h2 className="text-2xl font-bold md:text-5xl font-serif mb-5">
        Add Testimonials
      </h2>
      <div className="flex justify-between flex-wrap gap-5">
        <div className="mb-6 w-[400px] lg:w-[640px] border p-5 rounded-lg space-y-4">
          <div className="mb-4 space-y-3">
            <label className="block text-base font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              className="border border-gray-300 rounded p-2 mb-2 w-full"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}

            <div className="flex items-center">
              <input
                type="file"
                name="image"
                onChange={handleFileChange}
                accept="image/*"
                className="mt-1 mb-3 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100"
              />
              <RxCross2
                className="cursor-pointer"
                onClick={handleRemoveImage}
              />
            </div>
            {errors.image && (
              <p className="text-red-500 text-sm">{errors.image}</p>
            )}
            {imagePreview && (
              <div className="mb-2">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="h-24 w-24 object-cover rounded"
                />
              </div>
            )}

            <label className="block text-base font-medium text-gray-700">
              Content
            </label>
            <textarea
              name="content"
              placeholder="Content"
              value={content}
              onChange={(e) => handleContentChange(e.target.value)}
              className="border h-24 border-gray-300 rounded p-2 mb-2 w-full"
            />
            {errors.content && (
              <p className="text-red-500 text-sm">{errors.content}</p>
            )}

            <label className="block text-base font-medium text-gray-700">
              Rating
            </label>
            <input
              type="number"
              placeholder="Rating"
              name="rating"
              value={rating}
              onChange={(e) => handleRatingChange(e.target.value)}
              min="1"
              max="5"
              className="border border-gray-300 rounded p-2 mb-2 w-full"
            />
            {errors.rating && (
              <p className="text-red-500 text-sm">{errors.rating}</p>
            )}

            <button
              type="submit"
              onClick={handleSubmit}
              className="bg-blue-500 text-xs font-medium uppercase tracking-tight mt-2 text-white px-4 py-3 rounded-md w-full hover:bg-transparent hover:text-blue-500 border border-blue-500 duration-300"
            >
              {editingItem ? "Update" : "Add"} Testimonial
            </button>
          </div>
        </div>
      </div>
      {successPopUp && <SuccessPopUp />}
      {errorPopUp && <ErrorPopUp />}
    </div>
  );
};

export default TestimonialsForm;
