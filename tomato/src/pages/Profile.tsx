import React, { useState, useEffect } from 'react'
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonItem,
  IonInput,
  IonButton,
  IonIcon,
  IonAvatar,
  IonList,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonToggle,
  IonSelect,
  IonSelectOption,
  IonText,
  IonModal,
  IonButtons,
  IonBackButton,
  IonGrid,
  IonRow,
  IonCol,
  IonChip,
  IonBadge,
  SegmentValue
} from '@ionic/react'
import {
  personCircleOutline,
  locationOutline,
  cardOutline,
  heartOutline,
  notificationsOutline,
  settingsOutline,
  addOutline,
  trashOutline,
  pencilOutline,
  timeOutline,
  restaurantOutline,
  leafOutline
} from 'ionicons/icons'
import './Profile.css'

interface Address {
  id: number
  title: string
  address: string
  isDefault: boolean
}

interface Order {
  id: number
  date: string
  restaurant: string
  items: string[]
  total: number
  status: string
}

interface PaymentMethod {
  id: number
  type: string
  details: string
  isDefault: boolean
}

const Profile: React.FC = () => {
  const [activeSegment, setActiveSegment] = useState<SegmentValue>('personal')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [addresses, setAddresses] = useState<Address[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([])
  const [dietaryPreference, setDietaryPreference] = useState('')
  const [notifications, setNotifications] = useState({
    push: true,
    email: true
  })
  const [showAddressModal, setShowAddressModal] = useState(false)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [newAddress, setNewAddress] = useState<Partial<Address>>({})
  const [newPayment, setNewPayment] = useState<Partial<PaymentMethod>>({})

  useEffect(() => {
    // Fetch user data from API
    const fetchUserData = async () => {
      try {
        // Mock data for demonstration
        setAddresses([
          {
            id: 1,
            title: 'Home',
            address: '123 Main St, City, State 12345',
            isDefault: true
          }
        ])
        setOrders([
          {
            id: 1,
            date: '2024-03-15',
            restaurant: 'Pizza Palace',
            items: ['Margherita Pizza', 'Garlic Bread'],
            total: 25.99,
            status: 'Delivered'
          }
        ])
        setPaymentMethods([
          {
            id: 1,
            type: 'card',
            details: 'Visa ending in 1234',
            isDefault: true
          }
        ])
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    }

    fetchUserData()
  }, [])

  const handleSaveProfile = async () => {
    // Implement profile update logic
    console.log('Saving profile changes...')
  }

  const handleAddAddress = () => {
    // Implement address addition logic
    console.log('Adding new address...')
    setShowAddressModal(false)
  }

  const handleAddPayment = () => {
    // Implement payment method addition logic
    console.log('Adding new payment method...')
    setShowPaymentModal(false)
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Profile</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {/* Profile Header */}
        <div className="profile-header">
          <IonAvatar className="profile-avatar">
            <IonIcon icon={personCircleOutline} />
          </IonAvatar>
          <h2>{localStorage.getItem('userName')}</h2>
        </div>

        {/* Navigation Tabs */}
        <IonSegment value={activeSegment} onIonChange={e => setActiveSegment(e.detail.value!)}>
          <IonSegmentButton value="personal">
            <IonIcon icon={personCircleOutline} />
            <IonLabel>Personal</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="orders">
            <IonIcon icon={timeOutline} />
            <IonLabel>Orders</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="addresses">
            <IonIcon icon={locationOutline} />
            <IonLabel>Addresses</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="payments">
            <IonIcon icon={cardOutline} />
            <IonLabel>Payments</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="settings">
            <IonIcon icon={settingsOutline} />
            <IonLabel>Settings</IonLabel>
          </IonSegmentButton>
        </IonSegment>

        {/* Personal Information Section */}
        {activeSegment === 'personal' && (
          <div className="section-content">
            <IonList>
              <IonItem>
                <IonLabel position="stacked">Full Name</IonLabel>
                <IonInput value={name} onIonChange={e => setName(e.detail.value!)} />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Email</IonLabel>
                <IonInput type="email" value={email} onIonChange={e => setEmail(e.detail.value!)} />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Phone Number</IonLabel>
                <IonInput type="tel" value={phone} onIonChange={e => setPhone(e.detail.value!)} />
              </IonItem>
            </IonList>
            <IonButton expand="block" onClick={handleSaveProfile}>
              Save Changes
            </IonButton>
          </div>
        )}

        {/* Orders Section */}
        {activeSegment === 'orders' && (
          <div className="section-content">
            {orders.map(order => (
              <IonCard key={order.id}>
                <IonCardHeader>
                  <IonCardTitle>{order.restaurant}</IonCardTitle>
                  <IonText color="medium">{order.date}</IonText>
                </IonCardHeader>
                <IonCardContent>
                  <IonList>
                    {order.items.map((item, index) => (
                      <IonItem key={index}>
                        <IonLabel>{item}</IonLabel>
                      </IonItem>
                    ))}
                  </IonList>
                  <div className="order-footer">
                    <IonBadge color="success">{order.status}</IonBadge>
                    <IonButton size="small" fill="outline">
                      Reorder
                    </IonButton>
                  </div>
                </IonCardContent>
              </IonCard>
            ))}
          </div>
        )}

        {/* Addresses Section */}
        {activeSegment === 'addresses' && (
          <div className="section-content">
            {addresses.map(address => (
              <IonCard key={address.id}>
                <IonCardContent>
                  <div className="address-header">
                    <IonText>
                      <h3>{address.title}</h3>
                    </IonText>
                    {address.isDefault && <IonChip color="primary">Default</IonChip>}
                  </div>
                  <p>{address.address}</p>
                  <div className="address-actions">
                    <IonButton fill="clear" size="small">
                      <IonIcon icon={pencilOutline} />
                    </IonButton>
                    <IonButton fill="clear" size="small" color="danger">
                      <IonIcon icon={trashOutline} />
                    </IonButton>
                  </div>
                </IonCardContent>
              </IonCard>
            ))}
            <IonButton expand="block" onClick={() => setShowAddressModal(true)}>
              <IonIcon icon={addOutline} slot="start" />
              Add New Address
            </IonButton>
          </div>
        )}

        {/* Payment Methods Section */}
        {activeSegment === 'payments' && (
          <div className="section-content">
            {paymentMethods.map(payment => (
              <IonCard key={payment.id}>
                <IonCardContent>
                  <div className="payment-header">
                    <IonText>
                      <h3>{payment.type}</h3>
                    </IonText>
                    {payment.isDefault && <IonChip color="primary">Default</IonChip>}
                  </div>
                  <p>{payment.details}</p>
                  <div className="payment-actions">
                    <IonButton fill="clear" size="small">
                      <IonIcon icon={pencilOutline} />
                    </IonButton>
                    <IonButton fill="clear" size="small" color="danger">
                      <IonIcon icon={trashOutline} />
                    </IonButton>
                  </div>
                </IonCardContent>
              </IonCard>
            ))}
            <IonButton expand="block" onClick={() => setShowPaymentModal(true)}>
              <IonIcon icon={addOutline} slot="start" />
              Add Payment Method
            </IonButton>
          </div>
        )}

        {/* Settings Section */}
        {activeSegment === 'settings' && (
          <div className="section-content">
            <IonList>
              <IonItem>
                <IonLabel>Dietary Preferences</IonLabel>
                <IonSelect
                  value={dietaryPreference}
                  onIonChange={e => setDietaryPreference(e.detail.value)}
                >
                  <IonSelectOption value="vegetarian">Vegetarian</IonSelectOption>
                  <IonSelectOption value="non-vegetarian">Non-Vegetarian</IonSelectOption>
                  <IonSelectOption value="vegan">Vegan</IonSelectOption>
                </IonSelect>
              </IonItem>
              <IonItem>
                <IonLabel>Push Notifications</IonLabel>
                <IonToggle
                  checked={notifications.push}
                  onIonChange={e => setNotifications({ ...notifications, push: e.detail.checked })}
                />
              </IonItem>
              <IonItem>
                <IonLabel>Email Notifications</IonLabel>
                <IonToggle
                  checked={notifications.email}
                  onIonChange={e => setNotifications({ ...notifications, email: e.detail.checked })}
                />
              </IonItem>
            </IonList>
            <IonButton expand="block" color="danger" onClick={() => {
              localStorage.clear()
              window.location.href = '/login'
            }}>
              Log Out
            </IonButton>
          </div>
        )}

        {/* Add Address Modal */}
        <IonModal isOpen={showAddressModal}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Add New Address</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setShowAddressModal(false)}>Close</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <IonList>
              <IonItem>
                <IonLabel position="stacked">Title</IonLabel>
                <IonInput
                  value={newAddress.title}
                  onIonChange={e => setNewAddress({ ...newAddress, title: e.detail.value! })}
                />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Address</IonLabel>
                <IonInput
                  value={newAddress.address}
                  onIonChange={e => setNewAddress({ ...newAddress, address: e.detail.value! })}
                />
              </IonItem>
            </IonList>
            <IonButton expand="block" onClick={handleAddAddress}>
              Save Address
            </IonButton>
          </IonContent>
        </IonModal>

        {/* Add Payment Modal */}
        <IonModal isOpen={showPaymentModal}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Add Payment Method</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setShowPaymentModal(false)}>Close</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <IonList>
              <IonItem>
                <IonLabel position="stacked">Card Number</IonLabel>
                <IonInput
                  value={newPayment.details}
                  onIonChange={e => setNewPayment({ ...newPayment, details: e.detail.value! })}
                />
              </IonItem>
            </IonList>
            <IonButton expand="block" onClick={handleAddPayment}>
              Save Payment Method
            </IonButton>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  )
}

export default Profile 