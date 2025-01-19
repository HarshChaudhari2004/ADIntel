import React, { useState } from 'react';
import './Competition.css';

const Competition = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSection, setSelectedSection] = useState(null); // Track which section is selected

  const handleAnalyzeClick = (section) => {
    setSelectedSection(section); // Set selected section based on button clicked
  };

  const handleLoadingClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false); // Simulate loading for 3 seconds
    }, 3000);
  };

  return (
    <section className="competition-section">
      <div className="competition-container">
        <div className="competition-content">
          <h1 className="competition-title">YouTube Video Analyzer</h1>
          <p className="competition-description">
            Analyze sentiment and get detailed insights from any YouTube video with our advanced AI-powered tool.
          </p>

          {/* Buttons to select video or image analysis */}
          {selectedSection === null && (
            <div className="competition-actions">
              <button
                id="video-analyze-btn"
                className="competition-button"
                onClick={() => handleAnalyzeClick('video')}
              >
                Video Analysis
              </button>

              <button
                id="image-analyze-btn"
                className="competition-button"
                onClick={() => handleAnalyzeClick('image')}
              >
                Image Analysis
              </button>
            </div>
          )}

          {/* Show video analysis section if 'video' is selected */}
          {selectedSection === 'video' && (
            <section className="analyzer-section">
              <div className="analyzer-container">
                <div className="video-info">
                  <h2 className="section-title">Video Information</h2>
                  <div className="thumbnail-container">
                    <div className="thumbnail-placeholder">
                      <span>Thumbnail will appear here</span>
                    </div>
                  </div>
                  <div className="video-summary">
                    <p>Video summary will be displayed here after analysis...</p>
                  </div>
                </div>

                <div className="quick-analysis">
                  <h2 className="section-title">Quick Analysis</h2>
                  <div className="metrics-container">
                    <div className="metric">
                      <span>Video Duration:</span>
                      <span id="video-duration">--:--</span>
                    </div>
                    <div className="metric">
                      <span>View Count:</span>
                      <span id="view-count">--</span>
                    </div>
                    <div className="metric">
                      <span>Engagement Rate:</span>
                      <span id="engagement-rate">--%</span>
                    </div>
                  </div>
                  <div id="analysis-loading" className="loading-state">
                    <div className="loading-spinner"></div>
                    <p>Analyzing video...</p>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Show image analysis section if 'image' is selected */}
          {selectedSection === 'image' && (
            <section className="image-analyzer-section">
              <div className="image-analyzer-container">
                <h2 className="section-title">Image Analysis</h2>
                <div className="image-upload-container">
                  <input type="file" id="image-upload" accept="image/*" />
                  <button className="competition-button" onClick={handleLoadingClick}>
                    Start Image Analysis
                  </button>
                </div>
              </div>
            </section>
          )}

          {/* Sentiment Analysis Section (Visible after video analysis) */}
          {selectedSection && (
            <section className="sentiment-section">
              <div className="sentiment-container">
                <h2 className="section-title">Sentiment Analysis</h2>
                <div className="graph-container">
                  <div className="graph-bar">
                    <div id="positive-bar" className="graph-bar-fill positive">
                      <div className="bar-label">0%</div>
                    </div>
                    <div className="bar-title">Positive</div>
                  </div>
                  <div className="graph-bar">
                    <div id="neutral-bar" className="graph-bar-fill neutral">
                      <div className="bar-label">0%</div>
                    </div>
                    <div className="bar-title">Neutral</div>
                  </div>
                  <div className="graph-bar">
                    <div id="negative-bar" className="graph-bar-fill negative">
                      <div className="bar-label">0%</div>
                    </div>
                    <div className="bar-title">Negative</div>
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
    </section>
  );
};

export default Competition;
