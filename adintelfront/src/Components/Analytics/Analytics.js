import React, { useEffect } from 'react';
import * as c3 from 'c3';
import './Analytics.css'; // Link the CSS file for styling

const Analytics = () => {
  useEffect(() => {
    // Initialize charts
    c3.generate({
      bindto: '#retentionChart',
      data: {
        columns: [['Retention', 90, 85, 75, 65, 60, 55, 50]],
        type: 'area-spline',
      },
      color: {
        pattern: ['#0081c6'],
      },
    });

    c3.generate({
      bindto: '#engagementDistChart',
      data: {
        columns: [['High', 30], ['Medium', 45], ['Low', 25]],
        type: 'donut',
      },
      color: {
        pattern: ['#0081c6', '#34D399', '#F472B6'],
      },
    });

    c3.generate({
      bindto: '#deviceChart',
      data: {
        columns: [['Mobile', 55], ['Desktop', 30], ['Tablet', 15]],
        type: 'pie',
      },
      color: {
        pattern: ['#0081c6', '#34D399', '#F472B6'],
      },
    });

    c3.generate({
      bindto: '#geoChart',
      data: {
        columns: [['US', 30], ['UK', 20], ['EU', 25], ['Asia', 25]],
        type: 'bar',
      },
      color: {
        pattern: ['#0081c6', '#34D399', '#F472B6', '#818CF8'],
      },
    });

    c3.generate({
      bindto: '#timeChart',
      data: {
        columns: [['Views', 10, 15, 25, 30, 35, 25, 20, 15]],
        type: 'spline',
      },
      color: {
        pattern: ['#0081c6'],
      },
    });
  }, []);

  return (
    <section className="analytics-section">
      <div className="header">
        <h2>Analytics Dashboard</h2>
        <p>Detailed analysis of advertisement performance and viewer behavior</p>
      </div>

      <div className="quick-stats">
        <div className="card">
          <p>Total Views</p>
          <h4>2.4M</h4>
          <span className="increase">↑ 12% increase</span>
        </div>

        <div className="card">
          <p>Conversion Rate</p>
          <h4>3.2%</h4>
          <span className="increase">↑ 2.1% increase</span>
        </div>

        <div className="card">
          <p>Avg. Watch Time</p>
          <h4>4:32</h4>
          <span className="decrease">↓ 1.5% decrease</span>
        </div>

        <div className="card">
          <p>Engagement Score</p>
          <h4>8.4</h4>
          <span className="increase">↑ 0.8% increase</span>
        </div>
      </div>

      <div className="charts">
        <div className="chart">
          <h3>Viewer Retention Analysis</h3>
          <div id="retentionChart"></div>
        </div>

        <div className="chart">
          <h3>Engagement Distribution</h3>
          <div id="engagementDistChart"></div>
        </div>
      </div>

      <div className="detailed-charts">
        <div className="chart">
          <h3>Device Distribution</h3>
          <div id="deviceChart"></div>
        </div>

        <div className="chart">
          <h3>Geographic Reach</h3>
          <div id="geoChart"></div>
        </div>

        <div className="chart">
          <h3>Time of Day Analysis</h3>
          <div id="timeChart"></div>
        </div>
      </div>
    </section>
  );
};

export default Analytics;
