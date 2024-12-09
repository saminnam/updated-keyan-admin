import { useEffect, useState } from "react";
import { API_BASE_URL } from "../Components/Api";
import { RxCross2 } from "react-icons/rx";
import {
  addPortfolio,
  setEditingItem,
  resetForm,
  setTitle,
  setImage,
  setWebsiteUrl,
} from "../Redux/Actions/PortfolioActions";
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
import { FaRegEyeSlash } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";

const PortfoliosForm = () => {
  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(null);
  const dispatch = useDispatch();
  const { portfolioItems, editingItem, title, websiteUrl } = useSelector(
    (state) => state.portfoliosInfo
  );
  const { loading, showImagePreview, successPopUp, errorPopUp } = useSelector(
    (state) => state.commonInfo
  );

  useEffect(() => {
    fetchPortfolioItems();
  }, []);

  const fetchPortfolioItems = () => {
    setLoading(true);
    setError(null);
    axios
      .get(`${API_BASE_URL}portfolio`)
      .then((response) => {
        dispatch(addPortfolio(response.data));
      })
      .catch((error) => {
        dispatch(setErrorPopUP(true));
        setError("Error fetching portfolio items:", error.message);
      })
      .finally(() => {
        setLoading(false);
        dispatch(setErrorPopUP(false));
      });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = "Please enter the title.";
    if (!websiteUrl.trim())
      newErrors.websiteUrl = "Please enter the website Url.";
    const fileInput = document.querySelector("input[type='file']");
    const file = fileInput?.files[0];
    if (!file) newErrors.image = "Please upload an image.";
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

  const handleWebsiteUrlChange = (value) => {
    const urlRegex =
      /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/.*)?$/;
    if (urlRegex.test(value)) {
      dispatch(setWebsiteUrl(value));
      setErrors((prev) => ({
        ...prev,
        websiteUrl: "",
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        websiteUrl: "Please enter a valid website URL.",
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

  const handleSubmit = async () => {
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    const formData = new FormData();
    const fileInput = document.querySelector("input[type='file']");
    if (fileInput && fileInput.files[0]) {
      formData.append("image", fileInput.files[0]);
    }
    formData.append("title", title.toUpperCase());
    formData.append("websiteUrl", websiteUrl);
    try {
      if (editingItem) {
        await axios.put(
          `${API_BASE_URL}portfolio/${editingItem._id}`,
          formData
        );
      } else {
        await axios.post(`${API_BASE_URL}portfolio`, formData);
      }
      fetchPortfolioItems();
      dispatch(resetForm());
      dispatch(setEditingItem(null));
      setImagePreview(null);
    } catch (err) {
      console.error("Error submitting portfolio:", err.message);
      dispatch(setErrorPopUP(true));
    }
    dispatch(setSuccessPopUP(true));
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
    <div className="mt-10">
      <div className="mx-10">
        <h2 className="text-2xl font-bold md:text-5xl font-serif mb-5">
          Add Portfolios
        </h2>
        <div className="flex justify-between flex-wrap gap-5">
          <div className="w-[400px] lg:w-[640px] border p-5 rounded-lg">
            <div className="mb-6 mt-10 flex flex-col space-y-4">
              <div className="mb-4 space-y-4">
                <label className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
                {errors.title && (
                  <p className="text-red-500 text-xs">{errors.title}</p>
                )}
              </div>

              <div className="mb-4 space-y-4">
                <label className="block text-sm font-medium text-gray-700">
                  Website URL
                </label>
                <input
                  type="url"
                  value={websiteUrl}
                  onChange={(e) => handleWebsiteUrlChange(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
                {errors.websiteUrl && (
                  <p className="text-red-500 text-xs">{errors.websiteUrl}</p>
                )}
              </div>

              <div className="flex items-center">
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100"
                />
                <RxCross2
                  className="cursor-pointer text-xl"
                  onClick={handleRemoveImage}
                />
              </div>
              {errors.image && (
                <p className="text-red-500 text-xs mb-2">{errors.image}</p>
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
                onClick={handleSubmit}
                className="bg-blue-500 text-xs font-medium uppercase tracking-tight text-white px-4 py-3 rounded-md w-full hover:bg-transparent hover:text-blue-500 border border-blue-500 duration-300"
              >
                {editingItem ? "Update Portfolio" : "Add Portfolio"}
              </button>
            </div>
          </div>
          <div className="lg:w-[450px]">
            {portfolioItems.length > 0 && (
              <div key={portfolioItems[portfolioItems.length - 1].id}>
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
                        portfolioItems[portfolioItems.length - 1].image
                      }`}
                      alt={portfolioItems[portfolioItems.length - 1].title}
                      className="object-cover w-full h-[250px] rounded-lg"
                    />
                    <h2 className="text-center font-bold mt-4">
                      {portfolioItems[portfolioItems.length - 1].title}
                    </h2>
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

export default PortfoliosForm;
