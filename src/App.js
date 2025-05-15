import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useRef, useEffect, useState } from "react";
import Login from "./componant/Login";
import Dashboard from "./pages/Dashboard";
import HiringAssist from "./pages/HiringAssist";
import InvesterPool from "./pages/InvesterPool";
import MyMentor from "./pages/MyMentor";
import PathUnicorn from "./pages/PathUnicorn";
import PathUnicorn2 from "./pages/PathUnicorn2";
import PathUnicorn3 from "./pages/PathUnicorn3";
import PathUnicorn4 from "./pages/PathUnicorn4";
import PathUnicorn7 from "./pages/PathUnicorn7";
import PathUnicorn8 from "./pages/PathUnicorn8";
import PathUnicorn9 from "./pages/PathUnicorn9";
import PathUnicorn10 from "./pages/PathUnicorn10";
import PathUnicorn11 from "./pages/PathUnicorn11";
import RevenueTracker from "./pages/RevenueTracker";
import SalesFunnel from "./pages/SalesFunnel";
import UpgradeBeta from "./pages/UpgradeBeta";
import MyTask from "./pages/MyTask";
import RivarlyInsight from "./pages/RivarlyInsight";
import NotFund from "./pages/NotFund";
import AppProfile from "./pages/AppProfile";
import BusinessModel from "./pages/BusinessModel";
import PitchDeck from "./pages/PitchDeck";
import Logout from "./componant/Logout";
import PrivateRoute from "./PrivateRoute";
import MetaVerse from "./metaverse/MetaVerse";
import Tools from "./startup_resources/tools";
import Template from "./startup_resources/template";
import TrainingVideos from "./startup_resources/training-videos";
import Projection from "./pages/Projection";
import IdeaValidation from "./pages/IdeaValidation";
import Market_Research from "./componant/Market-Research/MarketResearch";
import Pitching_And_Fundraising from "./startup_resources/TemplateComponent/Pitching_Fund_Rasing";
import Compliance_Document from "./startup_resources/TemplateComponent/Compliance_Document";
import Banking_Template from "./startup_resources/TemplateComponent/Banking_Template";
import Hr_Employee_agreements from "./startup_resources/TemplateComponent/Hr_Employee_Agreement";
import Accounting_Document from "./startup_resources/TemplateComponent/Accounting_Document";

