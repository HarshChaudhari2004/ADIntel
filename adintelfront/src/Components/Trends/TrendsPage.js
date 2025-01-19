import React, { useEffect } from 'react';
import './TrendsPage.css';
import * as c3 from 'c3';

const TrendsPage = () => {
  useEffect(() => {
    // Categories Chart
    c3.generate({
      bindto: '#categoriesChart',
      data: {
        columns: [
          ['Electronics', 50],
          ['Fashion', 30],
          ['Food', 40],
          ['Automotive', 20],
          ['Health', 60],
        ],
        type: 'bar',
      },
      bar: {
        width: {
          ratio: 0.6,
        },
      },
      color: {
        pattern: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50', '#FF9F40'],
      },
    });

    // Sentiment Chart
    c3.generate({
      bindto: '#sentimentChart',
      data: {
        columns: [
          ['Positive', 60],
          ['Neutral', 25],
          ['Negative', 15],
        ],
        type: 'pie',
      },
      color: {
        pattern: ['#4CAF50', '#FFCE56', '#FF6384'],
      },
    });

    // Platform Distribution Chart
    c3.generate({
      bindto: '#platformChart',
      data: {
        columns: [
          ['Facebook', 40],
          ['Instagram', 35],
          ['YouTube', 20],
          ['Twitter', 25],
          ['LinkedIn', 15],
        ],
        type: 'pie',
      },
      color: {
        pattern: ['#36A2EB', '#FF6384', '#FFCE56', '#4CAF50', '#FF9F40'],
      },
    });

    // Engagement Chart
    c3.generate({
      bindto: '#engagementTrendChart',
      data: {
        columns: [
          ['Week 1', 80],
          ['Week 2', 90],
          ['Week 3', 100],
          ['Week 4', 110],
        ],
        type: 'bar',
      },
      bar: {
        width: {
          ratio: 0.5,
        },
      },
      color: {
        pattern: ['#36A2EB'],
      },
    });

    // Time-Based Performance Chart
    c3.generate({
      bindto: '#timePerformanceChart',
      data: {
        columns: [
          ['Morning', 40],
          ['Afternoon', 60],
          ['Evening', 80],
          ['Night', 70],
        ],
        type: 'bar',
      },
      bar: {
        width: {
          ratio: 0.5,
        },
      },
      color: {
        pattern: ['#FF6384'],
      },
    });
  }, []);

  return (
    <section className="analytics-section">
      {/* Header */}
      <div className="header">
        <h2>Advertisement Trends</h2>
        <p>Real-time analysis of trending patterns and market insights</p>
      </div>

      {/* Quick Stats */}
      <div className="quick-stats">
        <div className="card">
          <h4>Top Categories</h4>
          <p>Analyze the top-performing categories</p>
        </div>
        <div className="card">
          <h4>Viewer Sentiment</h4>
          <p>Understand viewer reactions</p>
        </div>
        <div className="card">
          <h4>Platform Distribution</h4>
          <p>Analyze platform preferences</p>
        </div>
        <div className="card">
          <h4>Engagement Trends</h4>
          <p>Track weekly performance</p>
        </div>
      </div>

      {/* Charts */}
      <div className="charts">
        <div className="chart">
          <h3>Top Performing Categories</h3>
          <div id="categoriesChart"></div>
        </div>
        <div className="chart">
          <h3>Viewer Sentiment</h3>
          <div id="sentimentChart"></div>
        </div>
        <div className="chart">
          <h3>Platform Distribution</h3>
          <div id="platformChart"></div>
        </div>
      </div>

      {/* Detailed Charts */}
      <div className="detailed-charts">
        <div className="chart">
          <h3>Engagement Patterns</h3>
          <div id="engagementTrendChart"></div>
        </div>
        <div className="chart">
          <h3>Time-Based Performance</h3>
          <div id="timePerformanceChart"></div>
        </div>
      </div>
    </section>
  );
};

export default TrendsPage;
