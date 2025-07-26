import React, { useState } from 'react';
import { IonPage, IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton, IonCard, IonCardContent, IonList, IonItem, IonLabel, IonButton, IonAlert, IonCheckbox, IonIcon, IonRadio, IonRadioGroup, IonModal, IonInput, IonTextarea } from '@ionic/react';
import { useLocation, useHistory } from 'react-router-dom';
import axios from 'axios';
import './OrderCart.css';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

interface Address {
  flatNo: string;
  area: string;
  city: string;
}

const OrderCart: React.FC = () => {
  const location = useLocation();
  const history = useHistory();
  const { cartItems, menuItems } = location.state as { cartItems: { [key: number]: number }, menuItems: MenuItem[] };
  const [showPaymentAlert, setShowPaymentAlert] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<string>('');
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [address, setAddress] = useState<Address>({
    flatNo: '',
    area: '',
    city: ''
  });
  const [savedAddress, setSavedAddress] = useState<Address | null>(null);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const paymentMethods = [
    {
      id: 'upi',
      title: 'UPI',
      description: 'Pay using Google Pay, PhonePe, or other UPI apps',
      icon: 'card'
    },
    {
      id: 'card',
      title: 'Credit / Debit Card',
      description: 'All major cards accepted',
      icon: 'card'
    },
    {
      id: 'wallet',
      title: 'Digital Wallet',
      description: 'Paytm, Amazon Pay, etc.',
      icon: 'wallet'
    },
    {
      id: 'cod',
      title: 'Cash on Delivery',
      description: 'Pay when you receive your order',
      icon: 'cash'
    }
  ];

  const handlePaymentSelect = (paymentId: string) => {
    setSelectedPayment(paymentId);
  };

  const calculateSubtotal = () => {
    return Object.entries(cartItems).reduce((total, [itemId, quantity]) => {
      const item = menuItems.find(mi => mi.id === Number(itemId));
      return total + (item?.price || 0) * quantity;
    }, 0);
  };

  const calculateGST = () => {
    const subtotal = calculateSubtotal();
    return subtotal * 0.05; // 5% GST
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateGST();
  };

  const handleAddressSave = () => {
    setSavedAddress(address);
    setShowAddressModal(false);
  };

  const handlePlaceOrder = async () => {
    if (!selectedPayment || !savedAddress) {
      setError('Please select payment method and add delivery address');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const userId = localStorage.getItem('userId');
      console.log('User ID from localStorage:', userId);
      
      if (!userId) {
        setError('Please login to place order');
        return;
      }

      // Prepare order items
      const orderItems = Object.entries(cartItems).map(([itemId, quantity]) => {
        const item = menuItems.find(mi => mi.id === Number(itemId));
        return {
          item_name: item?.name || '',
          quantity: quantity,
          price: item?.price || 0
        };
      });

      const orderData = {
        user_id: parseInt(userId),
        items: orderItems,
        total_amount: calculateTotal(),
        gst_amount: calculateGST(),
        delivery_address: `${savedAddress.flatNo}, ${savedAddress.area}, ${savedAddress.city}`,
        payment_mode: selectedPayment,
        order_status: 'Pending'
      };

      console.log('Sending order data:', orderData);

      const response = await axios.post('http://localhost:5000/api/orders', orderData);
      console.log('Order response:', response.data);
      
      if (response.data.success) {
        console.log('Order placed successfully, navigating to confirmation page...');
        history.push('/order-confirmation', { 
          cartItems,
          menuItems,
          orderId: response.data.order_id,
          total: calculateTotal()
        });
      } else {
        console.error('Order placement failed:', response.data.error);
        setError(response.data.error || 'Failed to place order. Please try again.');
      }
    } catch (error: any) {
      console.error('Error placing order:', error);
      console.error('Error details:', error.response?.data);
      setError(error.response?.data?.error || error.message || 'Failed to place order. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/restaurant-menu" />
          </IonButtons>
          <IonTitle>Order Summary</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="order-cart-content">
          <IonCard className="order-summary">
            <IonCardContent>
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
                <div className="bill-row">
                  <span>Subtotal</span>
                  <span>₹{calculateSubtotal().toFixed(2)}</span>
                </div>
                <div className="bill-row">
                  <span>GST (5%)</span>
                  <span>₹{calculateGST().toFixed(2)}</span>
                </div>
                <div className="bill-row total">
                  <span>Total</span>
                  <span>₹{calculateTotal().toFixed(2)}</span>
                </div>
              </div>
            </IonCardContent>
          </IonCard>

          {/* Address Section */}
          <IonCard className="address-card">
            <h2>Delivery Address</h2>
            {savedAddress ? (
              <div className="saved-address">
                <p><strong>Address:</strong> {savedAddress.flatNo}</p>
                <p><strong>Area:</strong> {savedAddress.area}</p>
                <p><strong>City:</strong> {savedAddress.city}</p>
                <IonButton fill="clear" onClick={() => setShowAddressModal(true)}>
                  Change Address
                </IonButton>
              </div>
            ) : (
              <IonButton 
                expand="block" 
                onClick={() => setShowAddressModal(true)}
                className="add-address-btn"
              >
                Add Address
              </IonButton>
            )}
          </IonCard>

          <IonCard className="payment-card">
            <h2>Payment Method</h2>
            <IonRadioGroup 
              value={selectedPayment} 
              onIonChange={e => handlePaymentSelect(e.detail.value)}
            >
              <div className="payment-options">
                {paymentMethods.map((method) => (
                  <div 
                    key={method.id}
                    className={`payment-option ${selectedPayment === method.id ? 'selected' : ''}`}
                  >
                    <div className="payment-option-content">
                      <IonIcon icon={method.icon} className="payment-icon" />
                      <div className="payment-details">
                        <h3>{method.title}</h3>
                        <p>{method.description}</p>
                      </div>
                    </div>
                    <IonRadio value={method.id} />
                  </div>
                ))}
              </div>
            </IonRadioGroup>
          </IonCard>

          {/* Error Display */}
          {error && (
            <IonCard className="error-card">
              <IonCardContent>
                <p className="error-message">{error}</p>
              </IonCardContent>
            </IonCard>
          )}

          {/* Address Side Menu */}
          <IonModal 
            isOpen={showAddressModal} 
            onDidDismiss={() => setShowAddressModal(false)}
            breakpoints={[0, 0.5, 0.8]}
            initialBreakpoint={0.5}
            className="address-side-menu"
          >
            <IonContent className="address-modal-content">
              <div className="address-modal-header">
                <h2>Add Delivery Address</h2>
                <IonButton fill="clear" onClick={() => setShowAddressModal(false)}>
                  Close
                </IonButton>
              </div>
              <div className="address-modal-body">
                <IonInput
                  label="Flat No./House No./Building Name"
                  labelPlacement="floating"
                  value={address.flatNo}
                  onIonChange={e => setAddress({...address, flatNo: e.detail.value!})}
                  className="address-input"
                />
                <IonInput
                  label="Area"
                  labelPlacement="floating"
                  value={address.area}
                  onIonChange={e => setAddress({...address, area: e.detail.value!})}
                  className="address-input"
                />
                <IonInput
                  label="City"
                  labelPlacement="floating"
                  value={address.city}
                  onIonChange={e => setAddress({...address, city: e.detail.value!})}
                  className="address-input"
                />
                <div className="address-modal-buttons">
                  <IonButton 
                    expand="block" 
                    onClick={handleAddressSave}
                    className="save-address-btn"
                  >
                    Save Address
                  </IonButton>
                </div>
              </div>
            </IonContent>
          </IonModal>

          {/* Fixed bottom button container */}
          <div className="place-order-container">
            <IonButton 
              expand="block" 
              className="place-order-btn"
              onClick={handlePlaceOrder}
              disabled={!selectedPayment || !savedAddress || isLoading}
            >
              {isLoading ? 'Placing Order...' : 'Place Order'}
            </IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default OrderCart; 