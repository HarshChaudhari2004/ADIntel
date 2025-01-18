import React from "react";
import "./SidebarList.css";
import darkLogo from "../../Images/DarkLogo.png";
import { FaHome, FaUniversity } from "react-icons/fa";
import { FaArrowTrendUp } from "react-icons/fa6";
import { IoPersonSharp } from "react-icons/io5";
import { GrProjects } from "react-icons/gr";
import { SiHyperskill } from "react-icons/si";
import { MdEmail } from "react-icons/md";
import { TiDocumentText } from "react-icons/ti";
import { CgInsights } from "react-icons/cg";
import { SiGoogleanalytics } from "react-icons/si";
import { FaRegLightbulb } from "react-icons/fa6";
import { MdModeComment } from "react-icons/md";

const SidebarList = ({ expandSidebar, setActiveComponent, activeComponent }) => {
    return (
        <React.Fragment>
            {expandSidebar ? (
                <div className="navbar-items">
                    <div className="sidebar-logo">
                        {/* Replace the profile picture with the dark logo */}
                        <img src={darkLogo} alt="logo" />
                    </div>
                    <hr />
                    <ul>
                        <li 
                            className={`nav-item ${activeComponent === "home" ? "active" : ""}`}
                            onClick={() => setActiveComponent("home")}
                        >
                            <FaHome size={30} />Home
                        </li>
                        <li className="nav-item"><CgInsights size={30} />Insights</li>
                        <li 
                            className={`nav-item ${activeComponent === "analytics" ? "active" : ""}`}
                            onClick={() => setActiveComponent("analytics")}
                        >
                            <SiGoogleanalytics size={30} />Analytics
                        </li>
                        <li className="nav-item"><FaRegLightbulb size={30} />AI Suggestions</li>
                        <li className="nav-item"><FaArrowTrendUp size={30} />Trends</li>
                        <li className="nav-item"><MdModeComment size={30} />AI chatbot</li>
                    </ul>
                </div>
            ) : (
                <div className="navbar-items-only-icons">
                    <ul>
                        <li className="nav-item"><FaHome size={30} /></li>
                        <li className="nav-item"><IoPersonSharp size={30} /></li>
                        <li className="nav-item"><FaArrowTrendUp size={30} /></li>
                        <li className="nav-item"><GrProjects size={30} /></li>
                        <li className="nav-item"><SiHyperskill size={30} /></li>
                        <li className="nav-item"><FaUniversity size={30} /></li>
                        <li className="nav-item"><MdEmail size={30} /></li>
                        <li className="nav-item"><TiDocumentText size={30} /></li>
                    </ul>
                </div>
            )}
        </React.Fragment>
    );
};

export default SidebarList;
