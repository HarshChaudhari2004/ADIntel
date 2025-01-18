// src/Components/Analytics/Analytics.js
import React from "react";
import "./Analytics.css";

const Analytics = () => {
  return (
    <section id="analytics_page" className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Analytics Dashboard</h2>
        <p className="text-gray-600 mt-2">Detailed analysis of advertisement performance and viewer behavior</p>
      </div>

      {/* Quick Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Add your analytics content here */}
      </div>
    </section>
  );
};

export default Analytics;