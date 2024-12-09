import { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
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
  setSuccessPopUP,
  setErrorPopUP,
} from "../Redux/Actions/CommonActions";
import { API_BASE_URL } from "../Components/Api";
import axios from "axios";

const BlogsForm = () => {
  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(null);
  const dispatch = useDispatch();
  const { successPopUp, errorPopUp } = useSelector((state) => state.commonInfo);
  const { editingItem, title, category, content, subContent, author } =
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
        dispatch(setLoading(false));
        dispatch(setErrorPopUP(false));
      })
      .catch((error) => {
        console.error("Error fetching blogs:", error.message);
        dispatch(setErrorPopUP(true));
      });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = "Please enter the title";
    if (!category.trim()) newErrors.category = "Please enter the category";
    if (!content.trim()) newErrors.content = "Please enter the content";
    if (!subContent.trim())
      newErrors.subContent = "Please enter the sub-content";
    if (!author.trim()) newErrors.author = "Please enter the author name";
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

  const handleCategoryChange = (value) => {
    if (/^[a-zA-Z\s]*$/.test(value)) {
      dispatch(setCategory(value));
      setErrors((prev) => ({ ...prev, category: "" }));
    } else {
      setErrors((prev) => ({
        ...prev,
        category: "Please enter the valid category",
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
        author: "Please enter the valid author name",
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
      <h2 className="text-2xl font-bold md:text-3xl font-serif mb-5">
        Add Blogs
      </h2>
      <div className="flex justify-between flex-wrap gap-5">
        <div className="w-[400px] lg:w-[640px] border p-5 rounded-lg">
          <div className="mb-4 space-y-3">
            <label className="block text-base font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={title}
              placeholder="Title"
              onChange={(e) => handleTitleChange(e.target.value)}
              className="p-2 border w-full rounded"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title}</p>
            )}
            <label className="block text-base font-medium text-gray-700">
              Category
            </label>
            <input
              type="text"
              name="category"
              value={category}
              placeholder="Category"
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="p-2 border w-full rounded"
            />
            {errors.category && (
              <p className="text-red-500 text-sm">{errors.category}</p>
            )}
            <label className="block text-base font-medium text-gray-700">
              Content
            </label>
            <textarea
              name="content"
              placeholder="Content"
              value={content}
              onChange={(e) => handleContentChange(e.target.value)}
              className="p-2 border w-full rounded h-24"
            />
            {errors.content && (
              <p className="text-red-500 text-sm">{errors.content}</p>
            )}
            <label className="block text-base font-medium text-gray-700">
              Sub-Content
            </label>
            <textarea
              name="subContent"
              placeholder="Sub-Content"
              value={subContent}
              onChange={(e) => handleSubContentChange(e.target.value)}
              className="p-2 border rounded h-24 w-full"
            />
            {errors.subContent && (
              <p className="text-red-500 text-sm">{errors.subContent}</p>
            )}
            <label className="block text-base font-medium text-gray-700">
              Author
            </label>
            <input
              type="text"
              name="author"
              placeholder="Author"
              value={author}
              onChange={(e) => handleAuthorChange(e.target.value)}
              className="p-2 border w-full rounded"
            />
            {errors.author && (
              <p className="text-red-500 text-sm">{errors.author}</p>
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
              <p className="text-red-500 text-sm">{errors.image}</p>
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
        {successPopUp && <SuccessPopUp />}
        {errorPopUp && <ErrorPopUp />}
      </div>
    </div>
  );
};

export default BlogsForm;
