"use client"

import { IonToolbar } from "@ionic/react"
import type React from "react"
import "./Header.css"

const Header: React.FC = () => {
  return (
    <IonToolbar color="light" className="main-toolbar">
      <div className="header-container">
        <div className="logo-container">
          <img src="/assets/logo-dark.png" alt="Feastique Logo" className="logo-image" />
        </div>
      </div>
    </IonToolbar>
  )
}

export default Header

