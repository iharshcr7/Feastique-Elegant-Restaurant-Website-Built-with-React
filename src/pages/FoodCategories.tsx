import React, { useState } from 'react';
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonImg,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
  IonText,
} from '@ionic/react';
import { star } from 'ionicons/icons';
import './FoodCategories.css';

interface Category {
  name: string;
  image: string;
}

interface Restaurant {
  id: number;
  name: string;
  type: string;
  image: string;
  rating: number;
  deliveryTime: string;
  minOrder: string;
}

const categories: Category[] = [
  { name: 'Pizza', image: '/assets/categories/pizza.png' },
  { name: 'Biryani', image: '/assets/categories/biryani.png' },
  { name: 'Chinese', image: '/assets/categories/chinese.png' },
  { name: 'North Indian', image: '/assets/categories/north-indian.png' },
  { name: 'South Indian', image: '/assets/categories/south-indian.png' },
  { name: 'Fast Food', image: '/assets/categories/fast-food.png' }
];

const restaurantsByCategory = {
  'Pizza': [
    {
      id: 1,
      name: "Domino's Pizza",
      type: "Restaurant",
      image: "/assets/restaurants/dominos.jpg",
      rating: 4.2,
      deliveryTime: "30-40 min",
      minOrder: "₹200"
    },
    {
      id: 2,
      name: "La Pino'z Pizza",
      type: "Restaurant",
      image: "/assets/restaurants/lapinoz.jpg",
      rating: 4.0,
      deliveryTime: "25-35 min",
      minOrder: "₹150"
    },
    {
      id: 3,
      name: "Pizza Hut",
      type: "Restaurant",
      image: "/assets/restaurants/pizzahut.jpg",
      rating: 4.1,
      deliveryTime: "35-45 min",
      minOrder: "₹250"
    }
  ],
  'North Indian': [
    {
      id: 4,
      name: "Spice of North",
      type: "Restaurant",
      image: "/assets/restaurants/spice-north.jpg",
      rating: 4.3,
      deliveryTime: "35-45 min",
      minOrder: "₹300"
    },
    {
      id: 5,
      name: "Royal Thali",
      type: "Restaurant",
      image: "/assets/restaurants/royal-thali.jpg",
      rating: 4.4,
      deliveryTime: "30-40 min",
      minOrder: "₹250"
    },
    {
      id: 6,
      name: "Punjabi Rasoi",
      type: "Restaurant",
      image: "/assets/restaurants/punjabi-rasoi.jpg",
      rating: 4.2,
      deliveryTime: "40-50 min",
      minOrder: "₹200"
    },
    {
      id: 7,
      name: "Flavours of India",
      type: "Restaurant",
      image: "/assets/restaurants/flavours-india.jpg",
      rating: 4.5,
      deliveryTime: "35-45 min",
      minOrder: "₹350"
    }
  ],
  'Biryani': [
    {
      id: 8,
      name: "Biryani Junction",
      type: "Restaurant",
      image: "/assets/restaurants/biryani-junction.jpg",
      rating: 4.3,
      deliveryTime: "30-40 min",
      minOrder: "₹200"
    },
    {
      id: 9,
      name: "Biryani Bae",
      type: "Restaurant",
      image: "/assets/restaurants/biryani-bae.jpg",
      rating: 4.4,
      deliveryTime: "35-45 min",
      minOrder: "₹250"
    },
    {
      id: 10,
      name: "The Biryani House",
      type: "Restaurant",
      image: "/assets/restaurants/biryani-house.jpg",
      rating: 4.2,
      deliveryTime: "40-50 min",
      minOrder: "₹300"
    },
    {
      id: 11,
      name: "Roll & Bowl",
      type: "Restaurant",
      image: "/assets/restaurants/roll-bowl.jpg",
      rating: 4.1,
      deliveryTime: "25-35 min",
      minOrder: "₹200"
    }
  ],
  'Burger': [
    {
      id: 12,
      name: "Burger Blast",
      type: "Restaurant",
      image: "/assets/restaurants/burger-blast.jpg",
      rating: 4.3,
      deliveryTime: "25-35 min",
      minOrder: "₹150"
    },
    {
      id: 13,
      name: "Burger Hub",
      type: "Restaurant",
      image: "/assets/restaurants/burger-hub.jpg",
      rating: 4.2,
      deliveryTime: "30-40 min",
      minOrder: "₹200"
    },
    {
      id: 14,
      name: "Big Bun",
      type: "Restaurant",
      image: "/assets/restaurants/big-bun.jpg",
      rating: 4.1,
      deliveryTime: "20-30 min",
      minOrder: "₹150"
    },
    {
      id: 15,
      name: "Chatori Gully",
      type: "Restaurant",
      image: "/assets/restaurants/chatori-gully.jpg",
      rating: 4.4,
      deliveryTime: "35-45 min",
      minOrder: "₹200"
    }
  ],
  'Chinese': [
    {
      id: 16,
      name: "Dragon Bowl",
      type: "Restaurant",
      image: "/assets/restaurants/dragon-bowl.jpg",
      rating: 4.4,
      deliveryTime: "30-40 min",
      minOrder: "₹250"
    },
    {
      id: 17,
      name: "Wok N Roll",
      type: "Restaurant",
      image: "/assets/restaurants/wok-n-roll.jpg",
      rating: 4.3,
      deliveryTime: "35-45 min",
      minOrder: "₹200"
    },
    {
      id: 18,
      name: "Noodle Nation",
      type: "Restaurant",
      image: "/assets/restaurants/noodle-nation.jpg",
      rating: 4.2,
      deliveryTime: "25-35 min",
      minOrder: "₹200"
    },
    {
      id: 19,
      name: "Roll & Bowl",
      type: "Restaurant",
      image: "/assets/restaurants/roll-bowl.jpg",
      rating: 4.3,
      deliveryTime: "30-40 min",
      minOrder: "₹250"
    }
  ],
  'Ice Cream': [
    {
      id: 20,
      name: "Frosty Scoops",
      type: "Restaurant",
      image: "/assets/restaurants/frosty-scoops.jpg",
      rating: 4.5,
      deliveryTime: "15-25 min",
      minOrder: "₹100"
    },
    {
      id: 21,
      name: "Scoopology",
      type: "Restaurant",
      image: "/assets/restaurants/scoopology.jpg",
      rating: 4.4,
      deliveryTime: "20-30 min",
      minOrder: "₹150"
    },
    {
      id: 22,
      name: "Cold Bliss",
      type: "Restaurant",
      image: "/assets/restaurants/cold-bliss.jpg",
      rating: 4.3,
      deliveryTime: "15-25 min",
      minOrder: "₹100"
    }
  ],
  'Pav Bhaji': [
    {
      id: 23,
      name: "Bombay Bhaji House",
      type: "Restaurant",
      image: "/assets/restaurants/bombay-bhaji.jpg",
      rating: 4.4,
      deliveryTime: "25-35 min",
      minOrder: "₹150"
    },
    {
      id: 24,
      name: "Pav Bhaji Point",
      type: "Restaurant",
      image: "/assets/restaurants/pav-bhaji-point.jpg",
      rating: 4.3,
      deliveryTime: "20-30 min",
      minOrder: "₹120"
    },
    {
      id: 25,
      name: "Spicy Tava",
      type: "Restaurant",
      image: "/assets/restaurants/spicy-tava.jpg",
      rating: 4.2,
      deliveryTime: "30-40 min",
      minOrder: "₹150"
    },
    {
      id: 26,
      name: "Chatori Gully",
      type: "Restaurant",
      image: "/assets/restaurants/chatori-gully.jpg",
      rating: 4.4,
      deliveryTime: "25-35 min",
      minOrder: "₹200"
    }
  ],
  'Dosa': [
    {
      id: 27,
      name: "Dosa Delight",
      type: "Restaurant",
      image: "/assets/restaurants/dosa-delight.jpg",
      rating: 4.5,
      deliveryTime: "25-35 min",
      minOrder: "₹150"
    },
    {
      id: 28,
      name: "Madras Café",
      type: "Restaurant",
      image: "/assets/restaurants/madras-cafe.jpg",
      rating: 4.4,
      deliveryTime: "30-40 min",
      minOrder: "₹200"
    },
    {
      id: 29,
      name: "South Street",
      type: "Restaurant",
      image: "/assets/restaurants/south-street.jpg",
      rating: 4.3,
      deliveryTime: "35-45 min",
      minOrder: "₹180"
    },
    {
      id: 30,
      name: "Flavours of India",
      type: "Restaurant",
      image: "/assets/restaurants/flavours-india.jpg",
      rating: 4.5,
      deliveryTime: "30-40 min",
      minOrder: "₹250"
    }
  ]
};

