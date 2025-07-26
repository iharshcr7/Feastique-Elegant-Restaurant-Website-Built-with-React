"use client"

import { useState, useEffect } from "react"
import type React from "react"
import { IonPage, IonContent, IonButton, IonIcon } from "@ionic/react"
import { useHistory } from "react-router-dom"
import { arrowForward, logIn } from "ionicons/icons"
import "./Welcome.css"
import welcomeImage from "../assets/welcome-illustration.png"

const Welcome: React.FC = () => {
  const history = useHistory()
  const [loaded, setLoaded] = useState(false)
  const [animateButton, setAnimateButton] = useState(false)

  useEffect(() => {
    // Trigger initial animations after component mounts
    setLoaded(true)

    // Periodically animate the button to draw attention
    const interval = setInterval(() => {
      setAnimateButton(true)
      setTimeout(() => setAnimateButton(false), 1000)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const handleLoginClick = () => {
    history.push("/login")
  }

  return (
    <IonPage>
      <IonContent fullscreen className="welcome-page">
        <div className="background-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>

        <div className={`welcome-container ${loaded ? "loaded" : ""}`}>
          <div className="welcome-left">
            <div className="image-container">
              <div className="image-glow"></div>
              <img
                src={welcomeImage || "/placeholder.svg"}
                alt="Welcome"
                className="welcome-image"
                style={{ width: "280px", height: "auto", objectFit: "contain" }}
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = "https://via.placeholder.com/280"
                  console.log("Image failed to load, using placeholder")
                }}
              />
            </div>
          </div>

          <div className="welcome-right">
            <div className="welcome-content">
              <h1 className="welcome-title">
                <span className="text-gradient">WELCOME!</span>
              </h1>
              <p className="welcome-subtitle">Order your favorite menu with easy, on-demand delivery</p>

              <div className="welcome-buttons">
                <IonButton
                  expand="block"
                  className={`login-button ${animateButton ? "pulse" : ""}`}
                  onClick={handleLoginClick}
                >
                  <span>Login/Register</span>
                  <IonIcon icon={logIn} slot="end" />
                </IonButton>

                <div className="skip-option">
                  <button className="skip-button" onClick={() => history.push("/home")}>
                    <span>Continue as guest</span>
                    <IonIcon icon={arrowForward} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="welcome-footer">
            <div className="scroll-indicator">
              <div className="scroll-dot"></div>
            </div>
            <p className="footer-text">Swipe up to explore</p>
          </div>
        </div>
      </IonContent>
    </IonPage>
  )
}

export default Welcome

