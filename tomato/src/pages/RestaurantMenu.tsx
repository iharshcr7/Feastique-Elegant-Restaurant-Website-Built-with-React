import React, { useState } from 'react';
import {
  IonPage, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonIcon,
  IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton, IonAlert
} from '@ionic/react';
import { add, remove } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import './RestaurantMenu.css';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

const RestaurantMenu: React.FC = () => {
  const [cartItems, setCartItems] = useState<{ [key: number]: number }>({});
  const [activeItem, setActiveItem] = useState<MenuItem | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const history = useHistory();

  const menuItems: MenuItem[] = [
    {
      id: 1,
      name: "Aloo Tikki Burger",
      description: "Crispy potato patty with fresh vegetables and special sauce.",
      price: 99,
      image: "/assets/McAloo-tikki.png"
    },
    {
      id: 2,
      name: "Paneer Burger",
      description: "Grilled paneer patty with fresh vegetables and mint chutney.",
      price: 129,
      image: "/assets/mcspicy-paneer.png"
    },
    {
      id: 3,
      name: "French Fries (Regular)",
      description: "Crispy golden fries with a hint of salt.",
      price: 79,
      image: "/assets/fries.png"
    },
    {
      id: 4,
      name: "McSpicy Paneer",
      description: "Spicy paneer patty with fresh vegetables and special sauce.",
      price: 149,
      image: "/assets/mcspicy.png"
    },
    {
      id: 5,
      name: "McVeggie",
      description: "Vegetable patty with fresh vegetables and special sauce.",
      price: 119,
      image: "/assets/mcveggie-burger.png"
    },
    {
      id: 6,
      name: "McFlurry Oreo",
      description: "Creamy vanilla soft serve with crushed Oreo cookies.",
      price: 99,
      image: "/assets/mcflurry.png"
    }
  ];

  const handleQuantityChange = (item: MenuItem, change: number) => {
    const newQty = Math.max(0, (cartItems[item.id] || 0) + change);
    setCartItems(prev => ({ ...prev, [item.id]: newQty }));

    if (newQty > 0) {
      setActiveItem(item);
    } else if (activeItem?.id === item.id) {
      setActiveItem(null);
    }
  };

  const handleAddToCart = () => {
    setShowPopup(true);
  };

  const handleContinue = () => {
    setShowPopup(false);
    history.push('/order-cart', {
      cartItems,
      menuItems
    });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>McDonald's Menu</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <div className="menu-container">
          {menuItems.map((item) => (
            <IonCard key={item.id} className="menu-item">
              <div className="menu-item-content">
                <img src={item.image} alt={item.name} className="item-image" />
                <div className="item-details">
                  <IonCardHeader>
                    <IonCardTitle>{item.name}</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <p>{item.description}</p>
                    <div className="price">₹{item.price}</div>
                    <div className="quantity-controls">
                      <IonButton
                        fill="clear"
                        onClick={() => handleQuantityChange(item, -1)}
                        disabled={!cartItems[item.id]}
                      >
                        <IonIcon icon={remove} />
                      </IonButton>
                      <span className="quantity">{cartItems[item.id] || 0}</span>
                      <IonButton
                        fill="clear"
                        onClick={() => handleQuantityChange(item, 1)}
                      >
                        <IonIcon icon={add} />
                      </IonButton>
                    </div>
                  </IonCardContent>
                </div>
              </div>
            </IonCard>
          ))}
        </div>

        {/* Bottom Notification Bar */}
        {activeItem && cartItems[activeItem.id] > 0 && (
          <div className="bottom-bar">
            <div className="bottom-bar-content">
              <div>
                <strong>{activeItem.name}</strong> x {cartItems[activeItem.id]}
              </div>
              <IonButton size="small" color="success" onClick={handleAddToCart}>
                Add to Cart
              </IonButton>
            </div>
          </div>
        )}

        {/* Pop-up Alert after Add to Cart */}
        <IonAlert
          isOpen={showPopup}
          header="Items in Cart"
          message={
            Object.entries(cartItems)
              .filter(([_, qty]) => qty > 0)
              .map(([id, qty]) => {
                const item = menuItems.find(item => item.id === parseInt(id));
                return `${item?.name} × ${qty}`;
              })
              .join('\n') || "No items selected."
          }
          buttons={[
            {
              text: 'Order More',
              role: 'cancel',
              cssClass: 'primary-button',
              handler: () => setShowPopup(false)
            },
            {
              text: 'Continue',
              cssClass: 'primary-button',
              handler: handleContinue
            }
          ]}
          cssClass="cart-alert"
        />
      </IonContent>
    </IonPage>
  );
};

export default RestaurantMenu;
