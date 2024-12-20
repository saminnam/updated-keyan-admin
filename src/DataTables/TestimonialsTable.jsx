import { useEffect, useState } from "react";
import { API_BASE_URL } from "../Components/Api";
import {
  addTestimonial,
  setPersonRating,
  setEditingItem,
  setContent,
  setImage,
  setPersonName,
} from "../Redux/Actions/TestimonialsActions";
import {
  setError,
  setPopUpVisible,
  setSelectedId,
} from "../Redux/Actions/CommonActions";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin2Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import DeletePopUp from "../Modals/DeletePopUp";
import TestimonialsForm from "../Forms/TestimonialsForm";
import Loader from "../Components/Loader";

const TestimonialsTable = () => {
  const [loading, setLoading] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const dispatch = useDispatch();
  const { testimonials } = useSelector((state) => state.testimonialsInfo);
  const { selectedId } = useSelector((state) => state.commonInfo);

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
        setLoading(false);
      })
      .catch((error) => {
        setError("Error fetching testimonials. Please try again later.");
        console.error("Error fetching services:", error.message);
      });
  };
  const handleEdit = (testimonial) => {
    dispatch(setImage(null));
    dispatch(setPersonRating(testimonial.rating));
    dispatch(setPersonName(testimonial.name));
    dispatch(setEditingItem(testimonial));
    dispatch(setContent(testimonial.content));
    setFormVisible(true);
  };

  const confirmDelete = (id) => {
    dispatch(setSelectedId(id));
    dispatch(setPopUpVisible(true));
  };

  const handleDelete = () => {
    if (selectedId) {
      axios
        .delete(`${API_BASE_URL}testimonials/${selectedId}`)
        .then(() => {
          fetchTestimonials();
          dispatch(setPopUpVisible(false));
          setSelectedId(null);
        })
        .catch((error) => {
          setError(
            "Error deleting testimonial, Please try again.",
            error.message
          );
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
  const columnDefs = [
    {
      headerName: "Name",
      field: "name",
      sortable: true,
      filter: true,
      pinned: "left",
    },
    {
      headerName: "Image",
      field: "image",
      cellRenderer: (params) => (
        <img
          src={`http://localhost:3000/Images/${params.value}`}
          alt={params.data.name}
          style={{ width: "50px", borderRadius: "8px" }}
        />
      ),
    },
    {
      headerName: "Content",
      field: "content",
      filter: true,
      width: 440,
    },
    {
      headerName: "Rating",
      field: "rating",
      sortable: true,
      cellStyle: { textAlign: "center" },
      filter: true,
    },
    {
      headerName: "Actions",
      field: "actions",
      pinned: "right",
      cellRenderer: (params) => (
        <div className="flex gap-5 mt-3 cursor-pointer items-center">
          <FaRegEdit
            onClick={() => handleEdit(params.data)}
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
  ];
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
              / List Testimonials &#8594;
            </button>
          </div>
          <TestimonialsForm />
        </>
      ) : (
        <div className="mt-2 mx-10">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-serif font-bold">Testimonials List</h2>
            <button
              className="bg-[#2986FE] py-2 px-4 hover:bg-transparent hover:text-[#2986FE] border border-[#2986FE] transition-all duration-300 rounded-lg text-white"
              onClick={addData}
            >
              ADD
            </button>
          </div>
          <div className="ag-theme-alpine mt-2">
            <AgGridReact
              rowData={testimonials}
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

export default TestimonialsTable;