const FoodCategories: React.FC = () => {
  const [selectedCuisine, setSelectedCuisine] = useState<string | null>(null);

  const handleCategoryClick = (cuisine: string) => {
    setSelectedCuisine(cuisine);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Food Categories</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div className="category-container">
          <IonGrid>
            <IonRow>
              {categories.map((category) => (
                <IonCol size="6" size-md="4" size-lg="3" key={category.name}>
                  <IonCard 
                    className="category-card" 
                    onClick={() => handleCategoryClick(category.name)}
                  >
                    <div className="category-image-container">
                      <IonImg
                        src={category.image}
                        alt={category.name}
                        className="category-image"
                      />
                    </div>
                    <IonCardContent className="category-name">
                      {category.name}
                    </IonCardContent>
                  </IonCard>
                </IonCol>
              ))}
            </IonRow>
          </IonGrid>

          {selectedCuisine && restaurantsByCategory[selectedCuisine] && (
            <div className="restaurants-section">
              <h2 className="section-title">{selectedCuisine} Restaurants</h2>
              <div className="restaurant-cards-container">
                {restaurantsByCategory[selectedCuisine].map((restaurant) => (
                  <IonCard className="horizontal-restaurant-card" key={restaurant.id}>
                    <div className="restaurant-card-content">
                      <div className="restaurant-image-container">
                        <img src={restaurant.image} alt={restaurant.name} className="restaurant-image" />
                      </div>
                      <div className="restaurant-details">
                        <h3 className="restaurant-name">{restaurant.name}</h3>
                        <p className="restaurant-type">{restaurant.type}</p>
                        <div className="restaurant-info">
                          <div className="rating">
                            <IonIcon icon={star} color="warning" />
                            <span>{restaurant.rating.toFixed(1)}</span>
                          </div>
                          <div className="delivery-info">
                            <span>{restaurant.deliveryTime}</span>
                            <span className="dot">•</span>
                            <span>Min {restaurant.minOrder}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </IonCard>
                ))}
              </div>
            </div>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default FoodCategories; 