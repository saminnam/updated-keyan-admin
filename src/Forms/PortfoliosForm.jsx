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
import { setError } from "../Redux/Actions/CommonActions";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import SuccessPopUp from "../Modals/SuccessPopUp";
import ErrorPopUp from "../Modals/ErrorPopUp";
import Loader from "../Components/Loader";

const PortfoliosForm = () => {
  const [loading, setLoading] = useState(false);
  const [successPopup, setSuccessPopup] = useState(false);
  const [errorPopup, setErrorPopup] = useState(false);
  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(null);
  const dispatch = useDispatch();
  const { editingItem, title, websiteUrl } = useSelector(
    (state) => state.portfoliosInfo
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
        setLoading(false);
        setErrorPopup(false);
      })
      .catch((error) => {
        setErrorPopup(true);
        setError("Error fetching portfolio items:", error.message);
      });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = "Please enter the title";
    if (!websiteUrl.trim())
      newErrors.websiteUrl = "Please enter the website Url";
    const fileInput = document.querySelector("input[type='file']");
    const file = fileInput?.files[0];
    if (!file) newErrors.image = "Please upload an image";
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

  const handleWebsiteUrlChange = (value) => {
    const urlRegex =
      /^(https?:\/\/)?([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})(\/[^\s]*)?$/;
    if (urlRegex.test(value)) {
      dispatch(setWebsiteUrl(value));
      setErrors((prev) => ({
        ...prev,
        websiteUrl: "",
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        websiteUrl: "Please enter a valid website URL",
      }));
    }
  };

  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     if (file.size > 2 * 1024 * 1024) {
  //       setErrors((prev) => ({
  //         ...prev,
  //         image: "The image size exceeds the 2MB limit",
  //       }));
  //     } else {
  //       dispatch(setImage(file));
  //       setErrors((prev) => ({ ...prev, image: "" }));

  //       const reader = new FileReader();
  //       reader.onloadend = () => {
  //         setImagePreview(reader.result);
  //       };
  //       reader.readAsDataURL(file);
  //     }
  //   }
  // };
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
      setSuccessPopup(true);
    } catch (err) {
      console.error("Error submitting portfolio:", err);
      setErrorPopup(true);
    } finally {
      setSuccessPopup(true);
    }
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
        <div>
          <div className="mx-10 mt-5">
            <h2 className="text-2xl font-bold md:text-3xl font-serif mb-5">
              Add Portfolios
            </h2>
            <div className="flex justify-between flex-wrap gap-5">
              <div className="w-[400px] lg:w-[640px] border p-5 rounded-lg">
                <div className="mb-4 space-y-3">
                  <label className="block text-base font-medium text-gray-700">
                    Title
                  </label>
                  <input
                    type="text"
                    placeholder="Tilte"
                    value={title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    className="block focus:outline-[#2986FE] w-full px-3 py-2 border border-gray-300 rounded"
                  />
                  {errors.title && (
                    <p className="text-red-500 text-sm">{errors.title}</p>
                  )}
                  <label className="block text-base font-medium text-gray-700">
                    Website URL
                  </label>
                  <input
                    type="url"
                    placeholder="Website Url"
                    value={websiteUrl}
                    onChange={(e) => handleWebsiteUrlChange(e.target.value)}
                    className="block focus:outline-[#2986FE] w-full px-3 py-2 border border-gray-300 rounded"
                  />
                  {errors.websiteUrl && (
                    <p className="text-red-500 text-sm">{errors.websiteUrl}</p>
                  )}
                  <div className="flex items-center gap-5">
                    <input
                      type="file"
                      name="image"
                      accept="image/jpeg, image/png, image/gif, image/webp"
                      onChange={handleFileChange}
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100"
                    />

                    {imagePreview && (
                      <div className="mb-2">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-80 h-24 object-cover rounded"
                        />
                      </div>
                    )}
                    <RxCross2
                      className="cursor-pointer text-2xl"
                      onClick={handleRemoveImage}
                    />
                  </div>
                  {errors.image && (
                    <p className="text-red-500 text-sm mb-2">{errors.image}</p>
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
            </div>
          </div>
          {successPopup && <SuccessPopUp />}
          {errorPopup && <ErrorPopUp />}
        </div>
      )}
    </>
  );
};

export default PortfoliosForm;
