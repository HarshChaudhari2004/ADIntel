import React from "react";
import "./Home.css";
import { CgInsights } from "react-icons/cg";
import { SiGoogleanalytics } from "react-icons/si";
import { FaRegLightbulb, FaChartLine } from "react-icons/fa";
import { MdTrendingUp, MdOutlineSmartToy } from "react-icons/md";

const Home = () => {
    return (
        <div className="home-content">
            <h1 className="tagline">Turn sales confusion to clarity with smart tools</h1>
            
            <div className="features-grid">
                <div className="feature-card">
                    <CgInsights className="feature-icon"/>
                    <h3>Smart Insights</h3>
                    <p>Get detailed insights about your competitors' advertising strategies</p>
                </div>
                
                <div className="feature-card">
                    <SiGoogleanalytics className="feature-icon"/>  
                    <h3>Analytics Dashboard</h3>
                    <p>Comprehensive analytics to track and measure ad performance</p>
                </div>

                <div className="feature-card">
                    <FaRegLightbulb className="feature-icon"/>
                    <h3>AI Suggestions</h3>
                    <p>Get intelligent recommendations for your ad campaigns</p>
                </div>

                <div className="feature-card">
                    <MdTrendingUp className="feature-icon"/>
                    <h3>Trend Analysis</h3>
                    <p>Stay ahead with real-time market trend analysis</p>
                </div>

                <div className="feature-card">
                    <FaChartLine className="feature-icon"/>
                    <h3>Performance Tracking</h3>
                    <p>Monitor and optimize your ad performance in real-time</p>
                </div>

                <div className="feature-card">
                    <MdOutlineSmartToy className="feature-icon"/>
                    <h3>AI Assistant</h3>
                    <p>24/7 AI chatbot support for instant assistance</p>
                </div>
            </div>
        </div>
    );
};

export default Home;