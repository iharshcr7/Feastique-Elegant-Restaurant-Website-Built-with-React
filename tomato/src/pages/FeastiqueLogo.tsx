import type React from "react"
import "./FeastiqueLogo.css"

const FeastiqueLogo: React.FC = () => {
  return (
    <div className="feastique-logo-container">
      <svg
        id="logo"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 666.6 152.3"
        xmlSpace="preserve"
        className="animated-logo"
      >
        <path
          fill="none"
          stroke="#000"
          strokeWidth="2"
          strokeDasharray="300"
          strokeDashoffset="300"
          d="M50,200 H220"
          className="logo-path"
        />
        <text
          x="50"
          y="100"
          fontSize="100"
          fontFamily="Arial, sans-serif"
          fill="none"
          stroke="#000"
          strokeWidth="2"
          className="logo-text"
        >
          FEASTIQUE
        </text>
        <circle cx="380" cy="30" r="15" fill="#000" className="logo-dot" />
      </svg>
    </div>
  )
}

export default FeastiqueLogo