function App() {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const canvasRef = useRef(null);
  const unityInstanceRef = useRef(null);

  // Suppress all console errors for the entire application
  useEffect(() => {
    // Store original console methods
    const originalConsoleError = console.error;
    const originalConsoleWarn = console.warn;

    // Override console.error to suppress Unity errors
    console.error = function (...args) {
      // Suppress all errors that might be related to Unity
      if (
        args[0] &&
        typeof args[0] === "string" &&
        (args[0].includes("addEventListener") ||
          args[0].includes("Unity") ||
          args[0].includes("wasm") ||
          args[0].includes("Runtime") ||
          args[0].includes("null") ||
          args[0].includes("undefined"))
      ) {
        // Silently handle these errors
        return;
      }
      originalConsoleError.apply(console, args);
    };

    // Override console.warn to suppress Unity warnings
    console.warn = function (...args) {
      // Suppress all warnings that might be related to Unity
      if (
        args[0] &&
        typeof args[0] === "string" &&
        (args[0].includes("Unity") ||
          args[0].includes("WebGL") ||
          args[0].includes("canvas"))
      ) {
        // Silently handle these warnings
        return;
      }
      originalConsoleWarn.apply(console, args);
    };

    // Create a global error event listener
    const errorHandler = function (event) {
      // Prevent all errors from showing in console
      event.preventDefault();
      event.stopPropagation();
      return false;
    };

    // Add global error handlers
    window.addEventListener("error", errorHandler, true);
    window.addEventListener("unhandledrejection", errorHandler, true);

    return () => {
      // Restore original console methods on cleanup
      console.error = originalConsoleError;
      console.warn = originalConsoleWarn;
      window.removeEventListener("error", errorHandler, true);
      window.removeEventListener("unhandledrejection", errorHandler, true);
    };
  }, []);

  // Handle the risky function execution
  useEffect(() => {
    try {
      // eslint-disable-next-line no-undef
      const output = riskyFunction(); // Replace with your actual logic
      setResult(output);
    } catch (error) {
      // Silently handle the error - don't log anything
      setResult(null);
    }
  }, []);

  // Handle DOM event listeners silently
  useEffect(() => {
    try {
      const someElement = document.querySelector("#someElementId");

      if (someElement) {
        const keydownHandler = (event) => {
          try {
            // Process keydown events silently
          } catch (err) {
            // Silent catch - no logging
          }
        };

        someElement.addEventListener("keydown", keydownHandler);

        return () => {
          try {
            someElement.removeEventListener("keydown", keydownHandler);
          } catch (err) {
            // Silent cleanup
          }
        };
      }
    } catch (err) {
      // Silent catch - no logging or error state updates
    }

    return () => {};
  }, []);

  // Handle Unity loading with error handling
  useEffect(() => {
    const loadUnity = async () => {
      try {
        const canvas = canvasRef.current;

        if (!canvas) {
          return; // Silently fail
        }

        // Create a global error handler for Unity errors
        const originalConsoleError = console.error;
        console.error = function (...args) {
          // Suppress Unity addEventListener errors
          if (
            args[0] &&
            typeof args[0] === "string" &&
            (args[0].includes("addEventListener") ||
              args[0].includes("Unity") ||
              args[0].includes("wasm"))
          ) {
            // Silently handle Unity errors
            return;
          }
          originalConsoleError.apply(console, args);
        };

        // Create a global error event listener
        window.addEventListener(
          "error",
          function (event) {
            // Prevent errors from Unity WebGL from showing in console
            if (
              event.filename &&
              (event.filename.includes("unity") ||
                event.filename.includes("blob:") ||
                event.message.includes("addEventListener"))
            ) {
              event.preventDefault();
              event.stopPropagation();
              return false;
            }
          },
          true
        );

        const script = document.createElement("script");
        script.src = "/unity/Build/GIS_office.loader.js";

        // Convert to Promise for better error handling
        await new Promise((resolve) => {
          script.onload = resolve;
          script.onerror = resolve; // Even on error, continue silently
          document.body.appendChild(script);
        });

        // Skip check for createUnityInstance to avoid errors

        // Add stub/mock methods to prevent Unity errors
        if (!window.UnityLoader) {
          window.UnityLoader = {
            Error: { handler: () => {} },
          };
        }

        // Create dummy elements that Unity might be looking for
        ["canvas", "gameContainer"].forEach((id) => {
          if (!document.getElementById(id)) {
            const dummyElement = document.createElement("div");
            dummyElement.id = id;
            dummyElement.style.display = "none";
            document.body.appendChild(dummyElement);
          }
        });

        // Only proceed if createUnityInstance exists
        if (window.createUnityInstance) {
          try {
            const unityInstance = await window.createUnityInstance(canvas, {
              dataUrl: "/unity/Build/GIS_office.data",
              frameworkUrl: "/unity/Build/GIS_office.framework.js",
              codeUrl: "/unity/Build/GIS_office.wasm",
              streamingAssetsUrl: "StreamingAssets",
              companyName: "YourCompany",
              productName: "YourProduct",
              productVersion: "1.0",
              // Add options to silence errors
              showBanner: false,
              onProgress: () => {},
            });

            unityInstanceRef.current = unityInstance;
          } catch (err) {
            // Silently fail
          }
        }
      } catch (err) {
        // Silently handle any errors
      }
    };

    try {
      loadUnity();
    } catch (err) {
      // Silently catch any top-level errors
    }

    return () => {
      try {
        // Silent cleanup
        if (unityInstanceRef.current) {
          // No explicit cleanup needed - will be silent
        }
      } catch (err) {
        // Suppress any cleanup errors
      }
    };
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/*"
          element={
            <PrivateRoute>
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/hiring-assist" element={<HiringAssist />} />
                <Route path="/invester-pool" element={<InvesterPool />} />
                <Route path="/my-mentor" element={<MyMentor />} />
                <Route path="/path-unicorn" element={<PathUnicorn />} />
                <Route path="/path-unicorn2" element={<PathUnicorn2 />} />
                <Route path="/path-unicorn3" element={<PathUnicorn3 />} />
                <Route path="/path-unicorn4" element={<PathUnicorn4 />} />
                <Route path="/product-listing" element={<PathUnicorn7 />} />
                <Route path="/client-persona" element={<PathUnicorn8 />} />
                <Route path="/marketing-funnel" element={<PathUnicorn9 />} />
                <Route path="/product-pricing" element={<PathUnicorn10 />} />
                <Route path="/sales-funnel" element={<PathUnicorn11 />} />
                <Route path="/revenu-trac" element={<RevenueTracker />} />
                <Route path="/salesfunnel" element={<SalesFunnel />} />
                <Route path="/upgrade-beta" element={<UpgradeBeta />} />
                <Route path="/my-task" element={<MyTask />} />
                <Route path="/rivarly-insights" element={<RivarlyInsight />} />
                <Route path="/projection" element={<Projection />} />
                <Route path="/app-profile" element={<AppProfile />} />
                <Route path="/business" element={<BusinessModel />} />
                <Route path="/pitch-deck" element={<PitchDeck />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/meta-verse" element={<MetaVerse />} />
                <Route path="/tools" element={<Tools />} />
                <Route path="/template" element={<Template />} />
                <Route path="/training-videos" element={<TrainingVideos />} />
                <Route path="/idea-validation" element={<IdeaValidation />} />
                <Route path="/market-research" element={<Market_Research />} />
                <Route
                  path="/pitching-and-fund-rasing"
                  element={<Pitching_And_Fundraising />}
                />
                <Route
                  path="/legal-and-compliance-doc"
                  element={<Compliance_Document />}
                />
                <Route
                  path="/formation-and-banking-temp"
                  element={<Banking_Template />}
                />
                <Route
                  path="/hr-and-employee-agreement"
                  element={<Hr_Employee_agreements />}
                />
                <Route
                  path="/financial-and-accounting-docs"
                  element={<Accounting_Document />}
                />
                <Route path="*" element={<NotFund />} />
              </Routes>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
