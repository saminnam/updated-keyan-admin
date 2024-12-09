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
  setLoading,
  setError,
  setSelectedId,
  setPopUpVisible,
} from "../Redux/Actions/CommonActions";
import axios from "axios";
import DeletePopUp from "../Modals/DeletePopUp";
import PortfoliosForm from "../Forms/PortfoliosForm";

const PortfolioTable = () => {
  const [formVisible, setFormVisible] = useState(false);
  const { portfolioItems } = useSelector((state) => state.portfoliosInfo);
  // const { error, loading } = useSelector((state) => state.commonInfo);
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

  const columnDefs = [
    { headerName: "Title", field: "title", sortable: true, filter: true },
    {
      headerName: "Image",
      field: "image",
      cellRenderer: (params) => (
        <img
          src={`http://localhost:3000/Images/${params.value}`}
          alt={params.data.title}
          className="w-16 h-16 object-cover rounded"
        />
      ),
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
    },
    {
      headerName: "Actions",
      field: "_id",
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
    },
  ];

  return (
    <>
      {formVisible ? (
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
            <h2 className="text-3xl font-serif font-bold">Portfolios List</h2>
            <div
              className="ag-theme-alpine mt-1"
              style={{ height: "500px", width: "100%" }}
            >
              <AgGridReact
                rowData={portfolioItems}
                columnDefs={columnDefs}
                pagination={true}
                paginationPageSize={10}
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
