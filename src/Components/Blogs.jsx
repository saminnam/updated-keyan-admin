import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin2Line } from "react-icons/ri";
import {
  addBlog,
  setEditingItem,
  resetForm,
  openForm,
  setTitle,
  setContent,
  setAuthor,
  setSubContent,
  setImage,
  setCategory,
  // setError,
  // setSuccess,
} from "../Redux/Actions/BlogsActions";
import { API_BASE_URL } from "./Api";
import ShortInfo from "./ShortInfo";
import axios from "axios";

const Blog = () => {
  const dispatch = useDispatch();
  const {
    blogs,
    openForm: isFormOpen,
    editingItem,
    title,
    category,
    content,
    subContent,
    author,
    // success,
    // error,
  } = useSelector((state) => state.blogsInfo);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = () => {
    axios
      .get(`${API_BASE_URL}blogs`)
      .then((response) => {
        dispatch(addBlog(response.data));
      })
      .catch((error) => {
        console.error("Error fetching blogs:", error.message);
      });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      dispatch(setImage(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataObj = new FormData();
    const fileInput = document.querySelector("input[type='file']");
    if (fileInput && fileInput.files[0]) {
      formDataObj.append("image", fileInput.files[0]);
    }

    formDataObj.append("title", title);
    formDataObj.append("category", category);
    formDataObj.append("content", content);
    formDataObj.append("subContent", subContent);
    formDataObj.append("author", author);

    if (editingItem) {
      await axios.put(`${API_BASE_URL}blogs/${editingItem._id}`, formDataObj);
    } else {
      await axios.post(`${API_BASE_URL}blogs`, formDataObj);
    }
    fetchBlogs();
    dispatch(openForm(false));
    dispatch(resetForm());
    dispatch(setEditingItem(null));
  };

  const handleEditClick = (blog) => {
    dispatch(setEditingItem(blog));
    dispatch(setTitle(blog.title));
    dispatch(setCategory(blog.category));
    dispatch(setContent(blog.content));
    dispatch(setSubContent(blog.subContent));
    dispatch(setAuthor(blog.author));
    dispatch(setImage(null));
    dispatch(openForm(true));
  };

  const handleDelete = async (id) => {
    await axios
      .delete(`${API_BASE_URL}blogs/${id}`)
      .then(() => {
        fetchBlogs();
      })
      .catch((error) => {
        console.error("Error deleting blog:", error);
      });
  };

  const handleFormToggle = () => {
    dispatch(openForm(!isFormOpen));
    if (!isFormOpen) {
      dispatch(resetForm());
      dispatch(setEditingItem(null));
    }
  };

  const columnDefs = useMemo(
    () => [
      { headerName: "Title", field: "title" },
      { headerName: "Category", field: "category" },
      { headerName: "Content", field: "content" },
      { headerName: "Sub Content", field: "subContent" },
      { headerName: "Author", field: "author" },
      {
        headerName: "Created At",
        field: "createdAt",
        valueFormatter: ({ value }) => new Date(value).toLocaleString(),
      },
      {
        headerName: "Image",
        field: "image",
        cellRenderer: (params) => (
          <img
            src={`http://localhost:3000/Images/${params.value}`}
            alt={params.data.title}
            width={100}
          />
        ),
      },
      {
        headerName: "Actions",
        field: "actions",
        cellRenderer: (params) => (
          <div className="flex gap-3 m-3 items-center cursor-pointer">
            <FaRegEdit
              onClick={() => handleEditClick(params.data)}
              className="text-xl"
            />
            <RiDeleteBin2Line
              onClick={() => handleDelete(params.data._id)}
              className="text-xl"
            />
          </div>
        ),
      },
    ],
    [blogs]
  );

  return (
    <>
      <section className="mt-14">
        <ShortInfo />
        <div className="flex justify-between mx-10 mb-5 mt-20 items-center">
          <h2 className="text-2xl font-bold md:text-5xl font-serif">Blogs</h2>
          <button
            className="border text-xs font-medium uppercase tracking-tight py-3 px-5 rounded-lg hover:bg-blue-500 hover:text-white transition-transform duration-300 border-blue-500 text-blue-500"
            onClick={handleFormToggle}
          >
            {!isFormOpen ? "Add Blog" : "Back"}
          </button>
        </div>
        <div className="mx-10">
          {isFormOpen && (
            <div className="flex justify-between flex-wrap gap-5">
              <div className="w-[400px] lg:w-[640px] border p-5 rounded-lg">
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col space-y-4 mb-8"
                >
                  <input
                    type="text"
                    name="title"
                    value={title}
                    onChange={(e) => dispatch(setTitle(e.target.value))}
                    placeholder="Title"
                    className="p-2 border rounded"
                    required
                  />
                  <input
                    type="text"
                    name="category"
                    value={category}
                    onChange={(e) => dispatch(setCategory(e.target.value))}
                    placeholder="Category"
                    className="p-2 border rounded"
                    required
                  />
                  <textarea
                    name="content"
                    value={content}
                    onChange={(e) => dispatch(setContent(e.target.value))}
                    placeholder="Content"
                    className="p-2 border rounded h-32"
                    required
                  />
                  <textarea
                    name="subContent"
                    value={subContent}
                    onChange={(e) => dispatch(setSubContent(e.target.value))}
                    placeholder="Sub Content"
                    className="p-2 border rounded h-24"
                    required
                  />
                  <input
                    type="text"
                    name="author"
                    value={author}
                    onChange={(e) => dispatch(setAuthor(e.target.value))}
                    placeholder="Author"
                    className="p-2 border rounded"
                    required
                  />
                  <input
                    type="file"
                    name="image"
                    onChange={handleFileChange}
                    accept="image/*"
                    className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100"
                  />
                  <button
                    type="submit"
                    className="bg-blue-500 text-xs font-medium uppercase tracking-tight text-white px-4 py-3 rounded-md w-full hover:bg-transparent hover:text-blue-500 border border-blue-500 duration-300"
                  >
                    {editingItem ? "Update Blog" : "Create Blog"}
                  </button>
                </form>
              </div>
              <div className="lg:w-[450px] rounded-lg flex flex-col lg:flex-row lg:flex-wrap justify-between">
                {blogs.length > 0 && (
                  <div
                    key={blogs[blogs.length - 1]._id}
                    className="mb-4 border p-4"
                  >
                    <img
                      src={`http://localhost:3000/Images/${
                        blogs[blogs.length - 1].image
                      }`}
                      alt={blogs[blogs.length - 1].title}
                      className="object-cover w-full h-[250px]"
                    />
                    <span className="text-sky-500 bg-sky-100 mt-2 inline-flex px-4 py-2 text-xs font-semibold tracking-widest uppercase rounded-full">
                      {blogs[blogs.length - 1].category}
                    </span>
                    <p className="mt-6 text-xl font-semibold">
                      {blogs[blogs.length - 1].title}
                    </p>
                    <p className="mt-4 text-gray-600 text-justify">
                      {blogs[blogs.length - 1].subContent}
                    </p>
                    <div className="h-0 mt-6 mb-4 border-t-2 border-gray-200 border-dashed"></div>
                    <span className="block text-sm font-bold tracking-widest text-gray-500 uppercase">
                      {blogs[blogs.length - 1].author}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        {!isFormOpen && (
          <div className="ag-theme-alpine mx-10 mt-5">
            <AgGridReact
              rowData={blogs}
              columnDefs={columnDefs}
              domLayout="autoHeight"
              pagination={true}
              paginationPageSize={10}
              getRowHeight={() => 50}
              style={{ width: "100%", height: "500px" }}
            />
          </div>
        )}
      </section>
    </>
  );
};

export default Blog;
