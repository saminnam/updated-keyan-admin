import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/keyan-white.png";
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineMiscellaneousServices } from "react-icons/md";
import { LiaBlogSolid } from "react-icons/lia";
import { FaRegFileCode } from "react-icons/fa";
import { PiListStarDuotone } from "react-icons/pi";
import { IoIosContact } from "react-icons/io";
import { RiTeamLine } from "react-icons/ri";
import { MdKeyboardArrowRight } from "react-icons/md";
import { CgFormatRight } from "react-icons/cg";
import { LiaClipboardListSolid } from "react-icons/lia";

const Navbar = ({ active, setActive }) => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const handleLinkClick = (link) => {
    setActive(link);
  };

  const toggleDropdown = (dropdown) => {
    setOpenDropdown((prev) => (prev === dropdown ? null : dropdown));
  };

  return (
    <nav>
      <aside className="h-screen py-8 px-12 lg:w-[280px] bg-[#2986FE] hidden lg:block sticky top-0 left-0 z-50">
        <div>
          <img src={logo} alt="logo" />
        </div>
        <ul className="mt-10 text-white">
          <li className="py-2 group" onClick={() => toggleDropdown("home")}>
            <Link to="/" onClick={() => handleLinkClick("Home")}>
              <div className="flex justify-between hover:bg-white hover:text-[#2986FE] transition-all duration-300 p-2 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="text-xl">
                    <IoHomeOutline />
                  </div>
                  <div>HOME</div>
                </div>
                <div className="text-2xl transition-transform duration-200 transform group-hover:translate-x-2">
                  <MdKeyboardArrowRight />
                </div>
              </div>
            </Link>
          </li>
          <li className="py-2 group">
            <Link to="/" onClick={() => toggleDropdown("services")}>
              <div className="flex justify-between hover:bg-white hover:text-[#2986FE] transition-all duration-300 p-2 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="text-xl">
                    <MdOutlineMiscellaneousServices />
                  </div>
                  <div>SERVICES</div>
                </div>
                <div className="text-2xl transition-transform duration-200 transform group-hover:translate-x-2">
                  <MdKeyboardArrowRight />
                </div>
              </div>
            </Link>
            {openDropdown === "services" && (
              <ul className="pl-8 mt-2 border-white border-t-2">
                <li>
                  <Link
                    to="/"
                    onClick={() => handleLinkClick("ServicesTable")}
                    className="flex gap-7 items-center"
                  >
                    <div className="text-white py-2 text-[15px] hover:translate-x-3 transition-all duration-300">
                      LIST SERVICE
                    </div>
                    <CgFormatRight className="text-xl text-white" />
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    onClick={() => handleLinkClick("ServicesForm")}
                    className="flex gap-6 items-center"
                  >
                    <div className=" py-2 text-[15px] hover:translate-x-3 transition-all duration-300">
                      ADD SERVICE
                    </div>
                    <LiaClipboardListSolid className="text-xl" />
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li className="py-2 group">
            <Link to="/" onClick={() => toggleDropdown("blogs")}>
              <div className="flex justify-between hover:bg-white hover:text-[#2986FE] transition-all duration-300 p-2 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="text-xl">
                    <LiaBlogSolid />
                  </div>
                  <div>BLOGS</div>
                </div>
                <div className="text-2xl transition-transform duration-200 transform group-hover:translate-x-2">
                  <MdKeyboardArrowRight />
                </div>
              </div>
            </Link>
            {openDropdown === "blogs" && (
              <ul className="pl-8 mt-2 border-white border-t-2">
                <li>
                  <Link
                    to="/"
                    onClick={() => handleLinkClick("BlogsTable")}
                    className="flex gap-7 items-center"
                  >
                    <div className="text-white text-[15px] py-2 hover:translate-x-3 transition-all duration-300">
                      LIST BLOG
                    </div>
                    <CgFormatRight className="text-xl text-white" />
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    onClick={() => handleLinkClick("BlogsForm")}
                    className="flex gap-6 items-center"
                  >
                    <div className="text-white text-[15px] py-2 hover:translate-x-3 transition-all duration-300">
                      ADD BLOG
                    </div>
                    <LiaClipboardListSolid className="text-xl" />
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li className="py-2 group">
            <Link to="/" onClick={() => toggleDropdown("portfolios")}>
              <div className="flex justify-between hover:bg-white hover:text-[#2986FE] transition-all duration-300 p-2 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="text-xl">
                    <FaRegFileCode />
                  </div>
                  <div>PORTFOLIOS</div>
                </div>
                <div className="text-2xl transition-transform duration-200 transform group-hover:translate-x-2">
                  <MdKeyboardArrowRight />
                </div>
              </div>
            </Link>
            {openDropdown === "portfolios" && (
              <ul className="pl-8 mt-2 border-white border-t-2">
                <li>
                  <Link
                    to="/"
                    onClick={() => handleLinkClick("PortfolioTable")}
                    className="flex gap-5 items-center"
                  >
                    <div className="text-white text-[15px] py-2 hover:translate-x-3 transition-all duration-300">
                      LIST PORTFOLIO
                    </div>
                    <CgFormatRight className="text-xl text-white" />
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    onClick={() => handleLinkClick("PortfolioForm")}
                    className="flex gap-4 items-center"
                  >
                    <div className="text-white text-[15px] py-2 hover:translate-x-3 transition-all duration-300">
                      ADD PORTFOLIO
                    </div>
                    <LiaClipboardListSolid className="text-xl" />
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li className="py-2 group">
            <Link to="/" onClick={() => toggleDropdown("testimonials")}>
              <div className="flex justify-between hover:bg-white hover:text-[#2986FE] transition-all duration-300 p-2 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="text-xl">
                    <PiListStarDuotone />
                  </div>
                  <div>TESTIMONIALS</div>
                </div>
                <div className="text-2xl transition-transform duration-200 transform group-hover:translate-x-2">
                  <MdKeyboardArrowRight />
                </div>
              </div>
            </Link>
            {openDropdown === "testimonials" && (
              <ul className="pl-8 mt-2 border-white border-t-2">
                <li>
                  <Link
                    to="/"
                    onClick={() => handleLinkClick("TestimonialsTable")}
                    className="flex gap-3 items-center"
                  >
                    <div className="text-white text-[15px] py-2 hover:translate-x-3 transition-all duration-300">
                      LIST TESTIMONIAL
                    </div>
                    <CgFormatRight className="text-xl text-white" />
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    onClick={() => handleLinkClick("TestimonialsForm")}
                    className="flex gap-2 items-center"
                  >
                    <div className="text-white text-[15px] py-2 hover:translate-x-3 transition-all duration-300">
                      ADD TESTIMONIAL
                    </div>
                    <LiaClipboardListSolid className="text-xl" />
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li className="py-2 group">
            <Link to="/" onClick={() => toggleDropdown("team")}>
              <div className="flex justify-between hover:bg-white hover:text-[#2986FE] transition-all duration-300 p-2 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="text-xl">
                    <RiTeamLine />
                  </div>
                  <div>TEAM</div>
                </div>
                <div className="text-2xl transition-transform duration-200 transform group-hover:translate-x-2">
                  <MdKeyboardArrowRight />
                </div>
              </div>
            </Link>
            {openDropdown === "team" && (
              <ul className="pl-8 mt-2 border-white border-t-2">
                <li>
                  <Link
                    to="/"
                    onClick={() => handleLinkClick("TeamTable")}
                    className="flex gap-7 items-center"
                  >
                    <div className="text-white text-[15px] py-2 hover:translate-x-3 transition-all duration-300">
                      LIST TEAM
                    </div>
                    <CgFormatRight className="text-xl text-white" />
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    onClick={() => handleLinkClick("TeamForm")}
                    className="flex gap-6 items-center"
                  >
                    <div className="text-white text-[15px] py-2 hover:translate-x-3 transition-all duration-300">
                      ADD TEAM
                    </div>
                    <LiaClipboardListSolid className="text-xl" />
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li className="py-2 group" onClick={() => toggleDropdown("contact")}>
            <Link to="/" onClick={() => handleLinkClick("Contact")}>
              <div className="flex justify-between hover:bg-white hover:text-[#2986FE] transition-all duration-300 p-2 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="text-xl">
                    <IoIosContact />
                  </div>
                  <div>CONTACTS</div>
                </div>
                <div className="text-2xl transition-transform duration-200 transform group-hover:translate-x-2">
                  <MdKeyboardArrowRight />
                </div>
              </div>
            </Link>
          </li>
        </ul>
      </aside>
    </nav>
  );
};

export default Navbar;
