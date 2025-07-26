"use client"

import type React from "react"
import { useEffect } from "react"
import { IonPage, IonContent } from "@ionic/react"
import { useHistory } from "react-router-dom"
import "./Splash.css"

const Splash: React.FC = () => {
  const history = useHistory()

  useEffect(() => {
    // Automatically navigate to welcome page after 3.5 seconds
    const timer = setTimeout(() => {
      history.push("/welcome")
    }, 3500)

    return () => clearTimeout(timer)
  }, [history])

  return (
    <IonPage>
      <IonContent fullscreen className="splash-page">
        <div className="splash-container">
          <div className="splash-logo">
            <div className="plate">
              <div className="plate-inner"></div>
              <div className="plate-highlight"></div>
            </div>
            <div className="food-items">
              <div className="food-item burger">
                <div className="burger-bun-top"></div>
                <div className="burger-patty"></div>
                <div className="burger-lettuce"></div>
                <div className="burger-bun-bottom"></div>
              </div>
              <div className="food-item pizza"></div>
              <div className="food-item sushi"></div>
            </div>
            <div className="logo-text">FEASTIQUE</div>
            <div className="tagline">Discover Culinary Excellence</div>
            <div className="utensils">
              <div className="fork"></div>
              <div className="knife"></div>
            </div>
            <div className="steam-container">
              <div className="steam steam1"></div>
              <div className="steam steam2"></div>
              <div className="steam steam3"></div>
              <div className="steam steam4"></div>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  )
}

export default Splash

