import { 
  IonHeader, 
  IonToolbar, 
  IonButtons, 
  IonButton, 
  IonIcon, 
  useIonRouter,
  IonMenuButton
} from '@ionic/react';
import { 
  homeOutline, 
  restaurantOutline, 
  menuOutline, 
  calendarOutline, 
  callOutline, 
  informationCircleOutline
} from 'ionicons/icons';
import './CommonHeader.css';

const CommonHeader: React.FC = () => {
  const router = useIonRouter();

  return (
    <IonHeader className="common-header">
      <IonToolbar>
        <div className="header-content">
          <div className="logo-section" onClick={() => router.push('/home')}>
            <img src="/assets/logo-dark.png" alt="Feastique Logo" className="header-logo" />
          </div>
          
          <div className="nav-links desktop-nav">
            <IonButtons>
              <IonButton onClick={() => router.push('/home')} className="nav-button">
                <IonIcon icon={homeOutline} />
                <span>Home</span>
              </IonButton>
              
              <IonButton onClick={() => router.push('/special')} className="nav-button">
                <IonIcon icon={restaurantOutline} />
                <span>Special</span>
              </IonButton>
              
              <IonButton onClick={() => router.push('/menu')} className="nav-button">
                <IonIcon icon={menuOutline} />
                <span>Menu</span>
              </IonButton>
              
              <IonButton onClick={() => router.push('/events')} className="nav-button">
                <IonIcon icon={calendarOutline} />
                <span>Events</span>
              </IonButton>
              
              <IonButton onClick={() => router.push('/contact')} className="nav-button">
                <IonIcon icon={callOutline} />
                <span>Contact</span>
              </IonButton>
              
              <IonButton onClick={() => router.push('/about')} className="nav-button">
                <IonIcon icon={informationCircleOutline} />
                <span>About</span>
              </IonButton>
            </IonButtons>
          </div>

          <div className="mobile-nav">
            <IonMenuButton autoHide={false} />
          </div>
        </div>
      </IonToolbar>
    </IonHeader>
  );
};

export default CommonHeader; 