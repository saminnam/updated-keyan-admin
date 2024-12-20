import { useEffect, useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { useDispatch, useSelector } from "react-redux";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin2Line } from "react-icons/ri";
import {
  setEditingItem,
  setTitle,
  setContent,
  setAuthor,
  setSubContent,
  setImage,
  addBlog,
  setCategory,
} from "../Redux/Actions/BlogsActions";
import { setSelectedId, setPopUpVisible } from "../Redux/Actions/CommonActions";
import { API_BASE_URL } from "../Components/Api";
import axios from "axios";
import DeletePopUp from "../Modals/DeletePopUp";
import BlogsForm from "../Forms/BlogsForm";
import Loader from "../Components/Loader";

const BlogsTable = () => {
  const [loading, setLoading] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const dispatch = useDispatch();
  const { blogs } = useSelector((state) => state.blogsInfo);
  const { selectedId } = useSelector((state) => state.commonInfo);
  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = () => {
    setLoading(true);
    dispatch(setPopUpVisible(false));
    axios
      .get(`${API_BASE_URL}blogs`)
      .then((response) => {
        dispatch(addBlog(response.data));
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching blogs:", error.message);
      });
  };

  const handleEditClick = (blog) => {
    dispatch(setEditingItem(blog));
    dispatch(setTitle(blog.title));
    dispatch(setCategory(blog.category));
    dispatch(setContent(blog.content));
    dispatch(setSubContent(blog.subContent));
    dispatch(setAuthor(blog.author));
    dispatch(setImage(null));
    setFormVisible(true);
  };

  const confirmDelete = (id) => {
    dispatch(setSelectedId(id));
    dispatch(setPopUpVisible(true));
  };

  const handleDelete = () => {
    if (selectedId) {
      axios
        .delete(`${API_BASE_URL}blogs/${selectedId}`)
        .then(() => {
          fetchBlogs();
          dispatch(setPopUpVisible(false));
          setSelectedId(null);
        })
        .catch((error) => {
          console.error("Error deleting blog:", error);
        });
    }
  };

  const cancelDelete = () => {
    dispatch(setPopUpVisible(false));
    setSelectedId(null);
  };

  const addData = () => {
    setFormVisible(true);
  };

  const columnDefs = useMemo(
    () => [
      {
        headerName: "Title",
        field: "title",
        pinned: "left",
        sortable: true,
        filter: true,
      },
      {
        headerName: "Category",
        field: "category",
        sortable: true,
        filter: true,
      },
      { headerName: "Content", field: "content", sortable: true, filter: true },
      {
        headerName: "Sub Content",
        field: "subContent",
        sortable: true,
        filter: true,
      },
      { headerName: "Author", field: "author", sortable: true, filter: true },
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
        pinned: "right",
        cellRenderer: (params) => (
          <div className="flex gap-3 m-3 items-center cursor-pointer">
            <FaRegEdit
              onClick={() => handleEditClick(params.data)}
              className="text-xl"
            />
            <RiDeleteBin2Line
              onClick={() => confirmDelete(params.data._id)}
              className="text-xl"
            />
          </div>
        ),
        width: 130,
      },
    ],
    [blogs]
  );

  return (
    <>
      {loading && loading ? (
        <div className="flex justify-center items-center h-[90vh]">
          <Loader />
        </div>
      ) : formVisible ? (
        <>
          <div className="mx-10">
            <button
              className="text-[#2986FE]"
              onClick={() => setFormVisible(false)}
            >
              / List Blogs &#8594;
            </button>
          </div>
          <BlogsForm />
        </>
      ) : (
        <div className="mx-10 mt-2">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-serif font-bold">Blogs List</h2>
            <button
              className="bg-[#2986FE] py-2 px-4 hover:bg-transparent hover:text-[#2986FE] border border-[#2986FE] transition-all duration-300 rounded-lg text-white"
              onClick={addData}
            >
              ADD
            </button>
          </div>
          <div className="ag-theme-alpine mt-2">
            <AgGridReact
              rowData={blogs}
              columnDefs={columnDefs}
              domLayout="autoHeight"
              pagination={true}
              paginationPageSize={10}
              getRowHeight={() => 50}
              style={{ width: "100%" }}
            />
          </div>
          <DeletePopUp onConfirmDelete={handleDelete} onCancel={cancelDelete} />
        </div>
      )}
    </>
  );
};

export default BlogsTable;
