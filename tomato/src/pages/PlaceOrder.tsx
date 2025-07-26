import React, { useState } from 'react';
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonText,
  IonSelect,
  IonSelectOption,
  IonTextarea
} from '@ionic/react';
import axios from 'axios';

interface CartItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

const PlaceOrder: React.FC = () => {
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [paymentMode, setPaymentMode] = useState('Cash');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Mock cart items - replace with actual cart state
  const cartItems: CartItem[] = [
    { id: 1, name: 'Pizza', quantity: 2, price: 299 },
    { id: 2, name: 'Burger', quantity: 1, price: 149 }
  ];

  const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const gstAmount = totalAmount * 0.18; // 18% GST

  const handlePlaceOrder = async () => {
    try {
      const customerId = localStorage.getItem('customerId'); // Get from auth context
      if (!customerId) {
        setError('Please login to place order');
        return;
      }

      const orderData = {
        customer_id: parseInt(customerId),
        items: cartItems,
        total_amount: totalAmount,
        gst_amount: gstAmount,
        delivery_address: deliveryAddress,
        payment_mode: paymentMode
      };

      const response = await axios.post('http://localhost:3001/api/orders', orderData);
      setSuccess('Order placed successfully!');
      // Clear cart and redirect to order details
    } catch (error) {
      setError('Failed to place order. Please try again.');
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Place Order</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          {cartItems.map(item => (
            <IonItem key={item.id}>
              <IonLabel>
                <h2>{item.name}</h2>
                <p>Quantity: {item.quantity}</p>
                <p>Price: ₹{item.price * item.quantity}</p>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>

        <div className="ion-padding">
          <IonText>
            <h3>Order Summary</h3>
            <p>Subtotal: ₹{totalAmount}</p>
            <p>GST (18%): ₹{gstAmount.toFixed(2)}</p>
            <h4>Total: ₹{(totalAmount + gstAmount).toFixed(2)}</h4>
          </IonText>
        </div>

        <IonItem>
          <IonLabel position="stacked">Delivery Address</IonLabel>
          <IonTextarea
            value={deliveryAddress}
            onIonChange={e => setDeliveryAddress(e.detail.value!)}
            rows={3}
            placeholder="Enter your delivery address"
          />
        </IonItem>

        <IonItem>
          <IonLabel>Payment Mode</IonLabel>
          <IonSelect
            value={paymentMode}
            onIonChange={e => setPaymentMode(e.detail.value)}
          >
            <IonSelectOption value="Cash">Cash on Delivery</IonSelectOption>
            <IonSelectOption value="Card">Credit/Debit Card</IonSelectOption>
            <IonSelectOption value="UPI">UPI</IonSelectOption>
            <IonSelectOption value="Net Banking">Net Banking</IonSelectOption>
          </IonSelect>
        </IonItem>

        {error && <IonText color="danger">{error}</IonText>}
        {success && <IonText color="success">{success}</IonText>}

        <IonButton expand="block" onClick={handlePlaceOrder}>
          Place Order
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default PlaceOrder; 