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
  IonSelect,
  IonSelectOption,
  IonBadge,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonText,
  IonSearchbar,
  IonDatetime
} from '@ionic/react';
import axios from 'axios';

interface Order {
  order_id: number;
  customer_name: string;
  total_amount: number;
  gst_amount: number;
  delivery_address: string;
  order_status: string;
  order_date: string;
  payment_mode: string;
  items: string;
}

const AdminOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    filterOrders();
  }, [orders, statusFilter, dateFilter, searchQuery]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const filterOrders = () => {
    let filtered = [...orders];

    if (statusFilter !== 'all') {
      filtered = filtered.filter(order => order.order_status === statusFilter);
    }

    if (dateFilter) {
      const filterDate = new Date(dateFilter).toISOString().split('T')[0];
      filtered = filtered.filter(order => 
        order.order_date.split('T')[0] === filterDate
      );
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(order =>
        order.customer_name.toLowerCase().includes(query) ||
        order.order_id.toString().includes(query)
      );
    }

    setFilteredOrders(filtered);
  };

  const updateOrderStatus = async (orderId: number, newStatus: string) => {
    try {
      await axios.put(`http://localhost:3001/api/orders/${orderId}/status`, {
        status: newStatus
      });
      fetchOrders(); // Refresh orders after update
    } catch (error) {
      console.error('Error updating order status:', error);
    }
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

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Order Management</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div className="filters">
          <IonSearchbar
            value={searchQuery}
            onIonChange={e => setSearchQuery(e.detail.value!)}
            placeholder="Search orders"
          />
          
          <IonItem>
            <IonLabel>Filter by Status</IonLabel>
            <IonSelect
              value={statusFilter}
              onIonChange={e => setStatusFilter(e.detail.value)}
            >
              <IonSelectOption value="all">All</IonSelectOption>
              <IonSelectOption value="Pending">Pending</IonSelectOption>
              <IonSelectOption value="Accepted">Accepted</IonSelectOption>
              <IonSelectOption value="Preparing">Preparing</IonSelectOption>
              <IonSelectOption value="Out for Delivery">Out for Delivery</IonSelectOption>
              <IonSelectOption value="Delivered">Delivered</IonSelectOption>
              <IonSelectOption value="Cancelled">Cancelled</IonSelectOption>
            </IonSelect>
          </IonItem>

          <IonItem>
            <IonLabel>Filter by Date</IonLabel>
            <IonDatetime
              value={dateFilter}
              onIonChange={e => setDateFilter(e.detail.value as string)}
              presentation="date"
            />
          </IonItem>
        </div>

        <IonList>
          {filteredOrders.map(order => (
            <IonCard key={order.order_id}>
              <IonCardHeader>
                <IonCardTitle>Order #{order.order_id}</IonCardTitle>
                <IonBadge color={getStatusColor(order.order_status)}>
                  {order.order_status}
                </IonBadge>
              </IonCardHeader>
              <IonCardContent>
                <IonText>
                  <p><strong>Customer:</strong> {order.customer_name}</p>
                  <p><strong>Items:</strong> {order.items}</p>
                  <p><strong>Total Amount:</strong> ₹{order.total_amount + order.gst_amount}</p>
                  <p><strong>Delivery Address:</strong> {order.delivery_address}</p>
                  <p><strong>Payment Mode:</strong> {order.payment_mode}</p>
                  <p><strong>Order Date:</strong> {new Date(order.order_date).toLocaleString()}</p>
                </IonText>

                <IonItem>
                  <IonLabel>Update Status</IonLabel>
                  <IonSelect
                    value={order.order_status}
                    onIonChange={e => updateOrderStatus(order.order_id, e.detail.value)}
                  >
                    <IonSelectOption value="Pending">Pending</IonSelectOption>
                    <IonSelectOption value="Accepted">Accepted</IonSelectOption>
                    <IonSelectOption value="Preparing">Preparing</IonSelectOption>
                    <IonSelectOption value="Out for Delivery">Out for Delivery</IonSelectOption>
                    <IonSelectOption value="Delivered">Delivered</IonSelectOption>
                    <IonSelectOption value="Cancelled">Cancelled</IonSelectOption>
                  </IonSelect>
                </IonItem>
              </IonCardContent>
            </IonCard>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default AdminOrders; 