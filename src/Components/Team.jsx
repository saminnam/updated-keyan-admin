import { useEffect } from "react";
import ShortInfo from "./ShortInfo";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin2Line } from "react-icons/ri";
import { API_BASE_URL } from "./Api";
import {
  addPerson,
  addPersonRole,
  setEditingItem,
  setImage,
  setPersonName,
  resetForm,
  openForm,
} from "../Redux/Actions/TeamsActions";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const TeamTable = () => {
  const dispatch = useDispatch();
  const {
    teamMembers,
    openForm: isFormOpen,
    editingItem,
    name,
    role,
  } = useSelector((state) => state.teamMembersInfo);

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = () => {
    axios
      .get(`${API_BASE_URL}team`)
      .then((response) => {
        dispatch(addPerson(response.data));
      })
      .catch((error) => {
        console.error("Error fetching team members:", error);
      });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("Name", name);
    formData.append("Role", role);
    const fileInput = document.querySelector("input[type='file']");
    if (fileInput && fileInput.files[0]) {
      formData.append("image", fileInput.files[0]);
    }

    if (editingItem) {
      await axios.put(`${API_BASE_URL}team/${editingItem._id}`, formData); // Use item ID
    } else {
      await axios.post(`${API_BASE_URL}team`, formData);
    }
    fetchTeamMembers();
    dispatch(openForm(false));
    dispatch(resetForm());
    dispatch(setEditingItem(null));
  };

  const handleEditClick = (item) => {
    dispatch(setEditingItem(item));
    dispatch(setPersonName(item.Name));
    dispatch(addPersonRole(item.Role));
    dispatch(openForm(true));
  };

  const handleDelete = async (id) => {
    await axios
      .delete(`${API_BASE_URL}team/${id}`)
      .then(() => {
        fetchTeamMembers();
      })

      .catch((error) => {
        console.error("Error deleting team member:", error);
      });
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      dispatch(setImage(file));
    }
  };

  const handleFormToggle = () => {
    dispatch(openForm(!isFormOpen));
    if (!isFormOpen) {
      dispatch(resetForm());
      dispatch(setEditingItem(null));
    }
  };

  return (
    <section className="mt-14">
      <ShortInfo />
      <div className="mx-10 mb-5 mt-20 items-center">
        <div className="flex justify-between mb-5 mt-20 items-center">
          <h2 className="text-2xl font-bold md:text-5xl font-serif">
            Team Members
          </h2>
          <button
            className="border py-3 px-5 text-xs font-medium uppercase tracking-tight rounded-lg hover:bg-blue-500 hover:text-white transition-transform duration-300 border-blue-500 text-blue-500"
            onClick={handleFormToggle}
          >
            {!isFormOpen ? "Add Team" : "Close Team"}
          </button>
        </div>
        {isFormOpen && (
          <form onSubmit={handleFormSubmit} className="mb-8 mt-5">
            <div className="mb-4">
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                name="Name"
                value={name}
                onChange={(e) => dispatch(setPersonName(e.target.value))}
                className="border rounded w-full py-2 px-3"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Role</label>
              <input
                type="text"
                name="Role"
                value={role}
                onChange={(e) => dispatch(addPersonRole(e.target.value))}
                className="border rounded w-full py-2 px-3"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Image</label>
              <input
                type="file"
                name="image"
                onChange={handleFileChange}
                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100"
                required={!editingItem}
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-xs font-medium uppercase tracking-tight mt-2 text-white px-4 py-3 rounded-md w-full hover:bg-transparent hover:text-blue-500 border border-blue-500 duration-300"
            >
              {editingItem ? "Update Team Member" : "Add Team Member"}
            </button>
          </form>
        )}
        {!isFormOpen && (
          <div className="mt-5">
            <div className="overflow-x-auto">
              <table className="w-full table-auto bg-white border border-gray-200">
                <thead className="bg-blue-500 text-white">
                  <tr>
                    <th className="py-2 px-4 border text-xs font-medium uppercase tracking-wider">
                      Name
                    </th>
                    <th className="py-2 px-4 border text-xs font-medium uppercase tracking-wider">
                      Role
                    </th>
                    <th className="py-2 px-4 border text-xs font-medium uppercase tracking-wider">
                      Image
                    </th>
                    <th className="py-2 px-4 border text-xs font-medium uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {teamMembers.map((item) => (
                    <tr
                      key={item._id}
                      className="text-center  hover:bg-gray-100 border-gray-300"
                    >
                      <td className="py-2 px-4 border">{item.Name}</td>
                      <td className="py-2 px-4 border">{item.Role}</td>
                      <td className="py-2 px-4 border flex justify-center">
                        <img
                          src={`http://localhost:3000/Images/${item.image}`}
                          alt={item.Name}
                          className="h-16 w-16 object-cover rounded"
                        />
                      </td>
                      <td className="py-2 px-4 border-b">
                        <div className="flex justify-center gap-5 cursor-pointer items-center">
                          <FaRegEdit
                            onClick={() => handleEditClick(item)}
                            className="text-xl"
                          />

                          <RiDeleteBin2Line
                            onClick={() => handleDelete(item._id)}
                            className="text-xl"
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default TeamTable;
