import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { AgGridReact } from "ag-grid-react";
import { RiDeleteBinLine } from "react-icons/ri";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { setContacts } from "../Redux/Actions/ContactsActions";
import { setError } from "../Redux/Actions/CommonActions";
import { API_BASE_URL } from "./Api";
import { setSelectedId, setPopUpVisible } from "../Redux/Actions/CommonActions";
import Loader from "./Loader";
import DeletePopUp from "../Modals/DeletePopUp";

const Contact = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { contacts } = useSelector((state) => state.contactsInfo);
  const { error, selectedId } = useSelector((state) => state.commonInfo);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = () => {
    setLoading(true);
    setError(null);
    axios
      .get(`${API_BASE_URL}contacts`)
      .then((response) => {
        dispatch(setContacts(response.data));
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to fetch data. Please try again later.");
        console.error("Error fetching data:", error.message);
      });
  };
  const confirmDelete = (id) => {
    dispatch(setSelectedId(id));
    dispatch(setPopUpVisible(true));
  };

  const handleDelete = () => {
    if (selectedId) {
      axios
        .delete(`${API_BASE_URL}contacts/${selectedId}`)
        .then(() => {
          fetchContacts();
          dispatch(setPopUpVisible(false));
          setSelectedId(null);
        })
        .catch((error) => {
          setError("Failed to delete. Please try again.", error.message);
        });
    }
  };

  const cancelDelete = () => {
    dispatch(setPopUpVisible(false));
    setSelectedId(null);
  };

  const columnDefs = [
    {
      headerName: "Name",
      field: "name",
      sortable: true,
      filter: true,
      pinned: "left",
    },
    { headerName: "Email", field: "email", sortable: true, filter: true },
    { headerName: "Subject", field: "subject", sortable: true, filter: true },
    {
      headerName: "Message",
      field: "message",
      sortable: true,
      filter: true,
      width: 250,
    },
    { headerName: "Status", field: "status", sortable: true, filter: true },
    {
      headerName: "Actions",
      field: "actions",
      pinned: "right",
      cellRenderer: (params) => (
        <div className="flex items-center justify-center mt-3">
          <RiDeleteBinLine
            className="text-xl cursor-pointer"
            onClick={() => confirmDelete(params.data._id)}
          />
        </div>
      ),
      width: 100,
    },
  ];

  return (
    <section className="mt-2 mx-10">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold md:text-3xl font-serif">Messages</h2>
      </div>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {loading && loading ? (
        <div className="flex justify-center items-center h-[90vh]">
          <Loader />
        </div>
      ) : (
        <div
          className="ag-theme-alpine mt-2"
        >
          <AgGridReact
            rowData={contacts}
            columnDefs={columnDefs}
            pagination={true}
            paginationPageSize={10}
            domLayout="autoHeight"
            getRowHeight={() => 50}
            style={{ width: "100%" }}
          />
        </div>
      )}
      <DeletePopUp onConfirmDelete={handleDelete} onCancel={cancelDelete} />
    </section>
  );
};

export default Contact;
