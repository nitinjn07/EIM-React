import React, { useEffect, useState } from "react";
import { AvaturnSDK } from "@avaturn/sdk";
import styles from "./AvatarModel.module.css";

const AvatarModel = () => {
  const [unityReady, setUnityReady] = useState(false);

  // Check if Unity is ready
  useEffect(() => {
    const checkUnityReady = () => {
      if (window.unitySendMessage) {
        setUnityReady(true);
        return true;
      }
      return false;
    };

    if (!checkUnityReady()) {
      // Keep checking until Unity is ready
      const interval = setInterval(() => {
        if (checkUnityReady()) {
          clearInterval(interval);
        }
      }, 500);

      return () => clearInterval(interval);
    }
  }, []);

  useEffect(() => {
    const sdk = new AvaturnSDK();
    let container;

    try {
      container = document.getElementById("avaturn-sdk-container");

      if (!container) {
        console.error("Avaturn container not found");
        return;
      }

      sdk
        .init(container, {
          url: "https://astraverse.avaturn.dev/",
          iframeClassName: styles.iframe_wrap,
        })
        .then(() => {
          sdk
            .on("export", (data) => {
              console.log("Avatar exported:", data);

              // Extract the avatar URL from the export data
              const avatarUrl = data.url || data.avatarUrl || data.modelUrl;

              if (avatarUrl) {
                // Save the avatar URL to localStorage
                localStorage.setItem("avatarUrl", avatarUrl);

                // Send the avatar URL to Unity if Unity is ready
                if (window.unitySendMessage && unityReady) {
                  try {
                    window.unitySendMessage(
                      "ReactUnityCommunicationManager",
                      "GetReactData",
                      JSON.stringify({
                        event: "playeravatar",
                        data: {
                          avatarurl: avatarUrl,
                        },
                      })
                    );
                    console.log("Avatar URL sent to Unity:", avatarUrl);
                  } catch (error) {
                    console.error("Error sending avatar URL to Unity:", error);
                  }
                } else {
                  console.warn(
                    "Unity not ready, avatar URL saved but not sent"
                  );
                }
              }
            })
            .on("changeParam", (data) => {
              console.warn(`[callback] Set ${data.key} to ${data.value}`);
            });
        })
        .catch((reason) => {
          console.error(`[Avaturn SDK Error]: ${reason}`);
        });
    } catch (error) {
      console.error("Error initializing Avaturn SDK:", error);
    }

    return () => {
      try {
        sdk.destroy();
      } catch (error) {
        console.error("Error destroying Avaturn SDK:", error);
      }
    };
  }, [unityReady]);

  return (
    <div
      className={styles.avaturn_sdk_container}
      id="avaturn-sdk-container"
    ></div>
  );
};

export default AvatarModel;
