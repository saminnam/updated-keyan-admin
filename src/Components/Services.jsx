import { useEffect } from "react";
import { API_BASE_URL } from "./Api";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import ShortInfo from "./ShortInfo";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin2Line } from "react-icons/ri";
import {
  addService,
  setEditingItem,
  setTitle,
  setDescription,
  resetForm,
  openForm,
} from "../Redux/Actions/ServicesActions";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const Services = () => {
  const dispatch = useDispatch();
  const {
    services,
    openForm: isFormOpen,
    title,
    description,
    editingItem,
  } = useSelector((state) => state.servicesInfo);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = () => {
    axios
      .get(`${API_BASE_URL}services`)
      .then((response) => {
        dispatch(addService(response.data));
        console.log("Fetched services:", response.data);
      })
      .catch((error) => {
        console.log("Error fetching services:", error.message);
      });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataObj = {
      title: title,
      description: description,
    };

    if (editingItem) {
      await axios.put(
        `${API_BASE_URL}services/${editingItem._id}`,
        formDataObj
      );
    } else {
      await axios.post(`${API_BASE_URL}services`, formDataObj);
    }
    fetchServices();
    dispatch(openForm(false));
    dispatch(resetForm());
    dispatch(setEditingItem(null));
  };

  const handleEdit = (service) => {
    dispatch(setEditingItem(service));
    dispatch(openForm(true));
    dispatch(setTitle(service.title));
    dispatch(setDescription(service.description));
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}services/${id}`);
      fetchServices();
    } catch (error) {
      console.error("Error deleting services:", error);
    }
  };

  const handleFormToggle = () => {
    dispatch(openForm(!isFormOpen));
    if (!isFormOpen) {
      dispatch(resetForm());
      dispatch(setEditingItem(null));
    }
  };

  const columnDefs = [
    { headerName: "ID", field: "_id", width: 150 },
    { headerName: "Title", field: "title", flex: 1 },
    { headerName: "Description", field: "description", flex: 2 },
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
      cellRenderer: (params) => (
        <div className="flex gap-3 m-3 items-center cursor-pointer">
          <FaRegEdit
            onClick={() => handleEdit(params.data)}
            className="text-xl"
          />
          <RiDeleteBin2Line
            onClick={() => handleDelete(params.data._id)}
            className="text-xl"
          />
        </div>
      ),
      width: 150,
    },
  ];

  return (
    <section className="mt-14">
      <ShortInfo />
      <div className="flex justify-between mx-10 mb-5 mt-20 items-center">
        <h2 className="text-2xl font-bold md:text-5xl font-serif">Services</h2>
        <button
          className="border py-3 px-5 text-xs font-medium uppercase tracking-tight rounded-lg hover:bg-blue-500 hover:text-white transition-transform duration-300 border-blue-500 text-blue-500"
          onClick={handleFormToggle}
        >
          {!isFormOpen ? "Add Services" : "Close Services"}
        </button>
      </div>
      <div className="mx-10">
        {isFormOpen && (
          <div className="flex justify-between flex-wrap gap-5">
            <div className="w-[400px] lg:w-[640px] ">
              <form
                onSubmit={handleSubmit}
                className="mb-8 p-5 rounded-lg border flex flex-col gap-5"
              >
                <input
                  type="text"
                  name="title"
                  placeholder="Service Title"
                  value={title}
                  onChange={(e) => dispatch(setTitle(e.target.value))}
                  required
                  className="border border-gray-300 rounded px-4 py-2 mr-2"
                />
                <input
                  type="text"
                  name="description"
                  placeholder="Service Description"
                  value={description}
                  onChange={(e) => dispatch(setDescription(e.target.value))}
                  required
                  className="border border-gray-300 rounded px-4 py-2 mr-2"
                />
                <button
                  type="submit"
                  className="bg-blue-500 text-xs font-medium uppercase tracking-tight text-white px-4 py-3 rounded-md w-full hover:bg-transparent hover:text-blue-500 border border-blue-500 duration-300"
                >
                  {editingItem ? "Update Service" : "Add Service"}
                </button>
              </form>
            </div>
            <div className="lg:w-[450px] rounded-lg">
              {services.length > 0 && (
                <div
                  key={services[services.length - 1]._id}
                  className="mb-4 border p-4"
                >
                  <h2 className="font-bold text-center py-2">
                    {services[services.length - 1].title}
                  </h2>
                  <p className="text-justify">
                    {services[services.length - 1].description}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
        {!isFormOpen && (
          <div
            className="ag-theme-alpine mt-5"
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
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default Services;
