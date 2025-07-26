"use client"
import axios from "axios"

import type React from "react"
import { useState, useEffect } from "react"
import { IonPage, IonContent, IonInput, IonIcon, IonButton, useIonToast, IonSpinner } from "@ionic/react"
import { mail, lockClosed, person, eyeOutline, eyeOffOutline, arrowBack } from "ionicons/icons"
import { useHistory } from "react-router-dom"
import "./LoginSignup.css"

const LoginSignup = () => {
  const [isRegistering, setIsRegistering] = useState(false)
  const [present] = useIonToast()
  const history = useHistory()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showRegisterPassword, setShowRegisterPassword] = useState(false)
  const [formActive, setFormActive] = useState(false)

  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const [registerName, setRegisterName] = useState("")
  const [registerEmail, setRegisterEmail] = useState("")
  const [registerPassword, setRegisterPassword] = useState("")
  const [registerRole, setRegisterRole] = useState("customer")

  useEffect(() => {
    setTimeout(() => {
      setFormActive(true)
    }, 100)
  }, [])

  const toggleForm = (register: boolean) => {
    setFormActive(false)
    setTimeout(() => {
      setIsRegistering(register)
      setTimeout(() => {
        setFormActive(true)
      }, 50)
    }, 300)
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (loginEmail && loginPassword) {
      setIsLoading(true)
      try {
        const res = await axios.post("http://localhost:5000/login", {
          email: loginEmail,
          password: loginPassword,
        })

        if (res.data.user) {
          localStorage.setItem("userName", res.data.user.name)
          localStorage.setItem("isLoggedIn", "true")
          localStorage.setItem("userRole", res.data.user.role)
          localStorage.setItem("userId", res.data.user.id.toString())

          present({
            message: res.data.message,
            duration: 1500,
            position: "top",
            color: "success",
          })

          // Redirect based on role
          switch (res.data.user.role) {
            case 'admin':
              history.push("/admin-dashboard")
              break
            case 'restaurant_owner':
              history.push("/restaurant-dashboard")
              break
            default:
              history.push("/home")
          }
        }
      } catch (error: any) {
        console.error("Login error:", error)
        present({
          message: error.response?.data?.message || "Login failed",
          duration: 2000,
          position: "top",
          color: "danger",
        })
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    if (registerName && registerEmail && registerPassword) {
      setIsLoading(true)
      try {
        const res = await axios.post("http://localhost:5000/register", {
          name: registerName,
          email: registerEmail,
          password: registerPassword,
          role: registerRole
        })

        if (res.data.user) {
          localStorage.setItem("userName", registerName)
          localStorage.setItem("isLoggedIn", "true")

          present({
            message: res.data.message,
            duration: 1500,
            position: "top",
            color: "success",
          })
          history.push("/home")
        }
      } catch (error: any) {
        console.error("Registration error:", error)
        present({
          message: error.response?.data?.message || "Registration failed",
          duration: 2000,
          position: "top",
          color: "danger",
        })
      } finally {
        setIsLoading(false)
      }
    } else {
      present({
        message: "Please fill in all fields",
        duration: 1500,
        position: "top",
        color: "danger",
      })
    }
  }

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <div className={`wrapper ${isRegistering ? "register-active" : ""} ${formActive ? "form-active" : ""}`}>
          <div className="background-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
          </div>

          <div className="welcome-text">
            <span className="welcome-title">Welcome</span>
            <span className="welcome-subtitle">{isRegistering ? "Create your account" : "Back to your account"}</span>
          </div>

          <div className="form-container">
            {/* Login Form */}
            <div className={`form-wrapper login ${isRegistering ? "hidden" : ""}`}>
              <form onSubmit={handleLogin}>
                <h2 className="form-title">Login</h2>
                <div className="input-box">
                  <span className="icon">
                    <IonIcon icon={mail} />
                  </span>
                  <IonInput
                    type="email"
                    placeholder="Email"
                    value={loginEmail}
                    onIonChange={(e) => setLoginEmail(e.detail.value!)}
                    required
                    className="custom-input"
                  ></IonInput>
                  <span className="input-highlight"></span>
                </div>
                <div className="input-box">
                  <span className="icon">
                    <IonIcon icon={lockClosed} />
                  </span>
                  <IonInput
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={loginPassword}
                    onIonChange={(e) => setLoginPassword(e.detail.value!)}
                    required
                    className="custom-input"
                  ></IonInput>
                  <span className="input-highlight"></span>
                  <button type="button" className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
                    <IonIcon icon={showPassword ? eyeOffOutline : eyeOutline} />
                  </button>
                </div>

                <div className="forgot-password">
                  <a href="#">Forgot Password?</a>
                </div>

                <IonButton expand="block" type="submit" className="submit-button" disabled={isLoading}>
                  {isLoading ? <IonSpinner name="dots" /> : "Login"}
                </IonButton>

                <div className="sign-link">
                  <p>
                    Don't have an account?{" "}
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        toggleForm(true)
                      }}
                    >
                      Register
                    </a>
                  </p>
                </div>

                <div className="social-login">
                  <p>Or login with</p>
                  <div className="social-icons">
                    <button type="button" className="social-icon google">G</button>
                    <button type="button" className="social-icon facebook">f</button>
                    <button type="button" className="social-icon apple">
                      <svg viewBox="0 0 384 512" width="16" height="16">
                        <path fill="currentColor" d="M318.7 268.7c..."></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </form>
            </div>

            {/* Registration Form */}
            <div className={`form-wrapper register ${!isRegistering ? "hidden" : ""}`}>
              <button type="button" className="back-button" onClick={() => toggleForm(false)}>
                <IonIcon icon={arrowBack} />
              </button>

              <form onSubmit={handleRegister}>
                <h2 className="form-title">Registration</h2>
                <div className="input-box">
                  <span className="icon">
                    <IonIcon icon={person} />
                  </span>
                  <IonInput
                    type="text"
                    placeholder="Full Name"
                    value={registerName}
                    onIonChange={(e) => setRegisterName(e.detail.value!)}
                    required
                    className="custom-input"
                  ></IonInput>
                  <span className="input-highlight"></span>
                </div>
                <div className="input-box">
                  <span className="icon">
                    <IonIcon icon={mail} />
                  </span>
                  <IonInput
                    type="email"
                    placeholder="Email"
                    value={registerEmail}
                    onIonChange={(e) => setRegisterEmail(e.detail.value!)}
                    required
                    className="custom-input"
                  ></IonInput>
                  <span className="input-highlight"></span>
                </div>
                <div className="input-box">
                  <span className="icon">
                    <IonIcon icon={lockClosed} />
                  </span>
                  <IonInput
                    type={showRegisterPassword ? "text" : "password"}
                    placeholder="Password"
                    value={registerPassword}
                    onIonChange={(e) => setRegisterPassword(e.detail.value!)}
                    required
                    className="custom-input"
                  ></IonInput>
                  <span className="input-highlight"></span>
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                  >
                    <IonIcon icon={showRegisterPassword ? eyeOffOutline : eyeOutline} />
                  </button>
                </div>

                <div className="input-box">
                  <span className="icon">
                    <IonIcon icon={person} />
                  </span>
                  <select
                    value={registerRole}
                    onChange={(e) => setRegisterRole(e.target.value)}
                    className="custom-input"
                    required
                  >
                    <option value="customer">Customer</option>
                    <option value="restaurant_owner">Restaurant Owner</option>
                    <option value="admin">Admin</option>
                  </select>
                  <span className="input-highlight"></span>
                </div>

                <div className="terms-checkbox">
                  <label className="checkbox-container">
                    <input type="checkbox" required />
                    <span className="checkmark"></span>
                    <span className="terms-text">
                      I agree to the <a href="#">Terms & Conditions</a>
                    </span>
                  </label>
                </div>

                <IonButton expand="block" type="submit" className="submit-button" disabled={isLoading}>
                  {isLoading ? <IonSpinner name="dots" /> : "Register"}
                </IonButton>

                <div className="sign-link">
                  <p>
                    Already have an account?{" "}
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        toggleForm(false)
                      }}
                    >
                      Login
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </div>

          <div className="decoration-image"></div>
        </div>
      </IonContent>
    </IonPage>
  )
}

export default LoginSignup
