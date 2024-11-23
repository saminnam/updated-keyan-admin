import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/keyan-white.png";
import { TbLogs } from "react-icons/tb";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { CgLogOut } from "react-icons/cg";
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineMiscellaneousServices } from "react-icons/md";
import { LiaBlogSolid } from "react-icons/lia";
import { FaRegFileCode } from "react-icons/fa";
import { PiListStarDuotone } from "react-icons/pi";
import { IoIosContact } from "react-icons/io";
import { RiTeamLine } from "react-icons/ri";
import { MdKeyboardArrowRight } from "react-icons/md";

const Navbar = ({ active, setActive }) => {
  const [isMobileView, setIsMobileView] = useState(false);
  const navigate = useNavigate();
  const handleLinkClick = (link) => {
    setActive(link);
    setIsMobileView(false);
  };

  const handleLogout = () => {
    // Remove auth token from localStorage
    localStorage.removeItem("authToken");
    // Redirect to the login page or a public page
    navigate("/login"); // Adjust the route based on your app structure
  };

  return (
    <nav>
      {/* Desktop and Tablet View */}
      <aside className="h-screen py-8 px-12 lg:w-[280px] bg-[#2986FE] hidden lg:block sticky top-0 left-0 z-50">
        <div>
          <img src={logo} alt="logo" />
        </div>
        <ul className="mt-10 text-white">
          {[
            { name: "HOME", icon: <IoHomeOutline />, link: "Home" },
            {
              name: "SERVICES",
              icon: <MdOutlineMiscellaneousServices />,
              link: "Services",
            },
            { name: "BLOGS", icon: <LiaBlogSolid />, link: "Blogs" },
            { name: "PORTFOLIOS", icon: <FaRegFileCode />, link: "Portfolios" },
            {
              name: "TESTIMONIALS",
              icon: <PiListStarDuotone />,
              link: "Testimonials",
            },
            { name: "TEAM", icon: <RiTeamLine />, link: "Team" },
            { name: "CONTACT", icon: <IoIosContact />, link: "Contact" },
          ].map((item) => (
            <li key={item.name} className="py-4 group">
              <Link to="/" onClick={() => handleLinkClick(item.link)}>
                <div className="flex justify-between hover:bg-white hover:text-[#2986FE] transition-all duration-300 p-2 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="text-xl">{item.icon}</div>
                    <div>{item.name}</div>
                  </div>
                  <div className="text-2xl transition-transform duration-200 transform group-hover:translate-x-2">
                    <MdKeyboardArrowRight />
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <div className="text-[#2986FE] flex mx-auto gap-2 group mt-8 p-2 justify-center bg-white rounded-lg">
          <CgLogOut className="text-2xl mt-1 transition-transform duration-200 transform group-hover:-translate-x-2" />
          <button onClick={handleLogout} className="text-lg font-semibold">
            LOGOUT
          </button>
        </div>
      </aside>
      {/* Mobile menu button */}
      <button
        className="absolute right-4 top-4 lg:hidden"
        onClick={() => setIsMobileView(!isMobileView)}
        aria-label="Toggle mobile menu"
      >
        {isMobileView ? (
          <IoIosCloseCircleOutline className="text-[#2986FE] text-4xl" />
        ) : (
          <TbLogs className="text-[#2986FE] text-4xl" />
        )}
      </button>
      {/* Mobile Menu - visible when `isMobileView` is true */}
      <aside
        className={`lg:hidden h-screen w-80 bg-[#2986FE] px-10 text-white fixed top-0 left-0 z-20 transform transition-transform duration-500 ease-in-out ${
          isMobileView ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex py-8">
          <img src={logo} alt="" className="w-52" />
        </div>
        <ul className="text-center">
          {[
            { name: "HOME", icon: <IoHomeOutline />, link: "Home" },
            {
              name: "SERVICES",
              icon: <MdOutlineMiscellaneousServices />,
              link: "Services",
            },
            { name: "BLOGS", icon: <LiaBlogSolid />, link: "Blogs" },
            { name: "PORTFOLIOS", icon: <FaRegFileCode />, link: "Portfolios" },
            {
              name: "TESTIMONIALS",
              icon: <PiListStarDuotone />,
              link: "Testimonials",
            },
            { name: "TEAM", icon: <RiTeamLine />, link: "Team" },
            { name: "CONTACT", icon: <IoIosContact />, link: "Contact" },
          ].map((item) => (
            <li key={item.name} className="py-3 group">
              <Link to="/" onClick={() => handleLinkClick(item.link)}>
                <div className="flex justify-between hover:bg-white hover:text-[#2986FE] transition-all duration-300 p-2">
                  <div className="flex items-center gap-2">
                    <div>{item.icon}</div>
                    <div>{item.name}</div>
                  </div>
                  <div className="text-2xl transition-transform duration-200 transform group-hover:translate-x-2">
                    <MdKeyboardArrowRight />
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <div className="text-[#2986FE] flex mx-auto gap-2 group mt-14 p-2 justify-center bg-white rounded-lg">
          <CgLogOut className="text-2xl mt-1 transition-transform duration-200 transform group-hover:-translate-x-2" />
          <button onClick={handleLogout} className="text-lg font-semibold">
            LOGOUT
          </button>
        </div>
      </aside>
    </nav>
  );
};

export default Navbar;
