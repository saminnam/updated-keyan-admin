import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { AgGridReact } from "ag-grid-react";
import { RiCodeView, RiDeleteBinLine } from "react-icons/ri";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import {
  setContacts,
  setError,
  setLoading,
} from "../Redux/Actions/ContactsActions";
import ShortInfo from "./ShortInfo";
import { API_BASE_URL } from "./Api";

const Contact = () => {
  const dispatch = useDispatch();
  const { contacts } = useSelector(
    (state) => state.contactsInfo
  );
  const [selectedMessage, setSelectedMessage] = useState(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = () => {
    dispatch(setLoading(true));
    axios
      .get(`${API_BASE_URL}contacts`)
      .then((response) => {
        dispatch(setContacts(response.data));
      })
      .catch((error) => {
        dispatch(setError(error.message));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

  const handleViewClick = (contact) => {
    axios
      .put(`${API_BASE_URL}/contacts/${contact._id}/read`)
      .then(() => {
        const updatedContacts = contacts.map((msg) =>
          msg._id === contact._id ? { ...msg, status: "Read" } : msg
        );
        dispatch(setContacts(updatedContacts));
        setSelectedMessage({ ...contact, status: "Read" });
      })
      .catch((error) => {
        console.error("Error marking contact as read", error);
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(`${API_BASE_URL}/contacts/${id}`)
      .then(() => {
        fetchContacts();
      })
      .catch((error) => {
        console.error("Error deleting contact", error);
      });
  };

  // const handleDeleteAll = () => {
  //   axios
  //     .delete(`${API_BASE_URL}/contacts`)
  //     .then((response) => {
  //       console.log("Delete all response:", response.data);
  //       dispatch(setContacts([]));
  //       setSelectedMessage(null);
  //     })
  //     .catch((error) => {
  //       console.error("Error deleting all contacts", error.response || error);
  //     });
  // };

  const columnDefs = [
    { headerName: "Name", field: "name", sortable: true, filter: true },
    { headerName: "Email", field: "email", sortable: true, filter: true },
    { headerName: "Subject", field: "subject", sortable: true, filter: true },
    { headerName: "Message", field: "message", sortable: true, filter: true },
    { headerName: "Status", field: "status", sortable: true, filter: true },
    {
      headerName: "Actions",
      field: "actions",
      cellRenderer: (params) => (
        <div className="flex space-x-2 mt-2">
          <RiCodeView
            className="text-xl cursor-pointer"
            onClick={() => handleViewClick(params.data)}
          />
          <RiDeleteBinLine
            className="text-xl cursor-pointer"
            onClick={() => handleDelete(params.data._id)}
          />
        </div>
      ),
    },
  ];

  return (
    <section className="mt-14">
      <ShortInfo />
      <div className="mx-10">
        <div className="flex justify-between mb-5 mt-20 items-center">
          <h2 className="text-2xl font-bold md:text-5xl font-serif">
            Messages
          </h2>
          {/* <button
            onClick={handleDeleteAll}
            className="bg-transparent text-xs font-medium uppercase tracking-tight rounded-lg border hover:bg-blue-500 hover:text-white transition-transform duration-300 border-blue-500 text-blue-500 px-3 lg:px-8 py-3"
          >
            Delete All
          </button> */}
        </div>
        <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
          <AgGridReact
            rowData={contacts}
            columnDefs={columnDefs}
            pagination={true}
            paginationPageSize={10}
            domLayout="autoHeight"
          />
        </div>
        {selectedMessage && (
          <div className="p-5 border border-gray-300 rounded-lg bg-gray-100 relative">
            <button
              onClick={() => setSelectedMessage(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              &#x2715;
            </button>
            <h3 className="text-3xl font-bold mb-4 font-serif">
              Message Details
            </h3>
            <p>
              <strong>Name:</strong> {selectedMessage.name}
            </p>
            <p>
              <strong>Email:</strong> {selectedMessage.email}
            </p>
            <p>
              <strong>Subject:</strong> {selectedMessage.subject}
            </p>
            <p>
              <strong>Message:</strong> {selectedMessage.message}
            </p>
            <p>
              <strong>Status:</strong> {selectedMessage.status}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Contact;
