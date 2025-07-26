import React, { useState, useEffect } from 'react';
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonList,
  IonItem,
  IonLabel,
  IonBadge,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonText,
  IonButton,
  IonIcon,
  IonRefresher,
  IonRefresherContent,
  IonLoading
} from '@ionic/react';
import { timeOutline, locationOutline, cardOutline, refresh } from 'ionicons/icons';
import axios from 'axios';
import './OrderHistory.css';

interface Order {
  order_id: number;
  total_amount: number;
  gst_amount: number;
  delivery_address: string;
  order_status: string;
  order_date: string;
  payment_mode: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
}

const OrderHistory: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const customerId = localStorage.getItem('customerId');
      if (!customerId) {
        setError('Please login to view orders');
        return;
      }

      const response = await axios.get(`http://localhost:5000/api/orders/history/${customerId}`);
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setError('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async (event: CustomEvent) => {
    await fetchOrders();
    event.detail.complete();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending': return 'warning';
      case 'Accepted': return 'primary';
      case 'Preparing': return 'secondary';
      case 'Out for Delivery': return 'tertiary';
      case 'Delivered': return 'success';
      case 'Cancelled': return 'danger';
      default: return 'medium';
    }
  };

  if (loading) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Order History</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonLoading isOpen={true} message="Loading orders..." />
        </IonContent>
      </IonPage>
    );
  }

  if (error) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Order History</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <p className="error">{error}</p>
          <IonButton expand="block" onClick={fetchOrders}>
            <IonIcon slot="start" icon={refresh} />
            Retry
          </IonButton>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Order History</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        {orders.length === 0 ? (
          <div className="no-orders">
            <p>No orders found</p>
            <IonButton expand="block" routerLink="/">
              Start Ordering
            </IonButton>
          </div>
        ) : (
          <IonList>
            {orders.map(order => (
              <IonCard key={order.order_id} className="order-card">
                <IonCardHeader>
                  <IonCardTitle>Order #{order.order_id}</IonCardTitle>
                  <IonBadge color={getStatusColor(order.order_status)}>
                    {order.order_status}
                  </IonBadge>
                </IonCardHeader>
                <IonCardContent>
                  <div className="order-details">
                    <p><strong>Order Date:</strong> {new Date(order.order_date).toLocaleString()}</p>
                    <p><strong>Total Amount:</strong> ₹{(order.total_amount + order.gst_amount).toFixed(2)}</p>
                  </div>

                  <div className="order-items">
                    <strong>Items:</strong>
                    <ul>
                      {order.items.map((item, index) => (
                        <li key={index}>
                          {item.name} x {item.quantity} - ₹{(item.price * item.quantity).toFixed(2)}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="order-details">
                    <IonItem lines="none">
                      <IonIcon icon={locationOutline} slot="start" />
                      <IonLabel>{order.delivery_address}</IonLabel>
                    </IonItem>
                    <IonItem lines="none">
                      <IonIcon icon={cardOutline} slot="start" />
                      <IonLabel>Payment: {order.payment_mode}</IonLabel>
                    </IonItem>
                  </div>

                  {order.order_status === 'Delivered' && (
                    <IonButton expand="block" color="primary">
                      Reorder
                    </IonButton>
                  )}
                </IonCardContent>
              </IonCard>
            ))}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};

export default OrderHistory; 