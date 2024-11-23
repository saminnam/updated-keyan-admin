import { useEffect } from "react";
import { API_BASE_URL } from "./Api";
import ShortInfo from "./ShortInfo";
import {
  addTestimonial,
  setPersonRating,
  setEditingItem,
  resetForm,
  openForm,
  setContent,
  setImage,
  setPersonName,
} from "../Redux/Actions/TestimonialsActions";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin2Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const Testimonials = () => {
  const dispatch = useDispatch();
  const {
    testimonials,
    openForm: isFormOpen,
    editingItem,
    name,
    content,
    rating,
  } = useSelector((state) => state.testimonialsInfo);

  useEffect(() => {
    fetchTestimonials();
  }, []);
  const fetchTestimonials = () => {
    axios
      .get(`${API_BASE_URL}testimonials`)
      .then((response) => {
        dispatch(addTestimonial(response.data));
      })
      .catch((error) => {
        console.error("Error fetching testimonials:", error);
      });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      dispatch(setImage(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataObj = new FormData();
    const fileInput = document.querySelector("input[type='file']");
    if (fileInput && fileInput.files[0]) {
      formDataObj.append("image", fileInput.files[0]);
    }
    formDataObj.append("name", name);
    formDataObj.append("content", content);
    formDataObj.append("rating", rating);

    if (editingItem) {
      await axios.put(
        `${API_BASE_URL}testimonials/${editingItem._id}`,
        formDataObj
      );
    } else {
      await axios.post(`${API_BASE_URL}testimonials`, formDataObj);
    }
    fetchTestimonials();
    dispatch(openForm(false));
    dispatch(resetForm());
    dispatch(setEditingItem(null));
  };

  // Handle edit
  const handleEdit = (testimonial) => {
    dispatch(setImage(null));
    dispatch(openForm(true));
    dispatch(setPersonRating(testimonial.rating));
    dispatch(setPersonName(testimonial.name));
    dispatch(setEditingItem(testimonial));
    dispatch(setContent(testimonial.content));
  };

  const handleDelete = async (id) => {
    await axios
      .delete(`${API_BASE_URL}testimonials/${id}`)
      .then(() => {
        fetchTestimonials();
      })
      .catch((error) => {
        console.error("Error deleting testimonial:", error);
      });
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
            <h2 className="text-2xl font-bold md:text-5xl font-serif">
              Testimonials
            </h2>
            <button
              className="border py-3 px-5 text-xs font-medium uppercase tracking-tight rounded-lg hover:bg-blue-500 hover:text-white transition-transform duration-300 border-blue-500 text-blue-500"
              onClick={handleFormToggle}
            >
              {!isFormOpen ? "Add" : "Close"}
            </button>
          </div>
          {isFormOpen && (
            <form onSubmit={handleSubmit} className="mb-6 mt-10">
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => dispatch(setPersonName(e.target.value))}
                placeholder="Name"
                required
                className="border border-gray-300 rounded p-2 mb-2 w-full"
              />
              <input
                type="file"
                name="image"
                onChange={handleFileChange}
                accept="image/*"
                className="mt-1 mb-3 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100"
              />
              {/* {imagePreview && (
                <div className="mb-2">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="h-24 w-24 object-cover rounded"
                  />
                </div>
              )} */}
              <textarea
                name="content"
                value={content}
                onChange={(e) => dispatch(setContent(e.target.value))}
                placeholder="Content"
                required
                className="border border-gray-300 rounded p-2 mb-2 w-full"
              />
              <input
                type="number"
                name="rating"
                value={rating}
                onChange={(e) => dispatch(setPersonRating(e.target.value))}
                min="1"
                max="5"
                required
                className="border border-gray-300 rounded p-2 mb-2 w-full"
              />
              <button
                type="submit"
                className="bg-blue-500 text-xs font-medium uppercase tracking-tight mt-2 text-white px-4 py-3 rounded-md w-full hover:bg-transparent hover:text-blue-500 border border-blue-500 duration-300"
              >
                {editingItem ? "Update" : "Add"} Testimonial
              </button>
            </form>
          )}
        </div>
        {!isFormOpen && (
          <div className="mx-10">
            <div className="mt-5">
              <div className="overflow-x-auto">
                <table className="w-full table-auto border border-collapse text-center">
                  <thead className="bg-blue-500 text-white">
                    <tr>
                      <th className="border border-gray-300 p-2 text-xs font-medium uppercase tracking-wider">
                        Name
                      </th>
                      <th className="border border-gray-300 p-2 text-xs font-medium uppercase tracking-wider">
                        Image
                      </th>
                      <th className="border border-gray-300 p-2 text-xs font-medium uppercase tracking-wider">
                        Content
                      </th>
                      <th className="border border-gray-300 p-2 text-xs font-medium uppercase tracking-wider">
                        Rating
                      </th>
                      <th className="border border-gray-300 p-2 text-xs font-medium uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {testimonials.map((testimonial) => (
                      <tr
                        key={testimonial._id}
                        className="border hover:bg-gray-100 text-center border-gray-300"
                      >
                        <td className="border border-gray-300 p-2">
                          {testimonial.name}
                        </td>
                        <td className="border border-gray-300 p-2 flex justify-center">
                          <img
                            src={`http://localhost:3000/Images/${testimonial.image}`}
                            alt={testimonial.name}
                            style={{ width: "50px" }}
                            className="rounded"
                          />
                        </td>
                        <td className="border border-gray-300 p-2">
                          {testimonial.content}
                        </td>
                        <td className="border border-gray-300 p-2">
                          {testimonial.rating}
                        </td>
                        <td className="border border-gray-300 p-2">
                          <div className="flex justify-center gap-5 cursor-pointer items-center">
                            <FaRegEdit
                              onClick={() => handleEdit(testimonial)}
                              className="text-xl"
                            />

                            <RiDeleteBin2Line
                              onClick={() => handleDelete(testimonial._id)}
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
          </div>
        )}
      </section>
    </>
  );
};

export default Testimonials;
