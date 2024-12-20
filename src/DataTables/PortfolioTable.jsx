import { useEffect, useState } from "react";
import { API_BASE_URL } from "../Components/Api";
import { FaRegEdit } from "react-icons/fa";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { RiDeleteBin2Line } from "react-icons/ri";
import {
  addPortfolio,
  setEditingItem,
  setTitle,
  setImage,
  setWebsiteUrl,
} from "../Redux/Actions/PortfolioActions";
import { useDispatch, useSelector } from "react-redux";
import {
  setError,
  setSelectedId,
  setPopUpVisible,
} from "../Redux/Actions/CommonActions";
import axios from "axios";
import DeletePopUp from "../Modals/DeletePopUp";
import PortfoliosForm from "../Forms/PortfoliosForm";
import Loader from "../Components/Loader";

const PortfolioTable = () => {
  const [loading, setLoading] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const { portfolioItems } = useSelector((state) => state.portfoliosInfo);
  const { selectedId } = useSelector((state) => state.commonInfo);
  const dispatch = useDispatch();
  useEffect(() => {
    fetchPortfolioItems();
  }, []);

  const fetchPortfolioItems = () => {
    setLoading(true);
    setError(null);
    dispatch(setPopUpVisible(false));
    axios
      .get(`${API_BASE_URL}portfolio`)
      .then((response) => {
        dispatch(addPortfolio(response.data));
        setLoading(false);
      })
      .catch((error) => {
        setError("Error fetching portfolio items:", error.message);
      });
  };
  const handleEdit = (item) => {
    dispatch(setTitle(item.title));
    dispatch(setWebsiteUrl(item.websiteUrl));
    dispatch(setEditingItem(item));
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
        .delete(`${API_BASE_URL}portfolio/${selectedId}`)
        .then(() => {
          fetchPortfolioItems();
          dispatch(setPopUpVisible(false));
          setSelectedId(null);
        })
        .catch((error) => {
          setError("Error deleting portfolio item:", error.message);
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
      headerName: "Title",
      field: "title",
      sortable: true,
      filter: true,
      width: 250,
      pinned: "left",
    },
    {
      headerName: "Image",
      field: "image",
      cellRenderer: (params) => (
        <img
          src={`http://localhost:3000/Images/${params.value}`}
          alt={params.data.title}
          className="w-24 h-16 object-cover rounded"
        />
      ),
      width: 280,
    },

    {
      headerName: "Website URL",
      field: "websiteUrl",
      cellRenderer: (params) => (
        <a
          href={params.value}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          {params.value}
        </a>
      ),
      width: 520,
    },
    {
      headerName: "Actions",
      field: "_id",
      pinned: "right",
      cellRenderer: (params) => (
        <div className="flex mt-3 gap-5 cursor-pointer items-center">
          <FaRegEdit
            onClick={() => handleEdit(params.data)}
            className="text-xl"
          />
          <RiDeleteBin2Line
            onClick={() => confirmDelete(params.value)}
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
              / List Portfolios &#8594;
            </button>
          </div>
          <PortfoliosForm />
        </>
      ) : (
        <div>
          <div className="mx-10 mt-2">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-serif font-bold">Portfolios List</h2>
              <button
                className="bg-[#2986FE] py-2 px-4 hover:bg-transparent hover:text-[#2986FE] border border-[#2986FE] transition-all duration-300 rounded-lg text-white"
                onClick={addData}
              >
                ADD
              </button>
            </div>
            <div className="ag-theme-alpine mt-2">
              <AgGridReact
                rowData={portfolioItems}
                columnDefs={columnDefs}
                pagination={true}
                paginationPageSize={10}
                domLayout="autoHeight"
                getRowHeight={() => 50}
                style={{ width: "100%" }}
              />
            </div>
          </div>
          <DeletePopUp onConfirmDelete={handleDelete} onCancel={cancelDelete} />
        </div>
      )}
    </>
  );
};

export default PortfolioTable;
