import React, { useState, useEffect } from 'react';
import {
  IonPage, IonContent, IonHeader, IonToolbar, IonTitle, IonSearchbar,
  IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle,
  IonCardContent, IonChip, IonLabel, IonIcon, IonBadge, IonSelect,
  IonSelectOption, IonButton, IonSpinner, IonInfiniteScroll,
  IonInfiniteScrollContent, IonModal, IonButtons, IonButton as IonHeaderButton,
  IonItem
} from '@ionic/react';
import {
  star, time, location, cash, filter, close,
  flame, trendingUp, heart, restaurant
} from 'ionicons/icons';
import { advancedFeatures, Restaurant, Offer } from '../services/advancedFeatures';
import './RestaurantList.css';

const RestaurantList: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('rating');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [showRestaurantModal, setShowRestaurantModal] = useState(false);

  useEffect(() => {
    fetchRestaurants();
  }, [selectedCuisine, sortBy]);

  const fetchRestaurants = async () => {
    try {
      setLoading(true);
      const data = await advancedFeatures.getRestaurants({
        cuisine: selectedCuisine,
        sort_by: sortBy as 'rating' | 'delivery_time' | 'min_order'
      });
      setRestaurants(data);
    } catch (error) {
      console.error('Error fetching restaurants:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (query.length > 2) {
      try {
        const data = await advancedFeatures.searchRestaurants(query);
        setRestaurants(data);
      } catch (error) {
        console.error('Error searching restaurants:', error);
      }
    } else {
      fetchRestaurants();
    }
  };

  const renderRestaurantCard = (restaurant: Restaurant) => (
    <IonCard 
      key={restaurant.id} 
      className="restaurant-card"
      onClick={() => {
        setSelectedRestaurant(restaurant);
        setShowRestaurantModal(true);
      }}
    >
      <img src={restaurant.image_url} alt={restaurant.name} />
      <IonCardHeader>
        <IonCardTitle>{restaurant.name}</IonCardTitle>
        <div className="restaurant-rating">
          <IonIcon icon={star} color="warning" />
          <span>{restaurant.rating.toFixed(1)}</span>
        </div>
      </IonCardHeader>
      <IonCardContent>
        <div className="restaurant-info">
          <div className="info-item">
            <IonIcon icon={time} />
            <span>{restaurant.delivery_time}</span>
          </div>
          <div className="info-item">
            <IonIcon icon={cash} />
            <span>₹{restaurant.min_order}+</span>
          </div>
          <div className="info-item">
            <IonIcon icon={location} />
            <span>{restaurant.delivery_fee} km</span>
          </div>
        </div>
        <div className="cuisines">
          {restaurant.cuisines.map((cuisine, index) => (
            <IonChip key={index} color="primary">
              <IonLabel>{cuisine}</IonLabel>
            </IonChip>
          ))}
        </div>
        {restaurant.offers.length > 0 && (
          <div className="offers">
            <IonBadge color="success">
              {restaurant.offers[0].title}
            </IonBadge>
          </div>
        )}
      </IonCardContent>
    </IonCard>
  );

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Restaurants</IonTitle>
          <IonButton slot="end" onClick={() => setShowFilters(true)}>
            <IonIcon icon={filter} />
          </IonButton>
        </IonToolbar>
        <IonToolbar>
          <IonSearchbar
            value={searchQuery}
            onIonChange={e => handleSearch(e.detail.value!)}
            placeholder="Search restaurants..."
          />
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="restaurant-list">
          {loading ? (
            <div className="loading-spinner">
              <IonSpinner name="crescent" />
            </div>
          ) : (
            <IonGrid>
              <IonRow>
                {restaurants.map(restaurant => (
                  <IonCol size="12" sizeMd="6" sizeLg="4" key={restaurant.id}>
                    {renderRestaurantCard(restaurant)}
                  </IonCol>
                ))}
              </IonRow>
            </IonGrid>
          )}
        </div>

        {/* Filters Modal */}
        <IonModal isOpen={showFilters} onDidDismiss={() => setShowFilters(false)}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Filters</IonTitle>
              <IonButtons slot="end">
                <IonHeaderButton onClick={() => setShowFilters(false)}>
                  <IonIcon icon={close} />
                </IonHeaderButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <IonItem>
              <IonLabel>Cuisine</IonLabel>
              <IonSelect
                value={selectedCuisine}
                onIonChange={e => setSelectedCuisine(e.detail.value)}
              >
                <IonSelectOption value="">All</IonSelectOption>
                <IonSelectOption value="indian">Indian</IonSelectOption>
                <IonSelectOption value="chinese">Chinese</IonSelectOption>
                <IonSelectOption value="italian">Italian</IonSelectOption>
                <IonSelectOption value="mexican">Mexican</IonSelectOption>
              </IonSelect>
            </IonItem>
            <IonItem>
              <IonLabel>Sort By</IonLabel>
              <IonSelect
                value={sortBy}
                onIonChange={e => setSortBy(e.detail.value)}
              >
                <IonSelectOption value="rating">Rating</IonSelectOption>
                <IonSelectOption value="delivery_time">Delivery Time</IonSelectOption>
                <IonSelectOption value="min_order">Minimum Order</IonSelectOption>
              </IonSelect>
            </IonItem>
          </IonContent>
        </IonModal>

        {/* Restaurant Details Modal */}
        <IonModal isOpen={showRestaurantModal} onDidDismiss={() => setShowRestaurantModal(false)}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>{selectedRestaurant?.name}</IonTitle>
              <IonButtons slot="end">
                <IonHeaderButton onClick={() => setShowRestaurantModal(false)}>
                  <IonIcon icon={close} />
                </IonHeaderButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            {selectedRestaurant && (
              <div className="restaurant-details">
                <img src={selectedRestaurant.image_url} alt={selectedRestaurant.name} />
                <div className="restaurant-info">
                  <h2>{selectedRestaurant.name}</h2>
                  <div className="rating">
                    <IonIcon icon={star} color="warning" />
                    <span>{selectedRestaurant.rating.toFixed(1)}</span>
                  </div>
                  <p>{selectedRestaurant.description}</p>
                  <div className="details-grid">
                    <div className="detail-item">
                      <IonIcon icon={time} />
                      <span>{selectedRestaurant.delivery_time}</span>
                    </div>
                    <div className="detail-item">
                      <IonIcon icon={cash} />
                      <span>₹{selectedRestaurant.min_order}+</span>
                    </div>
                    <div className="detail-item">
                      <IonIcon icon={location} />
                      <span>{selectedRestaurant.delivery_fee} km</span>
                    </div>
                  </div>
                  <div className="cuisines">
                    {selectedRestaurant.cuisines.map((cuisine, index) => (
                      <IonChip key={index} color="primary">
                        <IonLabel>{cuisine}</IonLabel>
                      </IonChip>
                    ))}
                  </div>
                  {selectedRestaurant.offers.length > 0 && (
                    <div className="offers">
                      <h3>Offers</h3>
                      {selectedRestaurant.offers.map((offer, index) => (
                        <div key={index} className="offer-item">
                          <IonBadge color="success">{offer.title}</IonBadge>
                          <p>{offer.description}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default RestaurantList; 