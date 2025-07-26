import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonRouterLink,
  IonIcon,
} from "@ionic/react";
import { useEffect } from "react";
import { star, homeOutline, restaurantOutline, menuOutline, calendarOutline, callOutline, informationCircleOutline, personCircleOutline } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import "./Home.css";
import RestaurantCard from "./RestaurantCards";

const Home: React.FC = () => {
  const history = useHistory();

  useEffect(() => {
    const menuBtn = document.getElementById("menu-btn");
    const navLinks = document.getElementById("nav-links");
    const menuBtnIcon = menuBtn?.querySelector("i");

    if (menuBtn && navLinks && menuBtnIcon) {
      menuBtn.addEventListener("click", () => {
        navLinks.classList.toggle("open");
        const isOpen = navLinks.classList.contains("open");
        menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
      });

      navLinks.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuBtnIcon.setAttribute("class", "ri-menu-line");
      });
    }
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar></IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="header">
          <nav>
            <div className="nav__header">
              <div className="nav__logo">
                <a href="#">
                  <img src="assets/logo-dark.png" alt="logo" className="nav__logo-dark" />
                  <img src="assets/logo-white.png" alt="logo" className="nav__logo-white" />
                </a>
              </div>
              <div className="nav__menu__btn" id="menu-btn">
                <i className="ri-menu-line"></i>
              </div>
            </div>
            <ul className="nav__links" id="nav-links">
              <li>
                <IonRouterLink className="nav-link" routerLink="/home">
                  <IonIcon icon={homeOutline} />
                  HOME
                </IonRouterLink>
              </li>
              <li>
                <IonRouterLink className="nav-link" routerLink="/special">
                  <IonIcon icon={restaurantOutline} />
                  SPECIAL
                </IonRouterLink>
              </li>
              <li>
                <IonRouterLink className="nav-link" routerLink="/menu">
                  <IonIcon icon={menuOutline} />
                  MENU
                </IonRouterLink>
              </li>
              <li>
                <IonRouterLink className="nav-link" routerLink="/events">
                  <IonIcon icon={calendarOutline} />
                  EVENTS
                </IonRouterLink>
              </li>
              <li>
                <IonRouterLink className="nav-link" routerLink="/contact">
                  <IonIcon icon={callOutline} />
                  CONTACT US
                </IonRouterLink>
              </li>
              <li>
                <IonRouterLink className="nav-link" routerLink="/profile">
                  <IonIcon icon={personCircleOutline} />
                  PROFILE
                </IonRouterLink>
              </li>
              <li>
                <IonRouterLink className="nav-link" routerLink="/about">
                  <IonIcon icon={informationCircleOutline} />
                  ABOUT US
                </IonRouterLink>
              </li>
            </ul>
          </nav>

          <div className="content">
            <div className="content-left">
              <h2>
                Welcome To
                <br />
                <br />
                Feastique
              </h2>
              <br />
              <br />
              <br />
              <br />
              <h1>
                Delicious Meals Delivered Fast.<br />
                <span>
                  Find the best food from local restaurants and get it delivered to your doorstep.
                </span>
              </h1>
            </div>
            <div className="content-right header__image">
              <img src="assets/bhel.png" alt="Delicious food" />
            </div>
          </div>
        </div>

        <br />
        <br />
        <h2 className="section__header">CHOOSE OPTIONS & ENJOY</h2>

        <div className="banner__container">
          {/* Order Online CARD */}
          <div
            className="banner__card banner__card--large"
            style={{ backgroundImage: `url("assets/order-online1.png")`, cursor: "pointer" }}
            onClick={() => history.push("/food-categories")}
          >
            <div className="banner__text">
              <p>Feastique</p>
              <h4>Online Food Order</h4>
            </div>
          </div>

          {/* Dine-in CARD */}
          <div
            className="banner__card banner__card--small"
            style={{ backgroundImage: `url("assets/dining.jpeg")`, cursor: "pointer" }}
            onClick={() => history.push("/DineIn")}
          >
            <div className="banner__text">
              <p>Feastique</p>
              <h4>
                Dine-in<br />
                Premium Dine-in
              </h4>
            </div>
          </div>

          {/* Night Club CARD */}
          <div
            className="banner__card banner__card--small"
            style={{ backgroundImage: `url("assets/club.png")`, cursor: "pointer" }}
            onClick={() => history.push("/NightClub")}
          >
            <div className="banner__text">
              <p>Feastique</p>
              <h4>Night-Club</h4>
            </div>
          </div>
        </div>

        <section className="section__container order__container" id="menu">
          <h3>Feastique</h3>
          <h2 className="section__header">Collections</h2>
          <p className="section__description">
            Explore curated lists of top restaurants, cafes, pubs, and bars.
          </p>
          <div className="collection-section">
            <div className="collection-cards">
              <div className="collection-card" style={{ backgroundImage: 'url(assets/trending.png)' }}>
                <div className="collection-content">
                  <h3>Trending This Week</h3>
                  <p>30 Places</p>
                </div>
              </div>

              <div className="collection-card" style={{ backgroundImage: 'url(assets/japanese.jpg)' }}>
                <div className="collection-content">
                  <h3>Best of Japanese</h3>
                  <p>22 Places</p>
                </div>
              </div>

              <div className="collection-card" style={{ backgroundImage: 'url(assets/romantic.jpg )' }}>
                <div className="collection-content">
                  <h3>Romantic Dining</h3>
                  <p>25 Places</p>
                </div>
              </div>

              <div className="collection-card" style={{ backgroundImage: 'url(assets/cafes.jpg)' }}>
                <div className="collection-content">
                  <h3>Premium Cafes</h3>
                  <p>28 Places</p>
                </div>
              </div>
            </div>
          </div>

          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <h2 className="section__header">Best Restaurants In Your Area</h2>
          <p className="section__description">
            Enjoy your meal from the best outlets.
          </p>
        </section>

        {/* Restaurant Cards Section */}
        <section className="animate-on-scroll">
          <h2 className="section-title"></h2>
          <RestaurantCard />
        </section>

        <section className="section__container event__container" id="event">
          <div className="event__content">
            <div className="event__image">
              <img src="assets/event.png" alt="event" />
            </div>
            <div className="event__details">
              <h3>Amazing Offers!</h3>
              <h2 className="section__header">Score big with match-day meals from Feastique!</h2>
              <p className="section__description">
                Cricket's on, cravings up! Score big with Feastique's IPL offers, match-day combos, and mouth-watering deals. Every delivery's a win — no matter who's batting. 🍔
              </p>
            </div>
          </div>
        </section>

        <section className="reservation" id="contact">
          <div className="section__container reservation__container">
            <h3>RESERVATION</h3>
            <h2 className="section__header">Why wait in line? Dine on time!<br />BOOK NOW!</h2>
            <form action="/">
              <input type="text" placeholder="NAME" />
              <input type="email" placeholder="EMAIL" />
              <input type="date" placeholder="DATE" />
              <input type="time" placeholder="TIME" />
              <input type="number" placeholder="PEOPLE" />
              <button className="btn" type="submit">FIND DINE-IN</button>
            </form>
          </div>
          <img src="assets/reservation-bg-1.png" alt="reservation" className="reservation__bg-1" />
          <img src="assets/reservation-bg-2.png" alt="reservation" className="reservation__bg-2" />
        </section>

        <footer className="footer">
          <div className="section__container footer__container">
            <div className="footer__logo">
              <img src="assets/logo-white.png" alt="logo" />
            </div>
            <div className="footer__content">
              <p>
                Welcome to Feastique Company, where passion for exceptional food and
                genuine hospitality come together.
              </p>
              <div>
                <ul className="footer__links">
                  <li><span><i className="ri-map-pin-2-fill"></i></span> VASNA-BHAYLI ROAD, Vaadodara, 390007</li>
                  <li><span><i className="ri-mail-fill"></i></span> info@feastique.com</li>
                </ul>
                <div className="footer__socials">
                  <a href="#"><i className="ri-facebook-circle-fill"></i></a>
                  <a href="#"><i className="ri-instagram-fill"></i></a>
                  <a href="#"><i className="ri-twitter-fill"></i></a>
                  <a href="#"><i className="ri-whatsapp-fill"></i></a>
                </div>
              </div>
            </div>
          </div>
          <div className="footer__bar">
            Copyright © 2024 Feastique . All rights reserved.
          </div>
        </footer>
      </IonContent>
    </IonPage>
  );
};

export default Home;
