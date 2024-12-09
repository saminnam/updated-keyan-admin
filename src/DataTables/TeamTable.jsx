import { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin2Line } from "react-icons/ri";
import { API_BASE_URL } from "../Components/Api";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import {
  addPerson,
  addPersonRole,
  setEditingItem,
  setPersonName,
} from "../Redux/Actions/TeamsActions";
import {
  setLoading,
  setError,
  setPopUpVisible,
  setSelectedId,
} from "../Redux/Actions/CommonActions";
import TeamForm from "../Forms/TeamForm";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import DeletePopUp from "../Modals/DeletePopUp";

const TeamTable = () => {
  const [formVisible, setFormVisible] = useState(false);
  const dispatch = useDispatch();
  const { teamMembers } = useSelector((state) => state.teamMembersInfo);
  const { error, loading, selectedId } = useSelector(
    (state) => state.commonInfo
  );

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = () => {
    setLoading(true);
    setError(null);
    dispatch(setPopUpVisible(false));
    axios
      .get(`${API_BASE_URL}team`)
      .then((response) => {
        dispatch(addPerson(response.data));
        setLoading(false);
      })
      .catch((error) => {
        setError(
          "Failed to fetch team members Please try again later.",
          error.message
        );
      });
  };

  const handleEditClick = (item) => {
    dispatch(setEditingItem(item));
    dispatch(setPersonName(item.Name));
    dispatch(addPersonRole(item.Role));
    setFormVisible(true);
  };

  const confirmDelete = (id) => {
    dispatch(setSelectedId(id));
    dispatch(setPopUpVisible(true));
  };

  const handleDelete = () => {
    if (selectedId) {
      axios
        .delete(`${API_BASE_URL}team/${selectedId}`)
        .then(() => {
          fetchTeamMembers();
          dispatch(setPopUpVisible(false));
          setSelectedId(null);
        })
        .catch((error) => {
          setError(
            "Error deleting team member, Please try again.",
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
      headerName: "Name",
      field: "Name",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Role",
      field: "Role",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Image",
      field: "image",
      cellRenderer: (params) => (
        <img
          src={`http://localhost:3000/Images/${params.value}`}
          alt={params.data.Name}
          className="h-16 w-16 object-cover rounded"
        />
      ),
    },
    {
      headerName: "Actions",
      field: "actions",
      cellRenderer: (params) => (
        <div className="flex mt-3 gap-5 cursor-pointer items-center">
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
              / List Team &#8594;
            </button>
          </div>
          <TeamForm />
        </>
      ) : (
        <div className="mt-2 mx-10">
          <h2 className="text-3xl font-serif font-bold">Team Members List</h2>{" "}
          <div className="ag-theme-alpine mt-1" style={{ width: "100%" }}>
            <AgGridReact
              rowData={teamMembers}
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

export default TeamTable;
