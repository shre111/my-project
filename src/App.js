import React, { useEffect, useState } from "react";
import { WhatsappIcon, WhatsappShareButton } from "react-share";
import ThreeDModelViewer from "./ThreeDModelViewer";
import FileUpload from "./FileUpload";
import PublicHeader from "./PublicHeader";
import { Routes } from "react-router-dom";

function getCookieValue(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value}; ${expires}; path=/`;
}

function App() {
  // Initialize the visit count from the user's cookies or set it to 0 if it doesn't exist.
  const [visitCount, setVisitCount] = useState(
    parseInt(getCookieValue("visitCount")) || 0
  );

  useEffect(() => {
    // Increment the visit count and update the cookie.
    const newVisitCount = visitCount + 1;
    setVisitCount(newVisitCount);
    setCookie("visitCount", newVisitCount, 30); // Expires in 30 days
  }, []);

  return (
    <div>
      {/* <p>Visit Count: {visitCount}</p>
      <WhatsappShareButton
        windowWidth={700}
        windowHeight={800}
        // url="http://localhost:3002/application/b2c/default-Immengaerten/79206-Breisach-am-Rhein/Germany"
        url={`whatsapp://send?text=${window.location.origin}`}
        title="Whatsapp"
      >
        <WhatsappIcon round size={30} />
      </WhatsappShareButton>
        <ThreeDModelViewer /> */}
      <FileUpload />
      {/* <PublicHeader /> */}
    </div>
  );
}

export default App;

