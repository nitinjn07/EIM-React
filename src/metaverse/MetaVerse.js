import React, { useState, useEffect, useRef } from "react";
import LeftSidebar from "../componant/LeftSidebar";
import Navigation from "../componant/Navigation";
import SerchBar from "../componant/SearchBar";
import { Unity, useUnityContext } from "react-unity-webgl";
import { Loader2 } from "lucide-react";
import AvatarModel from "./AvatarModel";

const ProgressBar = ({ progress }) => {
  return (
    <div className="fixed top-0 left-0 w-full z-50">
      <div className="h-2 w-full bg-gray-200">
        <div
          className="h-full bg-blue-600 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="absolute right-4 top-4 bg-white px-3 py-1 rounded-full shadow-md text-sm font-medium text-blue-600">
        {progress}%
      </div>
    </div>
  );
};

export default function MetaVerse() {
  const [isActive, setActive] = useState(false);
  const [canRender, setCanRender] = useState(false);
  const [showAvatarEditor, setShowAvatarEditor] = useState(false);
  const [unityReady, setUnityReady] = useState(false);
  const unityContainerRef = useRef(null);

  const ToggleEvent = () => {
    setActive((prevState) => !prevState);
  };

  const {
    unityProvider,
    addEventListener,
    removeEventListener,
    sendMessage,
    isLoaded,
    loadingProgression,
    initialisationError,
    UNSAFE__detachHandlers,
    UNSAFE__attachHandlers,
  } = useUnityContext({
    loaderUrl: "./../../unity/Build/GIS_office.loader.js",
    dataUrl: "./../../unity/Build/GIS_office.data.unityweb",
    frameworkUrl: "./../../unity/Build/GIS_office.framework.js.unityweb",
    codeUrl: "./../../unity/Build/GIS_office.wasm.unityweb",
  });

  const loadingPercentage = Math.round(loadingProgression * 100);

  // Proper Unity initialization after component mounting
  useEffect(() => {
    if (isLoaded && unityContainerRef.current) {
      // Make sure Unity has fully initialized before attaching event handlers
      setTimeout(() => {
        try {
          // First detach any existing handlers to prevent duplicates
          if (typeof UNSAFE__detachHandlers === "function") {
            UNSAFE__detachHandlers();
          }

          // Then attach handlers properly
          if (typeof UNSAFE__attachHandlers === "function") {
            UNSAFE__attachHandlers(unityContainerRef.current);
          }

          setUnityReady(true);
        } catch (error) {
          console.error("Error initializing Unity handlers:", error);
        }
      }, 500); // Give Unity time to fully initialize
    }
  }, [isLoaded, UNSAFE__detachHandlers, UNSAFE__attachHandlers]);

  // Expose sendMessage to window for AvatarModel to use
  useEffect(() => {
    if (sendMessage && unityReady) {
      window.unitySendMessage = sendMessage;
    }

    return () => {
      delete window.unitySendMessage;
    };
  }, [sendMessage, unityReady]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCanRender(true);
    }, 100);

    return () => {
      clearTimeout(timer);
      setCanRender(false);
    };
  }, []);

  // Communication with Unity after it's fully ready
  useEffect(() => {
    if (isLoaded && canRender && unityReady) {
      try {
        // Initial message to Unity
        sendMessage(
          "ReactUnityCommunicationManager",
          "GetReactData",
          JSON.stringify({
            event: "startup",
            data: {
              id: localStorage.getItem("token"),
            },
          })
        );

        // Check if we already have an avatar URL stored
        const storedAvatarUrl = localStorage.getItem("avatarUrl");
        if (storedAvatarUrl) {
          sendMessage(
            "ReactUnityCommunicationManager",
            "GetReactData",
            JSON.stringify({
              event: "playeravatar",
              data: {
                avatarurl: storedAvatarUrl,
              },
            })
          );
        } else {
          // If no avatar URL is stored, show the avatar editor
          setShowAvatarEditor(true);
        }
      } catch (error) {
        console.error("Error sending message to Unity:", error);
      }
    }
  }, [isLoaded, canRender, unityReady, sendMessage]);

  // Set up event handling for Unity initialization
  useEffect(() => {
    const handleUnityReady = () => {
      setUnityReady(true);
    };

    if (addEventListener) {
      addEventListener("Ready", handleUnityReady);
    }

    return () => {
      if (removeEventListener) {
        removeEventListener("Ready", handleUnityReady);
      }
    };
  }, [addEventListener, removeEventListener]);

  // Clean up function when component unmounts
  useEffect(() => {
    return () => {
      if (typeof UNSAFE__detachHandlers === "function") {
        UNSAFE__detachHandlers();
      }
    };
  }, [UNSAFE__detachHandlers]);

  // Function to toggle avatar editor visibility
  const toggleAvatarEditor = () => {
    setShowAvatarEditor(!showAvatarEditor);
  };

  if (initialisationError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center p-4">
          <h2 className="text-xl font-semibold text-red-600 mb-2">
            Failed to load Metaverse
          </h2>
          <p className="text-gray-600">
            Please refresh the page and try again.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {showAvatarEditor && <AvatarModel />}
      <div>
        {!isLoaded && <ProgressBar progress={loadingPercentage} />}
        <div id="main-wrapper" className={isActive ? "show-sidebar" : ""}>
          <LeftSidebar onButtonClick={ToggleEvent} />
          <div className="page-wrapper">
            <Navigation onButtonClick={ToggleEvent} />
            <div className="body-wrapper">
              <div className="container-fluid">
                <div className="card bg-info-subtle shadow-none position-relative overflow-hidden mb-4">
                  <div className="card-body px-4 py-3">
                    <div className="row align-items-center">
                      <div className="col-9">
                        <h4 className="fw-semibold mb-8">Meta Verse</h4>
                        <nav aria-label="breadcrumb">
                          <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                              <a
                                className="text-muted text-decoration-none"
                                href="#0"
                              >
                                Home
                              </a>
                            </li>
                            <li className="breadcrumb-item" aria-current="page">
                              Meta Verse
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
                <div className="card">
                  <div
                    className="card-body relative"
                    ref={unityContainerRef}
                    id="unity-container"
                  >
                    {!isLoaded && (
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-blue-50 to-purple-50">
                        <div className="text-center">
                          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
                          <h3 className="text-xl font-semibold text-gray-700 mb-2">
                            Loading Metaverse
                          </h3>
                          <p className="text-sm text-gray-500">
                            {loadingPercentage < 25 &&
                              "Initializing Virtual Environment..."}
                            {loadingPercentage >= 25 &&
                              loadingPercentage < 50 &&
                              "Loading 3D Assets..."}
                            {loadingPercentage >= 50 &&
                              loadingPercentage < 75 &&
                              "Preparing Digital Space..."}
                            {loadingPercentage >= 75 &&
                              loadingPercentage < 90 &&
                              "Configuring Environment..."}
                            {loadingPercentage >= 90 && "Almost Ready..."}
                          </p>
                        </div>
                      </div>
                    )}
                    {canRender && (
                      <div
                        className="unity-wrapper"
                        style={{ width: "100%", height: "calc(100vh - 0px)" }}
                      >
                        <Unity
                          unityProvider={unityProvider}
                          style={{
                            width: "100%",
                            height: "100%",
                            display: isLoaded ? "block" : "none",
                          }}
                          devicePixelRatio={window.devicePixelRatio}
                          disabledCanvasEvents={["contextmenu"]}
                        />
                        {isLoaded && (
                          <button
                            onClick={toggleAvatarEditor}
                            className="absolute top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-md shadow-lg hover:bg-blue-700 transition-colors z-10"
                          >
                            {showAvatarEditor
                              ? "Close Avatar Editor"
                              : "Edit Avatar"}
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <SerchBar />
        </div>
        <div className="dark-transparent sidebartoggler" />
      </div>
    </>
  );
}
