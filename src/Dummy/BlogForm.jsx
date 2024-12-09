import { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { FaRegEyeSlash } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import SuccessPopUp from "../Modals/SuccessPopUp";
import ErrorPopUp from "../Modals/ErrorPopUp";
import {
  addBlog,
  setEditingItem,
  resetForm,
  setTitle,
  setContent,
  setAuthor,
  setSubContent,
  setImage,
  setCategory,
} from "../Redux/Actions/BlogsActions";
import {
  setLoading,
  setError,
  setShowImagePreview,
  setSuccessPopUP,
  setErrorPopUP,
} from "../Redux/Actions/CommonActions";
import { API_BASE_URL } from "../Components/Api";
import axios from "axios";

const BlogsForm = () => {
  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(null);
  const dispatch = useDispatch();
  const { showImagePreview, successPopUp, errorPopUp } = useSelector(
    (state) => state.commonInfo
  );
  const { blogs, editingItem, title, category, content, subContent, author } =
    useSelector((state) => state.blogsInfo);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = () => {
    dispatch(setLoading(true));
    dispatch(setError(null));
    axios
      .get(`${API_BASE_URL}blogs`)
      .then((response) => {
        dispatch(addBlog(response.data));
      })
      .catch((error) => {
        console.error("Error fetching blogs:", error.message);
        dispatch(setErrorPopUP(true));
      })
      .finally(() => {
        dispatch(setLoading(false));
        dispatch(setErrorPopUP(false));
      });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = "Please enter the title.";
    if (!category.trim()) newErrors.category = "Please enter the category.";
    if (!content.trim()) newErrors.content = "Please enter the content.";
    if (!subContent.trim())
      newErrors.subContent = "Please enter the sub-content.";
    if (!author.trim()) newErrors.author = "Please enter the author name.";
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

  const handleCategoryChange = (value) => {
    if (/^[a-zA-Z\s]*$/.test(value)) {
      dispatch(setCategory(value));
      setErrors((prev) => ({ ...prev, category: "" }));
    } else {
      setErrors((prev) => ({
        ...prev,
        category: "Please enter the valid category.",
      }));
    }
  };

  const handleAuthorChange = (value) => {
    if (/^[a-zA-Z\s]*$/.test(value)) {
      dispatch(setAuthor(value));
      setErrors((prev) => ({ ...prev, author: "" }));
    } else {
      setErrors((prev) => ({
        ...prev,
        author: "Please enter the valid author name.",
      }));
    }
  };

  const handleContentChange = (value) => {
    dispatch(setContent(value));
    setErrors((prev) => ({ ...prev, content: "" }));
  };

  const handleSubContentChange = (value) => {
    dispatch(setSubContent(value));
    setErrors((prev) => ({ ...prev, subContent: "" }));
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

  const handleSubmit = () => {
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    const formDataObj = new FormData();
    const fileInput = document.querySelector("input[type='file']");
    const file = fileInput?.files[0];

    formDataObj.append("title", title);
    formDataObj.append("category", category.toUpperCase());
    formDataObj.append("content", content);
    formDataObj.append("subContent", subContent);
    formDataObj.append("author", author.toUpperCase());
    if (file) {
      formDataObj.append("image", file);
    }

    try {
      if (editingItem) {
        axios.put(`${API_BASE_URL}blogs/${editingItem._id}`, formDataObj);
      } else {
        axios.post(`${API_BASE_URL}blogs`, formDataObj);
      }
      fetchBlogs();
      dispatch(resetForm());
      dispatch(setEditingItem(null));
      setImagePreview(null);
      dispatch(setSuccessPopUP(true));
    } catch (error) {
      console.error("Error submitting blog:", error.message);
      dispatch(setErrorPopUP(true));
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
    <div className="mt-5 mx-10">
      <h2 className="text-2xl font-bold md:text-4xl font-serif mb-5">
        Add Blogs
      </h2>
      <div className="flex justify-between flex-wrap gap-5">
        <div className="w-[400px] lg:w-[640px] border p-5 rounded-lg">
          <div className="flex flex-col space-y-4 mb-8">
            <input
              type="text"
              name="title"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Title"
              className="p-2 border rounded"
            />
            {errors.title && (
              <p className="text-red-500 text-xs">{errors.title}</p>
            )}
            <input
              type="text"
              name="category"
              value={category}
              onChange={(e) => handleCategoryChange(e.target.value)}
              placeholder="Category"
              className="p-2 border rounded"
            />
            {errors.category && (
              <p className="text-red-500 text-xs">{errors.category}</p>
            )}
            <textarea
              name="content"
              value={content}
              onChange={(e) => handleContentChange(e.target.value)}
              placeholder="Content"
              className="p-2 border rounded h-32"
            />
            {errors.content && (
              <p className="text-red-500 text-xs">{errors.content}</p>
            )}
            <textarea
              name="subContent"
              value={subContent}
              onChange={(e) => handleSubContentChange(e.target.value)}
              placeholder="Sub Content"
              className="p-2 border rounded h-24"
            />
            {errors.subContent && (
              <p className="text-red-500 text-xs">{errors.subContent}</p>
            )}
            <input
              type="text"
              name="author"
              value={author}
              onChange={(e) => handleAuthorChange(e.target.value)}
              placeholder="Author"
              className="p-2 border rounded"
            />
            {errors.author && (
              <p className="text-red-500 text-xs">{errors.author}</p>
            )}
            <div className="flex items-center">
              <input
                type="file"
                name="image"
                onChange={handleFileChange}
                accept="image/*"
                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100"
              />
              <RxCross2
                className="cursor-pointer"
                onClick={handleRemoveImage}
              />
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
              className="bg-blue-500 text-xs font-medium uppercase tracking-tight text-white px-4 py-3 rounded-md w-full hover:bg-transparent hover:text-blue-500 border border-blue-500 duration-300"
              onClick={handleSubmit}
            >
              {editingItem ? "Update Blog" : "Create Blog"}
            </button>
          </div>
        </div>
        <div className="lg:w-[450px] justify-center flex">
          {blogs.length > 0 && (
            <div key={blogs[blogs.length - 1]._id} className="flex flex-col">
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
                      blogs[blogs.length - 1].image
                    }`}
                    alt={blogs[blogs.length - 1].title}
                    className="object-cover w-[400px] h-[250px] rounded"
                  />
                
                </div>
              )}
            </div>
          )}
        </div>
        {successPopUp && <SuccessPopUp />}
        {errorPopUp && <ErrorPopUp />}
      </div>
    </div>
  );
};

export default BlogsForm;
