import React from "react";
import "./SidebarList.css";
import profilepic from "../Images/Profile.jpg";
import { FaHome, FaUniversity } from "react-icons/fa";
import { FaArrowTrendUp } from "react-icons/fa6";
import { IoPersonSharp } from "react-icons/io5";
import { GrProjects } from "react-icons/gr";
import { SiHyperskill } from "react-icons/si";
import { MdEmail } from "react-icons/md";
import { TiDocumentText } from "react-icons/ti";

const SidebarList = ({ expandSidebar }) => {
    return (
        <React.Fragment>
            {expandSidebar ? (
                <div className="navbar-items">
                    <div className="sidebar-profile-pic">
                        <img src={profilepic} alt="profile" />
                    </div>
                    <hr></hr>
                    <ul>
                        <li className="nav-item"><FaHome size={30} />Home</li>
                        <li className="nav-item"><IoPersonSharp size={30} />About</li>
                        <li className="nav-item"><FaArrowTrendUp size={30} />Experience</li>
                        <li className="nav-item"><GrProjects size={30} />Projects</li>
                        <li className="nav-item"><SiHyperskill size={30} />Skills</li>
                        <li className="nav-item"><FaUniversity size={30} />Education</li>
                        <li className="nav-item"><MdEmail size={30} />Contact</li>
                        <li className="nav-item"><TiDocumentText size={30} />Resume</li>
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
