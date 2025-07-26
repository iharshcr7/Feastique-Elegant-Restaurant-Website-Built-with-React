import React, { useEffect, useState } from 'react';
import { IonPage, IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton, IonCard, IonCardContent, IonList, IonItem, IonLabel, IonButton } from '@ionic/react';
import { useLocation, useHistory } from 'react-router-dom';
import axios from 'axios';
import './OrderConfirmation.css';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

// Timeline statuses must match backend and admin dashboard
const orderStatuses = [
  'Pending',
  'Accepted',
  'Preparing',
  'Out for Delivery',
  'Delivered',
  'Cancelled'
];

const OrderConfirmation: React.FC = () => {
  const location = useLocation();
  const history = useHistory();
  const [error, setError] = useState<string>('');
  const [showAnimation, setShowAnimation] = useState(true);
  const [currentStatus, setCurrentStatus] = useState(0);
  const [animatingIndex, setAnimatingIndex] = useState(-1);
  const [orderStatus, setOrderStatus] = useState('Pending');

  if (!location.state) {
    setError('Invalid order data. Please try placing the order again.');
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/home" />
            </IonButtons>
            <IonTitle>Order Error</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonCard>
            <IonCardContent>
              <p className="error-message">{error}</p>
              <IonButton expand="block" onClick={() => history.push('/home')}>
                Return to Home
              </IonButton>
            </IonCardContent>
          </IonCard>
        </IonContent>
      </IonPage>
    );
  }

  const { cartItems, menuItems, orderId, total } = location.state as { 
    cartItems: { [key: number]: number }, 
    menuItems: MenuItem[],
    orderId: string,
    total: number
  };

  // Poll order status every 5 seconds
  useEffect(() => {
    let interval: NodeJS.Timeout;
    const fetchOrderStatus = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/orders/${orderId}`);
        if (response.data && response.data.order_status) {
          setOrderStatus(response.data.order_status);
        }
      } catch (err) {
        // Optionally handle error
      }
    };
    fetchOrderStatus();
    interval = setInterval(fetchOrderStatus, 5000);
    return () => clearInterval(interval);
  }, [orderId]);

  // Animation for checkmark
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAnimation(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Map backend status to timeline index
  useEffect(() => {
    const idx = orderStatuses.findIndex(s => s === orderStatus);
    setCurrentStatus(idx === -1 ? 0 : idx);
    setAnimatingIndex(idx === -1 ? 0 : idx);
  }, [orderStatus]);

  const getStatusClass = (index: number) => {
    if (index < currentStatus) return 'completed';
    if (index === currentStatus) return 'active';
    return '';
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Order Confirmation</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {showAnimation ? (
          <div className="confirmation-animation">
            <div className="checkmark-circle">
              <div className="checkmark"></div>
            </div>
            <h2>Order Confirmed!</h2>
          </div>
        ) : (
          <div className="order-details">
            <IonCard className="order-summary">
              <IonCardContent>
                <div className="order-id">
                  <h2>Order ID: {orderId}</h2>
                </div>
                <IonList>
                  {Object.entries(cartItems).map(([itemId, quantity]) => {
                    const item = menuItems.find(mi => mi.id === Number(itemId));
                    if (!item) return null;
                    return (
                      <IonItem key={itemId}>
                        <IonLabel>
                          <h2>{item.name}</h2>
                          <p>Quantity: {quantity}</p>
                        </IonLabel>
                        <IonLabel slot="end" className="item-total">
                          ₹{(item.price * quantity).toFixed(2)}
                        </IonLabel>
                      </IonItem>
                    );
                  })}
                </IonList>

                <div className="bill-summary">
                  <div className="bill-row subtotal">
                    <span>Subtotal</span>
                    <span>₹{(total / 1.05).toFixed(2)}</span>
                  </div>
                  <div className="bill-row gst">
                    <span>GST (5%)</span>
                    <span>₹{(total - (total / 1.05)).toFixed(2)}</span>
                  </div>
                  <div className="bill-row total">
                    <span>Total Amount</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="tracking-info">
                  <h3>Order Status</h3>
                  <div className="status-timeline">
                    {orderStatuses.map((status, index) => (
                      <div 
                        key={status} 
                        className={`status-item ${getStatusClass(index)} ${index === animatingIndex ? 'animating' : ''}`}
                      >
                        <div className="status-dot"></div>
                        <span>{status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </IonCardContent>
            </IonCard>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default OrderConfirmation; 