import React, { useState } from "react";
import "./Sidebar.css";
import Home from "../Home/Home";
import Analytics from "../Analytics/Analytics";
import Competition from "../Competition/Competition";
import TrendsPage from "../Trends/TrendsPage";
import Chatbot from "../../AISuggestion/AISuggestion";
import SidebarList from "./SidebarList";
import { FaAngleDoubleRight, FaAngleDoubleLeft } from "react-icons/fa";

const Sidebar = () => {
    const [expandSidebar, setExpandSidebar] = useState(true);
    const [activeComponent, setActiveComponent] = useState("home");

    const handleExpandClick = () => {
        setExpandSidebar(!expandSidebar);
    };

    const renderComponent = () => {
        switch (activeComponent) {
            case "analytics":
                return <Analytics />;
            case "competition":
                return <Competition />;
            case "trends":
                return <TrendsPage />;
            case "ai-suggestion":
                return <Chatbot />;
            default:
                return <Home />;
        }
    };

    return (
        <div className="container-fluid sidebar-section">
            {/* Sidebar Section */}
            <div className={expandSidebar ? "sidebar-expand sidebar" : "sidebar"}>
                <SidebarList
                    expandSidebar={expandSidebar}
                    setActiveComponent={setActiveComponent} // Pass the active component setter
                    activeComponent={activeComponent} // Pass the current active component
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

            {/* Main Content Section */}
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
