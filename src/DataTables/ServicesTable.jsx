import { useEffect, useState } from "react";
import { API_BASE_URL } from "../Components/Api";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin2Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import {
  addService,
  setEditingItem,
  setTitle,
  setDescription,
} from "../Redux/Actions/ServicesActions";
import axios from "axios";
import {
  setLoading,
  setError,
  setPopUpVisible,
  setSelectedId,
} from "../Redux/Actions/CommonActions";
import DeletePopUp from "../Modals/DeletePopUp";
import ServicesForm from "../Forms/ServicesForm";

const ServicesTable = () => {
  const [formVisible, setFormVisible] = useState(false);
  const dispatch = useDispatch();
  const { services } = useSelector((state) => state.servicesInfo);
  const { selectedId } = useSelector((state) => state.commonInfo);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = () => {
    setLoading(true);
    setError(null);
    dispatch(setPopUpVisible(false));
    axios
      .get(`${API_BASE_URL}services`)
      .then((response) => {
        dispatch(addService(response.data));
        setLoading(false);
      })
      .catch((error) => {
        setError(
          "Failed to fetch services. Please try again later.",
          error.message
        );
      });
  };

  const handleEdit = (service) => {
    dispatch(setEditingItem(service));
    dispatch(setTitle(service.title));
    dispatch(setDescription(service.description));
    setFormVisible(true);
  };

  const confirmDelete = (id) => {
    dispatch(setSelectedId(id));
    dispatch(setPopUpVisible(true));
  };

  const handleDelete = () => {
    if (selectedId) {
      axios
        .delete(`${API_BASE_URL}services/${selectedId}`)
        .then(() => {
          fetchServices();
          dispatch(setPopUpVisible(false));
          setSelectedId(null);
        })
        .catch((error) => {
          setError(
            "Failed to delete the service. Please try again.",
            error.message
          );
        });
    }
  };

  const cancelDelete = () => {
    dispatch(setPopUpVisible(false));
    setSelectedId(null);
  };

  const columnDefs = [
    {
      headerName: "ID",
      field: "_id",
      width: 150,
      pinned: "left",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Title",
      field: "title",
      flex: 1,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Description",
      field: "description",
      flex: 2,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Created At",
      field: "createdAt",
      valueFormatter: (params) => new Date(params.value).toLocaleString(),
      width: 200,
    },
    {
      headerName: "Updated At",
      field: "updatedAt",
      valueFormatter: (params) => new Date(params.value).toLocaleString(),
      width: 200,
    },
    {
      headerName: "Actions",
      field: "actions",
      pinned: "right",
      cellRenderer: (params) => (
        <div className="flex gap-3 m-3 items-center cursor-pointer">
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
      width: 150,
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
              / List Services &#8594;
            </button>
          </div>
          <ServicesForm />
        </>
      ) : (
        <div>
          {/* <ShortInfo /> */}
          <div className="mx-10 mt-2">
            <h2 className="text-3xl font-serif font-bold">Services List</h2>
            <div
              className="ag-theme-alpine mt-1"
              style={{
                height: 400,
                width: "100%",
              }}
            >
              <AgGridReact
                rowData={services}
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

export default ServicesTable;
