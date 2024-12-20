import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
// import { AgGridReact } from "ag-grid-react";
// import { RiCodeView, RiDeleteBinLine } from "react-icons/ri";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { setContacts } from "../Redux/Actions/ContactsActions";
import { setError } from "../Redux/Actions/CommonActions";
import ShortInfo from "../Components/ShortInfo";
import { API_BASE_URL } from "./Api";
import ChartComponent from "../Graph/Graph";
// import Loader from "./Loader";

const SubHome = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  // const { contacts } = useSelector((state) => state.contactsInfo);
  // const [selectedMessage, setSelectedMessage] = useState(null);

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
        setError(error.message);
      });
  };

  return (
    <section className="mt-14">
      <ShortInfo />
      <ChartComponent/>
    </section>
  );
};

export default SubHome;
