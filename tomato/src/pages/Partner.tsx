import React, { useState, useEffect } from 'react';
import { IonPage, IonContent, IonHeader, IonToolbar, IonTitle, IonCard, IonCardContent, IonButton, IonList, IonItem, IonLabel, IonBadge } from '@ionic/react';
import axios from 'axios';
import './Partner.css';

interface Order {
  id: number;
  order_id: string;
  user_id: number;
  total_amount: number;
  delivery_address: string;
  order_status: string;
  created_at: string;
}

const Partner: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/orders');
      setOrders(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setLoading(false);
    }
  };

  const handleAcceptOrder = async (orderId: number) => {
    try {
      await axios.put(`http://localhost:5000/api/orders/${orderId}/status`, {
        status: 'ON_THE_WAY'
      });
      fetchOrders(); // Refresh the orders list
    } catch (error) {
      console.error('Error accepting order:', error);
    }
  };

  const handleCompleteOrder = async (orderId: number) => {
    try {
      await axios.put(`http://localhost:5000/api/orders/${orderId}/status`, {
        status: 'DELIVERED'
      });
      fetchOrders(); // Refresh the orders list
    } catch (error) {
      console.error('Error completing order:', error);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Delivery Partner Dashboard</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div className="partner-container">
          <h2>Available Orders</h2>
          {loading ? (
            <p>Loading orders...</p>
          ) : orders.length === 0 ? (
            <p>No orders available</p>
          ) : (
            <IonList>
              {orders.map((order) => (
                <IonCard key={order.id} className="order-card">
                  <IonCardContent>
                    <IonItem lines="none">
                      <IonLabel>
                        <h2>Order #{order.order_id}</h2>
                        <p>Amount: ₹{order.total_amount.toFixed(2)}</p>
                        <p>Address: {order.delivery_address}</p>
                        <p>Status: <IonBadge color={getStatusColor(order.order_status)}>
                          {order.order_status}
                        </IonBadge></p>
                      </IonLabel>
                    </IonItem>
                    <div className="order-actions">
                      {order.order_status === 'PENDING' && (
                        <IonButton
                          expand="block"
                          color="success"
                          onClick={() => handleAcceptOrder(order.id)}
                        >
                          Accept Order
                        </IonButton>
                      )}
                      {order.order_status === 'ON_THE_WAY' && (
                        <IonButton
                          expand="block"
                          color="primary"
                          onClick={() => handleCompleteOrder(order.id)}
                        >
                          Mark as Delivered
                        </IonButton>
                      )}
                    </div>
                  </IonCardContent>
                </IonCard>
              ))}
            </IonList>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

const getStatusColor = (status: string): string => {
  switch (status) {
    case 'PENDING':
      return 'warning';
    case 'ON_THE_WAY':
      return 'primary';
    case 'DELIVERED':
      return 'success';
    default:
      return 'medium';
  }
};

export default Partner; 