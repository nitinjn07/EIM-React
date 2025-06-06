import React, { useState } from "react";
import { Link } from "react-router-dom";
import LeftSidebar from "../componant/LeftSidebar";
import Navigation from "../componant/Navigation";
import SerchBar from "../componant/SearchBar";

function PathUnicorn4() {
  const [isActive, setActive] = useState(false);

  const ToggleEvent = () => {
    setActive((prevState) => !prevState);
  };
  const [isAutoplay, setIsAutoplay] = useState(false); // Autoplay toggle
  const [activeTab, setActiveTab] = useState("Table of Contents"); // Active tab
  const [selectedVideo, setSelectedVideo] = useState(null); // Current video selected

  // Mock data for Table of Contents
  const tableOfContents = [
    {
      id: 1,
      title: "Course Overview",
      duration: "5m 40s",
      videoUrl: "video1.mp4",
    },
    {
      id: 2,
      title: "The Horizon of Business Analysis",
      duration: "10m 30s",
      videoUrl: "video2.mp4",
    },
    {
      id: 3,
      title: "The Business Analysis Delivery Horizon",
      duration: "15m 10s",
      videoUrl: "video3.mp4",
    },
    {
      id: 4,
      title: "The Business Analysis Initiative Horizon",
      duration: "20m 20s",
      videoUrl: "video4.mp4",
    },
    {
      id: 5,
      title: "The Business Analysis Strategy Horizon",
      duration: "25m 50s",
      videoUrl: "video5.mp4",
    },
  ];

  const toggleAutoplay = () => setIsAutoplay(!isAutoplay); // Toggle autoplay

  const handleVideoSelect = (video) => {
    setSelectedVideo(video);
    alert(`Playing: ${video.title}`);
  };

  return (
    <>
      <div id="main-wrapper" className={isActive ? "show-sidebar" : ""}>
        {/* Sidebar Start */}
        <LeftSidebar onButtonClick={ToggleEvent} />
        {/*  Sidebar End */}
        <div className="page-wrapper">
          <Navigation onButtonClick={ToggleEvent} />
          <div className="body-wrapper">
            <div className="container-fluid">
              {/* Header */}
              <div className="card bg-info-subtle shadow-none position-relative overflow-hidden mb-4">
                <div className="card-body px-4 py-3">
                  <div className="row align-items-center">
                    <div className="col-9">
                      <h4 className="fw-semibold mb-8">IM Mentor Club</h4>
                      <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                          <li className="breadcrumb-item">
                            <a
                              className="text-muted text-decoration-none"
                              href="../dark/index.html">
                              Home
                            </a>
                          </li>
                          <li className="breadcrumb-item" aria-current="page">
                            IM Mentor Club
                          </li>
                        </ol>
                      </nav>
                    </div>
                    <div className="col-3">
                      <div className="text-center mb-n5">
                        <img
                          src="./assets/assets/images/breadcrumb/ChatBc.png"
                          alt="modernize-img"
                          className="img-fluid mb-n4"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="ca">
                <div
                  style={{
                    // backgroundColor: "#223662",
                    color: "#FFF",
                    minHeight: "100vh",
                    padding: "20px",
                  }}>
                  {/* Header Section */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "20px",
                    }}>
                    <h1 id="fontSize" style={{ fontSize: "24px" }}>
                      Agile Business Analysis: From Strategic Planning to
                      Delivering Value
                    </h1>
                    <Link
                      to="/path-unicorn"
                      className="text-end btn btn-lg bg-default"
                      style={{ backgroundColor: "#223662", color: "white" }}>
                      ← Back
                    </Link>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      gap: "20px",
                      flexDirection: "row", // Default layout for larger screens
                      flexWrap: "wrap", // Allow elements to wrap on smaller screens
                    }}
                    className="row">
                    {/* Left Section - Video Player */}
                    <div
                      style={{ flex: 2, minWidth: "300px" }}
                      className="col-md-6 col-12">
                      <div
                        style={{
                          backgroundColor: "#000",
                          borderRadius: "8px",
                          overflow: "hidden",
                          marginBottom: "10px",
                        }}>
                        <video
                          style={{ width: "100%", height: "auto" }}
                          controls
                          autoPlay={isAutoplay}
                          poster="https://via.placeholder.com/800x400?text=Video+Thumbnail">
                          <source
                            src={
                              selectedVideo
                                ? selectedVideo.videoUrl
                                : "https://via.placeholder.com/video.mp4"
                            }
                            type="video/mp4"
                          />
                          Your browser does not support the video tag.
                        </video>
                      </div>
                      <div
                        style={{
                          textAlign: "right",
                          fontSize: "14px",
                          marginBottom: "20px",
                        }}>
                        {selectedVideo
                          ? selectedVideo.title
                          : "No video selected"}
                      </div>
                    </div>

                    {/* Right Section - Table of Contents and Tabs */}
                    <div
                      style={{
                        flex: 1,
                        backgroundColor: "#223662",
                        borderRadius: "8px",
                        padding: "20px",
                        minWidth: "300px", // Ensuring both columns take full width on smaller screens
                      }}
                      className="col-md-6 col-12">
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginBottom: "20px",
                        }}>
                        {["Table of Contents", "Transcript"].map((tab) => (
                          <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            style={{
                              backgroundColor:
                                activeTab === tab ? "#FFE84E" : "transparent",
                              color: activeTab === tab ? "#2D0E41" : "#FFF",
                              border: "none",
                              fontSize: "16px",
                              cursor: "pointer",
                              padding: "10px 20px",
                              borderRadius: "5px",
                            }}>
                            {tab}
                          </button>
                        ))}
                      </div>

                      {/* Content Based on Active Tab */}
                      {activeTab === "Table of Contents" && (
                        <div>
                          {tableOfContents.map((item) => (
                            <div
                              key={item.id}
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                padding: "10px 0",
                                borderBottom: "1px solid #4B1D6E",
                                cursor: "pointer",
                              }}
                              onClick={() => handleVideoSelect(item)}>
                              <span>{item.title}</span>
                              <span>{item.duration}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {activeTab === "Transcript" && (
                        <div>
                          <p style={{ lineHeight: "1.6" }}>
                            This is a placeholder for the Transcript tab. You
                            can add transcript text here.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Bottom Section */}
                  <div style={{ marginTop: "40px" }}>
                    {/* Brand Building Section */}
                    <div
                      style={{ display: "flex", gap: "20px" }}
                      className="row">
                      {/* Left Content */}
                      <div className="col-md-6 col-12 card-body ">
                        <div
                          style={{
                            flex: 1,
                            backgroundColor: "#223662",
                            borderRadius: "8px",
                            padding: "25px",
                          }}>
                          <h2
                            style={{ fontSize: "20px", marginBottom: "20px" }}>
                            Brand Building
                          </h2>
                          <p style={{ lineHeight: "1.6" }}>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and
                            scrambled it to make a type specimen book.
                          </p>
                        </div>
                      </div>
                      {/* Right Content - Graph */}
                      <div
                        style={{
                          flex: 1,
                          backgroundColor: "#223662",
                          borderRadius: "8px",
                          padding: "20px",
                        }}
                        className=" col-12 card-body">
                        <h3 style={{ fontSize: "20px", marginBottom: "10px" }}>
                          Graph Placeholder
                        </h3>
                        <div
                          style={{
                            width: "100%",
                            height: "150px",
                            background:
                              "linear-gradient(45deg, #223662,rgb(238, 240, 241))",
                            borderRadius: "8px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#2D0E41",
                          }}>
                          Graph Visualization
                        </div>
                      </div>
                    </div>

                    {/* Autoplay Toggle */}
                    <div
                      style={{
                        marginTop: "20px",
                        display: "flex",
                        alignItems: "center",
                      }}>
                      <label style={{ marginRight: "10px", fontSize: "16px" }}>
                        Autoplay
                      </label>
                      <input
                        type="checkbox"
                        checked={isAutoplay}
                        onChange={toggleAutoplay}
                        style={{ cursor: "pointer", transform: "scale(1.5)" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <SerchBar />
      </div>
      <div className="dark-transparent sidebartoggler" />
    </>
  );
}

export default PathUnicorn4;
