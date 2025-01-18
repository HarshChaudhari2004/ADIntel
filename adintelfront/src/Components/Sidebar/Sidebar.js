import React, { useState } from "react";
import "./Sidebar.css";
import Home from "../Home/Home";
import Analytics from "../Analytics/Analytics";  // Fixed import path
import SidebarList from "./SidebarList";
import { FaAngleDoubleRight, FaAngleDoubleLeft } from "react-icons/fa";

const Sidebar = () => {
    const [expandSidebar, setExpandSidebar] = useState(true);
    const [activeComponent, setActiveComponent] = useState("home"); // Add this state

    const handleExpandClick = () => {
        setExpandSidebar(!expandSidebar);
    };

    // Add this function to handle component switching
    const renderComponent = () => {
        switch(activeComponent) {
            case "analytics":
                return <Analytics />;
            default:
                return <Home />;
        }
    };

    return (
        <div className="container-fluid sidebar-section">
            <div className={expandSidebar ? "sidebar-expand sidebar" : "sidebar"}>
                <SidebarList 
                    expandSidebar={expandSidebar} 
                    setActiveComponent={setActiveComponent} // Pass this prop
                    activeComponent={activeComponent} // Pass this prop
                />
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

            <div
                className="container"
                style={{ marginLeft: expandSidebar ? "230px" : "95px" }}
            >
                {renderComponent()}
            </div>
        </div>
    );
};

export default Sidebar;
