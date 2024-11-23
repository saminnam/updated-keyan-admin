import { useEffect, useState } from "react";
import Services from "./Services";
import Portfolios from "./Portfolios";
import Blogs from "./Blogs";
import Testimonials from "./Testimonials";
import Contact from "./Contact";
import Team from "./Team";
import SubHome from "./SubHome";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoIosContact } from "react-icons/io";
import axios from "axios";
import Navbar from "./Header";
import { API_BASE_URL } from "./Api";

const Home = ({ active, setActive }) => {
  const [contactLen, setContactLen] = useState([]);
  const [customerList, setCustomerList] = useState([]);
  const [teamList, setTeamList] = useState([]);

  useEffect(() => {
    contactFetcher();
  }, []);

  const contactFetcher = () => {
    axios
      .get(`${API_BASE_URL}contacts`)
      .then((res) => setContactLen(res.data))
      .catch((error) => console.log(error));
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
            <IoIosContact className="mx-2 cursor-pointer text-3xl" />
          </div>
        </div>
      </div>
      {/* Main Layout */}
      <div className="flex">
        <Navbar active={active} setActive={setActive} />
        <div className="w-full mt-16 relative z-0">
          {active === "Home" && <SubHome />}
          {active === "Services" && <Services />}
          {active === "Blogs" && <Blogs />}
          {active === "Portfolios" && <Portfolios />}
          {active === "Testimonials" && (
            <Testimonials
              customerList={customerList}
              setCustomerList={setCustomerList}
            />
          )}
          {active === "Team" && (
            <Team
              customerList={customerList}
              setCustomerList={setCustomerList}
              teamList={teamList}
              setTeamList={setTeamList}
            />
          )}
          {active === "Contact" && <Contact />}
        </div>
      </div>
    </section>
  );
};

export default Home;
