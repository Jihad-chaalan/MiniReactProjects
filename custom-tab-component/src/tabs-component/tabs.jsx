import { useState } from "react";
import "./tabs.css";

export default function Tabs({ tabsContent }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="container">
      <div className="label-container">
        {tabsContent.map((tabItem, index) => {
          return (
            <span
              className={`label ${currentIndex === index ? "active" : ""}`}
              key={index}
              onClick={() => setCurrentIndex(index)}
            >
              {tabItem.label}
            </span>
          );
        })}
      </div>
      <div className="content">
        {tabsContent[currentIndex] && tabsContent[currentIndex].content}
      </div>
    </div>
  );
}
