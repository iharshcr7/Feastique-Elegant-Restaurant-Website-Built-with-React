import {
  IonContent,
  IonPage,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
} from '@ionic/react';
import { star, flame, trophy, timeOutline, ribbonOutline } from 'ionicons/icons';
import CommonHeader from '../components/CommonHeader';
import './Special.css';

const Special: React.FC = () => {
  return (
    <IonPage>
      <CommonHeader />
      <IonContent className="special-background">
        {/* Hero Section */}
        <div className="special-hero">
          <h1 className="hero-title">Today's Specials</h1>
          <p className="hero-subtitle">Discover our chef's exclusive creations and limited-time offers</p>
        </div>

        {/* Featured Dishes */}
        <IonGrid className="featured-section">
          <h2 className="section-title">Featured Dishes</h2>
          <IonRow>
            {[
              {
                name: "Truffle Infused Pasta",
                price: "$24.99",
                description: "Hand-crafted pasta with black truffle shavings and wild mushrooms",
                tag: "Chef's Special",
                icon: star
              },
              {
                name: "Spicy Korean BBQ",
                price: "$28.99",
                description: "Premium marinated beef with signature sauce and fresh vegetables",
                tag: "Hot & Popular",
                icon: flame
              },
              {
                name: "Mediterranean Platter",
                price: "$32.99",
                description: "A delightful mix of hummus, falafel, and grilled specialties",
                tag: "Award Winner",
                icon: trophy
              }
            ].map((dish, index) => (
              <IonCol size="12" sizeMd="4" key={index}>
                <div className="dish-card">
                  <div className="dish-tag">
                    <IonIcon icon={dish.icon} />
                    <span>{dish.tag}</span>
                  </div>
                  <h3>{dish.name}</h3>
                  <p>{dish.description}</p>
                  <div className="dish-price">{dish.price}</div>
                </div>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>

        {/* Limited Time Offers */}
        <div className="offers-section">
          <h2 className="section-title">Limited Time Offers</h2>
          <div className="offers-grid">
            <div className="offer-card">
              <IonIcon icon={timeOutline} className="offer-icon" />
              <h3>Happy Hours</h3>
              <p>30% off on all beverages</p>
              <span className="timing">4 PM - 7 PM</span>
            </div>
            <div className="offer-card">
              <IonIcon icon={ribbonOutline} className="offer-icon" />
              <h3>Weekend Special</h3>
              <p>Family combo meals at special prices</p>
              <span className="timing">Sat & Sun</span>
            </div>
          </div>
        </div>

        {/* Seasonal Menu */}
        <div className="seasonal-section">
          <h2 className="section-title">Seasonal Specials</h2>
          <div className="seasonal-content">
            <div className="seasonal-text">
              <h3>Summer Fresh Collection</h3>
              <p>Enjoy our specially curated summer menu featuring fresh, light, and refreshing dishes perfect for the season.</p>
              <ul className="seasonal-highlights">
                <li>Fresh Berry Salad</li>
                <li>Citrus Grilled Salmon</li>
                <li>Mint Lemonade</li>
                <li>Tropical Paradise Dessert</li>
              </ul>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Special; 