import { useEffect } from "react";
import { API_BASE_URL } from "./Api";
import ShortInfo from "./ShortInfo";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin2Line } from "react-icons/ri";
import {
  addPortfolio,
  setEditingItem,
  resetForm,
  openForm,
  setTitle,
  setImage,
  setWebsiteUrl,
} from "../Redux/Actions/PortfolioActions";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
const Portfolio = () => {
  const dispatch = useDispatch();
  const {
    portfolioItems,
    openForm: isFormOpen,
    editingItem,
    title,
    websiteUrl,
  } = useSelector((state) => state.portfoliosInfo);

  useEffect(() => {
    fetchPortfolioItems();
  }, []);

  const fetchPortfolioItems = () => {
    axios
      .get(`${API_BASE_URL}portfolio`)
      .then((response) => {
        dispatch(addPortfolio(response.data));
      })
      .catch((error) => {
        console.error("Error fetching portfolio items:", error);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    const fileInput = document.querySelector("input[type='file']");
    if (fileInput && fileInput.files[0]) {
      formData.append("image", fileInput.files[0]);
    }
    formData.append("title", title);
    formData.append("websiteUrl", websiteUrl);
    if (editingItem) {
      await axios.put(`${API_BASE_URL}portfolio/${editingItem._id}`, formData);
    } else {
      await axios.post(`${API_BASE_URL}portfolio`, formData);
    }
    fetchPortfolioItems();
    dispatch(openForm(false));
    dispatch(resetForm());
    dispatch(setEditingItem(null));
  };

  const handleEdit = (item) => {
    dispatch(setTitle(item.title));
    dispatch(setWebsiteUrl(item.websiteUrl));
    dispatch(setEditingItem(item));
    dispatch(openForm(true));
    dispatch(setImage(null));
  };

  const handleDelete = async (id) => {
    await axios
      .delete(`${API_BASE_URL}portfolio/${id}`)
      .then(() => {
        fetchPortfolioItems();
      })
      .catch((error) => {
        console.error("Error deleting portfolio item:", error);
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
    <>
      <section className="mt-14">
        <ShortInfo />
        <div className="mx-10 mt-14">
          <div className="flex justify-between mb-5 mt-20 items-center">
            <h2 className="text-2xl font-bold md:text-5xl font-serif ">
              {editingItem ? "Edit Portfolio" : "Add Portfolio"}
            </h2>
            <button
              className="border py-3 px-5 rounded-lg text-xs font-medium uppercase tracking-tight hover:bg-blue-500 hover:text-white transition-transform duration-300 border-blue-500 text-blue-500"
              onClick={handleFormToggle}
            >
              {!isFormOpen ? "Add" : "Close"}
            </button>
          </div>

          {isFormOpen && (
            <div className="flex justify-between flex-wrap gap-5">
              <div className="w-[400px] lg:w-[640px] border p-5 rounded-lg">
                <form className="mb-6 mt-10" onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Title
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => dispatch(setTitle(e.target.value))}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Website URL
                    </label>
                    <input
                      type="url"
                      value={websiteUrl}
                      onChange={(e) => dispatch(setWebsiteUrl(e.target.value))}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Image
                    </label>
                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-blue-500 text-xs font-medium uppercase tracking-tight text-white px-4 py-3 rounded-md w-full hover:bg-transparent hover:text-blue-500 border border-blue-500 duration-300"
                  >
                    {editingItem ? "Update Portfolio" : "Add Portfolio"}
                  </button>
                </form>
              </div>
              <div className="lg:w-[450px] ">
                {portfolioItems.length > 0 && (
                  <div key={portfolioItems[portfolioItems.length - 1].id}>
                    <img
                      src={`http://localhost:3000/Images/${
                        portfolioItems[portfolioItems.length - 1].image
                      }`}
                      alt={portfolioItems[portfolioItems.length - 1].title}
                      className="object-cover w-full h-[250px] rounded-lg"
                    />
                    <h2 className="text-center font-bold mt-4">
                      {portfolioItems[portfolioItems.length - 1].title}
                    </h2>
                  </div>
                )}
              </div>
            </div>
          )}
          {!isFormOpen && (
            <div className="mt-5">
              <div className="overflow-x-auto">
                <table className="w-full table-auto border-collapse divide-gray-200 text-center">
                  <thead className="bg-blue-500 text-white">
                    <tr>
                      <th className="py-2 px-4 border text-xs font-medium uppercase tracking-wider">
                        Image
                      </th>
                      <th className="py-2 px-4 border text-xs font-medium uppercase tracking-wider">
                        Title
                      </th>
                      <th className="py-2 px-4 border text-xs font-medium uppercase tracking-wider">
                        Website URL
                      </th>
                      <th className="py-2 px-4 border text-xs font-medium uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {portfolioItems.map((item) => (
                      <tr
                        key={item._id}
                        className=" hover:bg-gray-100 text-center border-gray-300"
                      >
                        <td className="py-2 px-4 border flex justify-center">
                          <img
                            src={`http://localhost:3000/Images/${item.image}`}
                            alt={item.title}
                            className="w-16 h-16 object-cover rounded"
                          />
                        </td>
                        <td className="py-2 px-4 border">
                          <div className="text-sm font-medium text-gray-900">
                            {item.title}
                          </div>
                        </td>
                        <td className="py-2 px-4 border">
                          <a
                            href={item.websiteUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline"
                          >
                            {item.websiteUrl}
                          </a>
                        </td>
                        <td className="border px-4 py-2">
                          <div className="flex justify-center gap-5 cursor-pointer items-center">
                            <FaRegEdit
                              onClick={() => handleEdit(item)}
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
    </>
  );
};

export default Portfolio;
