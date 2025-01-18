import React, { useState } from "react";
import "./Sidebar.css";
import Home from "../Home/Home";
import SidebarList from "../Sidebar/SidebarList";
import { FaAngleDoubleRight, FaAngleDoubleLeft } from "react-icons/fa";

const Sidebar = () => {
    const [expandSidebar, setExpandSidebar] = useState(true);

    const handleExpandClick = () => {
        setExpandSidebar(!expandSidebar);
    };

    return (
        <div className="container-fluid sidebar-section">
            {/* Sidebar */}
            <div className={expandSidebar ? "sidebar-expand sidebar" : "sidebar"}>
                <SidebarList expandSidebar={expandSidebar} />
                <div className="icon-for-sidebar-expand-and-collapse">
                    <p onClick={handleExpandClick}>
                        {expandSidebar ? (
                            <FaAngleDoubleLeft size={30} />
                        ) : (
                            <FaAngleDoubleRight size={30} />
                        )}
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div
                className="container"
                style={{ marginLeft: expandSidebar ? "230px" : "95px" }}
            >
                <Home />
            </div>
        </div>
    );
};

export default Sidebar;
