import React from 'react';
import { IonPage, IonContent, IonHeader, IonToolbar, IonTitle, IonCard, IonCardContent, IonButton } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import './Role.css';

const Role: React.FC = () => {
  const history = useHistory();

  const handleRoleSelect = (role: string) => {
    switch (role) {
      case 'user':
        history.push('/home');
        break;
      case 'partner':
        history.push('/partner');
        break;
      case 'admin':
        history.push('/admin');
        break;
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Select Your Role</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div className="role-container">
          <IonCard className="role-card" onClick={() => handleRoleSelect('user')}>
            <IonCardContent>
              <div className="role-icon">👤</div>
              <h2>User</h2>
              <p>Order food and track your deliveries</p>
              <IonButton expand="block" className="role-button">
                Continue as User
              </IonButton>
            </IonCardContent>
          </IonCard>

          <IonCard className="role-card" onClick={() => handleRoleSelect('partner')}>
            <IonCardContent>
              <div className="role-icon">🚚</div>
              <h2>Delivery Partner</h2>
              <p>Accept and deliver orders</p>
              <IonButton expand="block" className="role-button">
                Continue as Partner
              </IonButton>
            </IonCardContent>
          </IonCard>

          <IonCard className="role-card" onClick={() => handleRoleSelect('admin')}>
            <IonCardContent>
              <div className="role-icon">👨‍💼</div>
              <h2>Admin</h2>
              <p>Manage orders and system settings</p>
              <IonButton expand="block" className="role-button">
                Continue as Admin
              </IonButton>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Role; 