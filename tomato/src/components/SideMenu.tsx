import React from 'react';
import {
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonIcon,
  IonLabel,
} from '@ionic/react';
import {
  homeOutline,
  restaurantOutline,
  calendarOutline,
  informationCircleOutline,
  callOutline,
} from 'ionicons/icons';
import { useLocation } from 'react-router-dom';

const SideMenu: React.FC = () => {
  const location = useLocation();

  const menuItems = [
    { title: 'Home', path: '/', icon: homeOutline },
    { title: 'Menu', path: '/menu', icon: restaurantOutline },
    { title: 'Events', path: '/events', icon: calendarOutline },
    { title: 'About', path: '/about', icon: informationCircleOutline },
    { title: 'Contact', path: '/contact', icon: callOutline },
  ];

  return (
    <IonMenu contentId="main" type="overlay">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Feastique</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {menuItems.map((item, index) => (
            <IonItem
              key={index}
              routerLink={item.path}
              routerDirection="none"
              lines="none"
              detail={false}
              className={location.pathname === item.path ? 'selected' : ''}
            >
              <IonIcon slot="start" icon={item.icon} />
              <IonLabel>{item.title}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default SideMenu; 