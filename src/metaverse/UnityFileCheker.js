import React, { useState, useEffect } from "react";

const UnityFileChecker = () => {
  const [fileStatus, setFileStatus] = useState({});
  const [isChecking, setIsChecking] = useState(false);

  const unityFiles = [
    "./../../unity/Build/GIS_office.loader.js",
    "./../../unity/Build/GIS_office.data.unityweb",
    "./../../unity/Build/GIS_office.framework.js.unityweb",
    "./../../unity/Build/GIS_office.wasm.unityweb",
  ];

  const checkFiles = async () => {
    setIsChecking(true);
    const results = {};

    for (const file of unityFiles) {
      try {
        const response = await fetch(file, { method: "HEAD" });
        results[file] = {
          status: response.status,
          ok: response.ok,
          statusText: response.statusText,
        };
      } catch (error) {
        results[file] = {
          error: error.message,
          status: "Failed",
        };
      }
    }

    setFileStatus(results);
    setIsChecking(false);
  };

  return (
    <div className="p-4 bg-white rounded shadow my-4">
      <h3 className="text-lg font-medium mb-2">Unity File Checker</h3>
      <button
        onClick={checkFiles}
        disabled={isChecking}
        className="px-4 py-2 bg-blue-600 text-white rounded mb-4 hover:bg-blue-700 disabled:opacity-50"
      >
        {isChecking ? "Checking..." : "Check Unity Files"}
      </button>

      {Object.keys(fileStatus).length > 0 && (
        <div className="mt-4">
          <h4 className="font-medium mb-2">Results:</h4>
          <div className="bg-gray-100 p-3 rounded text-sm">
            {Object.entries(fileStatus).map(([file, status]) => (
              <div key={file} className="mb-2 pb-2 border-b">
                <p className="font-mono text-xs mb-1">{file}</p>
                <p
                  className={`${status.ok ? "text-green-600" : "text-red-600"}`}
                >
                  Status: {status.status} {status.statusText}
                </p>
                {status.error && <p className="text-red-600">{status.error}</p>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UnityFileChecker;
