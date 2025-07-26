import React from 'react';
import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonImg, IonBadge, IonIcon } from '@ionic/react';
import { locationOutline, timeOutline, star } from 'ionicons/icons';
import './RestaurantCard.css';

interface Restaurant {
  id: number;
  name: string;
  description: string;
  image_url: string;
  address: string;
  rating: number;
  delivery_time: string;
  is_open: boolean;
}

interface RestaurantCardProps {
  restaurant: Restaurant;
  onClick: () => void;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant, onClick }) => {
  return (
    <IonCard className="restaurant-card" onClick={onClick}>
      <IonImg src={restaurant.image_url} alt={restaurant.name} />
      <IonCardHeader>
        <IonCardTitle>{restaurant.name}</IonCardTitle>
        <IonCardSubtitle>
          <IonIcon icon={star} color="warning" />
          {restaurant.rating.toFixed(1)}
        </IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent>
        <p>{restaurant.description}</p>
        <div className="restaurant-info">
          <IonIcon icon={locationOutline} />
          <span>{restaurant.address}</span>
        </div>
        <div className="restaurant-info">
          <IonIcon icon={timeOutline} />
          <span>{restaurant.delivery_time}</span>
        </div>
        <IonBadge color={restaurant.is_open ? 'success' : 'danger'}>
          {restaurant.is_open ? 'Open' : 'Closed'}
        </IonBadge>
      </IonCardContent>
    </IonCard>
  );
};

export default RestaurantCard;