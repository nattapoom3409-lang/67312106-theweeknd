import React, { useState, useEffect } from "react";
import "./AboutMe.css";

function AboutMe() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button className="AboutMe-fab" onClick={() => setOpen(true)}>
        <img src="./img/aboutMe/me.jpg" alt="Me" />
      </button>

      <div className={`AboutMe-panel ${open ? "open" : ""}`}>
        <button className="close-btn" onClick={() => setOpen(false)}>
          ✕
        </button>
        
        <div className="AboutMe-content">
          <div className="AboutMe-image-section">
            <img src="./img/aboutMe/me.jpg" className="AboutMe-content-pfp" alt="Profile" />
          </div>

          <div className="AboutMe-text-section">
            <h2>About Me</h2>
            <div className="AboutMe-info-grid">
              <p><span className="bold">ชื่อ :</span> <span>ณัฐภูมิ กาทองทุ่ง</span></p>
              <p><span className="bold">ชื่อเล่น :</span> <span>ภูมิ</span></p>
              <p><span className="bold">วันเกิด :</span> <span>7 ธันวาคม 2547</span></p>
              <p><span className="bold">อายุ :</span> <span>21 ปี</span></p>
              <p><span className="bold">ส่วนสูง :</span> <span>183 เซนติเมตร</span></p>
              <p><span className="bold">น้ำหนัก :</span> <span>95 กิโลกรัม</span></p>
              <p><span className="bold">สาขา :</span> <span>IT</span></p>
              <p><span className="bold">คณะ :</span> <span>วิทยาศาสตร์</span></p>
              <p><span className="bold">ปี :</span> <span>2</span></p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AboutMe;