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
import { FaRegEyeSlash } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import {
  setLoading,
  setError,
  setSuccessPopUP,
  setErrorPopUP,
  setShowImagePreview,
} from "../Redux/Actions/CommonActions";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const TestimonialsForm = () => {
  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(null);
  const dispatch = useDispatch();
  const { editingItem, testimonials, name, content, rating } = useSelector(
    (state) => state.testimonialsInfo
  );
  const { error, loading, showImagePreview, successPopUp, errorPopUp } =
    useSelector((state) => state.commonInfo);

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
      })
      .catch((error) => {
        dispatch(setErrorPopUP(true));
        console.error("Error fetching services:", error.message);
      })
      .finally(() => {
        dispatch(setLoading(false));
        dispatch(setErrorPopUP(false));
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
    if (!name.trim()) newErrors.name = "Please enter the name.";
    if (!content.trim()) newErrors.content = "Please enter the content.";
    if (!rating) newErrors.rating = "Please enter the rating.";
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
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => handleNameChange(e.target.value)}
            placeholder="Name"
            required
            className="border border-gray-300 rounded p-2 mb-2 w-full"
          />
          {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
          <div className="flex items-center">
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
              accept="image/*"
              className="mt-1 mb-3 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100"
            />
            <RxCross2 className="cursor-pointer" onClick={handleRemoveImage} />
          </div>
          {errors.image && (
            <p className="text-red-500 text-xs">{errors.image}</p>
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
          <textarea
            name="content"
            value={content}
            onChange={(e) => handleContentChange(e.target.value)}
            placeholder="Content"
            required
            className="border border-gray-300 rounded p-2 mb-2 w-full"
          />
          {errors.content && (
            <p className="text-red-500 text-xs">{errors.content}</p>
          )}
          <input
            type="number"
            name="rating"
            value={rating}
            onChange={(e) => handleRatingChange(e.target.value)}
            min="1"
            max="5"
            required
            className="border border-gray-300 rounded p-2 mb-2 w-full"
          />
          {errors.rating && (
            <p className="text-red-500 text-xs">{errors.rating}</p>
          )}
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-blue-500 text-xs font-medium uppercase tracking-tight mt-2 text-white px-4 py-3 rounded-md w-full hover:bg-transparent hover:text-blue-500 border border-blue-500 duration-300"
          >
            {editingItem ? "Update" : "Add"} Testimonial
          </button>
        </div>
        <div className="lg:w-[450px]">
          {testimonials.length > 0 && (
            <div
              key={testimonials[testimonials.length - 1]._id}
              className="flex flex-col"
            >
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
                <div className="mt-5">
                  <img
                    src={`http://localhost:3000/Images/${
                      testimonials[testimonials.length - 1].image
                    }`}
                    alt={testimonials[testimonials.length - 1].title}
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

export default TestimonialsForm;
