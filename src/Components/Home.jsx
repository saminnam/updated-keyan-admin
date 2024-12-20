import { useEffect, useState } from "react";
import Contact from "./Contact";
import SubHome from "./SubHome";
import { IoIosNotificationsOutline } from "react-icons/io";
import { CiLogout } from "react-icons/ci";
import axios from "axios";
import Navbar from "./Header";
import { API_BASE_URL } from "./Api";
import { useNavigate } from "react-router-dom";
import BlogsTable from "../DataTables/BlogsTable";
import BlogsForm from "../Forms/BlogsForm";
import ServicesForm from "../Forms/ServicesForm";
import ServicesTable from "../DataTables/ServicesTable";
import PortfoliosForm from "../Forms/PortfoliosForm";
import PortfolioTable from "../DataTables/PortfolioTable";
import TestimonialsForm from "../Forms/TestimonialsForm";
import TestimonialsTable from "../DataTables/TestimonialsTable";
import TeamForm from "../Forms/TeamForm";
import TeamTable from "../DataTables/TeamTable";

const Home = ({ active, setActive }) => {
  const [contactLen, setContactLen] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    contactFetcher();
  }, []);

  const contactFetcher = () => {
    axios
      .get(`${API_BASE_URL}contacts`)
      .then((res) => setContactLen(res.data))
      .catch((error) => console.log(error));
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <section className="relative">
      <div className="h-14 bg-white rounded-r-lg w-[82%] border-b-2 right-0 fixed top-0 z-50">
        <div className="flex justify-between items-center h-full text-[#2986FE] pr-6">
          <h2 className="font-mono text-xl ms-4">DashBoard</h2>
          {contactLen.length > 0 && (
            <div className="bg-red-500 w-2 h-2 rounded-full absolute right-20 top-3"></div>
          )}
          <div className="flex">
            <IoIosNotificationsOutline
              className="mx-2 cursor-pointer text-3xl"
              onClick={() => setActive("Contact")}
            />
            <CiLogout
              className="mx-2 cursor-pointer text-3xl"
              onClick={handleLogout}
            />
          </div>
        </div>
      </div>
      <div className="flex">
        <Navbar active={active} setActive={setActive} />
        <div className="w-full mt-16 relative z-0">
          {active === "Home" && <SubHome />}
          {active === "ServicesForm" && <ServicesForm />}
          {active === "ServicesTable" && <ServicesTable />}
          {active === "BlogsTable" && <BlogsTable />}
          {active === "BlogsForm" && <BlogsForm />}
          {active === "PortfolioForm" && <PortfoliosForm />}
          {active === "PortfolioTable" && <PortfolioTable />}
          {active === "TestimonialsForm" && <TestimonialsForm />}
          {active === "TestimonialsTable" && <TestimonialsTable />}
          {active === "TeamForm" && <TeamForm />}
          {active === "TeamTable" && <TeamTable />}
          {active === "Contact" && <Contact />}
        </div>
      </div>
    </section>
  );
};

export default Home;
