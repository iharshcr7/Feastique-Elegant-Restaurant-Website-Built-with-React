import React, { useRef, useState, useMemo } from 'react';
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonIcon,
  IonCard,
  IonCardContent,
  IonText,
} from '@ionic/react';
import { chevronBackOutline, chevronForwardOutline, star, searchOutline } from 'ionicons/icons';
import './FoodCategories.css';

interface Restaurant {
  id: number;
  name: string;
  type: string;
  image: string;
  rating: number;
  deliveryTime: string;
  minOrder: string;
}

const categories = [
  {
    id: 1,
    name: 'Pizza',
    image: '/assets/categories/pizza.png',
    cuisine: 'Pizza'
  },
  {
    id: 2,
    name: 'North Indian',
    image: '/assets/categories/north-indian.png',
    cuisine: 'North Indian'
  },
  {
    id: 3,
    name: 'Biryani',
    image: '/assets/categories/biryani.png',
    cuisine: 'Biryani'
  },
  {
    id: 4,
    name: 'Burger',
    image: '/assets/categories/burger.png',
    cuisine: 'Burger'
  },
  {
    id: 5,
    name: 'Chinese',
    image: '/assets/categories/chinese.png',
    cuisine: 'Chinese'
  },
  {
    id: 6,
    name: 'Ice Cream',
    image: '/assets/categories/ice-cream.png',
    cuisine: 'Ice Cream'
  },
  {
    id: 7,
    name: 'Dosa',
    image: '/assets/categories/dosa.png',
    cuisine: 'Dosa'
  },
  {
    id: 8,
    name: 'Pav Bhaji',
    image: '/assets/categories/pav-bhaji.png',
    cuisine: 'Pav Bhaji'
  },
  {
    id: 9,
    name: 'South Indian',
    image: '/assets/categories/dosa.png',
    cuisine: 'South Indian'
  },
  {
    id: 10,
    name: 'Chole Bhature',
    image: '/assets/cholebhature.png',
    cuisine: 'Chole Bhature'
  },
  {
    id: 11,
    name: 'Momo',
    image: 'src/assets/momo.png',
    cuisine: 'Momo'
  },
  {
    id: 12,
    name: 'Shawarma',
    image: '/assets/shawarma.png',
    cuisine: 'Shawarma'
  },
  {
    id: 13,
    name: 'Pasta',
    image: '/assets/pasta.png',
    cuisine: 'Pasta'
  },
  {
    id: 14,
    name: 'Pure Veg',
    image: '/assets/pure veg.png',
    cuisine: 'Pure Veg'
  }
];

const restaurantsByCategory: { [key: string]: Restaurant[] } = {
  'Pizza': [
    {
      id: 1,
      name: "Domino's Pizza",
      type: "Restaurant",
      image: "/assets/Dominos.png",
      rating: 4.2,
      deliveryTime: "30-40 min",
      minOrder: "₹200"
    },
    {
      id: 2,
      name: "La Pino'z Pizza",
      type: "Restaurant",
      image: "/assets/Lapinoz.png",
      rating: 4.0,
      deliveryTime: "25-35 min",
      minOrder: "₹150"
    },
    {
      id: 3,
      name: "Pizza Hut",
      type: "Restaurant",
      image: "/assets/Pizzahut.png",
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
      image: "/assets/categories/north-indian.png",
      rating: 4.3,
      deliveryTime: "35-45 min",
      minOrder: "₹300"
    },
    {
      id: 5,
      name: "Royal Thali",
      type: "Restaurant",
      image: "/assets/paratha.png",
      rating: 4.4,
      deliveryTime: "30-40 min",
      minOrder: "₹250"
    },
    {
      id: 6,
      name: "Punjabi Rasoi",
      type: "Restaurant",
      image: "/assets/punjabi rasoi.png",
      rating: 4.2,
      deliveryTime: "40-50 min",
      minOrder: "₹200"
    },
    {
      id: 7,
      name: "Flavours of India",
      type: "Restaurant",
      image: "/assets/flavors of india.png",
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
      image: "/assets/biryani.png",
      rating: 4.3,
      deliveryTime: "30-40 min",
      minOrder: "₹200"
    },
    {
      id: 9,
      name: "Biryani Bae",
      type: "Restaurant",
      image: "/assets/biryani-bae.png",
      rating: 4.4,
      deliveryTime: "35-45 min",
      minOrder: "₹250"
    },
    {
      id: 10,
      name: "The Biryani House",
      type: "Restaurant",
      image: "/assets/biryani-house.png",
      rating: 4.2,
      deliveryTime: "40-50 min",
      minOrder: "₹300"
    },
    {
      id: 11,
      name: "Roll & Bowl",
      type: "Restaurant",
      image: "/assets/Rollandbowl.jpeg",
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
      image: "/assets/burger-blast.png",
      rating: 4.3,
      deliveryTime: "25-35 min",
      minOrder: "₹150"
    },
    {
      id: 13,
      name: "Burger Hub",
      type: "Restaurant",
      image: "/assets/explosive-burger-boom-logo-template-343163182.png",
      rating: 4.2,
      deliveryTime: "30-40 min",
      minOrder: "₹200"
    },
    {
      id: 14,
      name: "Big Bun",
      type: "Restaurant",
      image: "/assets/mcburger.png",
      rating: 4.1,
      deliveryTime: "20-30 min",
      minOrder: "₹150"
    },
    {
      id: 15,
      name: "Chatori Gully",
      type: "Restaurant",
      image: "/assets/chatori gully.png",
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
      image: "/assets/dragon bowl.png",
      rating: 4.4,
      deliveryTime: "30-40 min",
      minOrder: "₹250"
    },
    {
      id: 17,
      name: "Wok N Roll",
      type: "Restaurant",
      image: "/assets/work and roll.png",
      rating: 4.3,
      deliveryTime: "35-45 min",
      minOrder: "₹200"
    },
    {
      id: 18,
      name: "Noodle Nation",
      type: "Restaurant",
      image: "/assets/noodle_nation_logo_400x400.png",
      rating: 4.2,
      deliveryTime: "25-35 min",
      minOrder: "₹200"
    },
    {
      id: 19,
      name: "Roll & Bowl",
      type: "Restaurant",
      image: "/assets/Noodles.png",
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
      image: "/assets/Scoop_logo_web2.png",
      rating: 4.5,
      deliveryTime: "15-25 min",
      minOrder: "₹100"
    },
    {
      id: 21,
      name: "Scoopology",
      type: "Restaurant",
      image: "/assets/Scoopology-Logo-3-GL.png",
      rating: 4.4,
      deliveryTime: "20-30 min",
      minOrder: "₹150"
    },
    {
      id: 22,
      name: "Cold Bliss",
      type: "Restaurant",
      image: "/assets/cold-bliss.png",
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
      image: "/assets/bombay-pavbhaji.png",
      rating: 4.4,
      deliveryTime: "25-35 min",
      minOrder: "₹150"
    },
    {
      id: 24,
      name: "Pav Bhaji Point",
      type: "Restaurant",
      image: "/assets/pavbhaji-point.png",
      rating: 4.3,
      deliveryTime: "20-30 min",
      minOrder: "₹120"
    },
    {
      id: 25,
      name: "Spicy Tava",
      type: "Restaurant",
      image: "/assets/spicytava.png",
      rating: 4.2,
      deliveryTime: "30-40 min",
      minOrder: "₹150"
    },
    {
      id: 26,
      name: "Chatori Gully",
      type: "Restaurant",
      image: "/assets/chatori gully.png",
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
      image: "/assets/dosa delight.png",
      rating: 4.5,
      deliveryTime: "25-35 min",
      minOrder: "₹150"
    },
    {
      id: 28,
      name: "Madras Café",
      type: "Restaurant",
      image: "/assets/madras cafe.png",
      rating: 4.4,
      deliveryTime: "30-40 min",
      minOrder: "₹200"
    },
    {
      id: 29,
      name: "South Street",
      type: "Restaurant",
      image: "/assets/ss.png",
      rating: 4.3,
      deliveryTime: "35-45 min",
      minOrder: "₹180"
    },
    {
      id: 30,
      name: "Udupi Palace",
      type: "Restaurant",
      image: "/assets/udupi.png",
      rating: 4.5,
      deliveryTime: "30-40 min",
      minOrder: "₹250"
    }
  ],
  'South Indian': [
    {
      id: 31,
      name: "Dakshin Delights",
      type: "Restaurant",
      image: "/assets/dakshin delight.png",
      rating: 4.5,
      deliveryTime: "30-40 min",
      minOrder: "₹200"
    },
    {
      id: 32,
      name: "Chennai Express",
      type: "Restaurant",
      image: "/assets/chennai-express.png",
      rating: 4.3,
      deliveryTime: "35-45 min",
      minOrder: "₹180"
    },
    {
      id: 33,
      name: "Udupi Palace",
      type: "Restaurant",
      image: "/assets/categories/dosa.png",
      rating: 4.4,
      deliveryTime: "25-35 min",
      minOrder: "₹150"
    },
    {
      id: 34,
      name: "Madras Kitchen",
      type: "Restaurant",
      image: "/assets/categories/north-indian.png",
      rating: 4.2,
      deliveryTime: "30-40 min",
      minOrder: "₹200"
    }
  ],
  'Chole Bhature': [
    {
      id: 35,
      name: "Punjab Tadka",
      type: "Restaurant",
      image: "/assets/cholebhature.png",
      rating: 4.4,
      deliveryTime: "25-35 min",
      minOrder: "₹150"
    },
    {
      id: 36,
      name: "Delhi Darbar",
      type: "Restaurant",
      image: "/assets/paratha.png",
      rating: 4.3,
      deliveryTime: "30-40 min",
      minOrder: "₹180"
    },
    {
      id: 37,
      name: "Amritsari Junction",
      type: "Restaurant",
      image: "/assets/amrtitsari-junction (1).png",
      rating: 4.5,
      deliveryTime: "20-30 min",
      minOrder: "₹120"
    },
    {
      id: 38,
      name: "Street Food Express",
      type: "Restaurant",
      image: "/assets/street-food-express.png",
      rating: 4.2,
      deliveryTime: "25-35 min",
      minOrder: "₹150"
    }
  ],
  'Momo': [
    {
      id: 39,
      name: "Momo House",
      type: "Restaurant",
      image: "/assets/momo-house (1).png",
      rating: 4.4,
      deliveryTime: "20-30 min",
      minOrder: "₹100"
    },
    {
      id: 40,
      name: "Tibet Kitchen",
      type: "Restaurant",
      image: "/assets/momo.png",
      rating: 4.3,
      deliveryTime: "25-35 min",
      minOrder: "₹150"
    },
    {
      id: 41,
      name: "Himalayan Bites",
      type: "Restaurant",
      image: "/assets/asian-bites.png",
      rating: 4.5,
      deliveryTime: "30-40 min",
      minOrder: "₹120"
    },
    {
      id: 42,
      name: "Asian Delights",
      type: "Restaurant",
      image: "/assets/Noodles.png",
      rating: 4.2,
      deliveryTime: "25-35 min",
      minOrder: "₹180"
    }
  ],
  'Shawarma': [
    {
      id: 43,
      name: "Arabian Knights",
      type: "Restaurant",
      image: "/assets/arabian-logo (1).png",
      rating: 4.5,
      deliveryTime: "25-35 min",
      minOrder: "₹180"
    },
    {
      id: 44,
      name: "Lebanese Corner",
      type: "Restaurant",
      image: "/assets/lebaneese-corner.png",
      rating: 4.3,
      deliveryTime: "30-40 min",
      minOrder: "₹200"
    },
    {
      id: 45,
      name: "Shawarma King",
      type: "Restaurant",
      image: "/assets/shawarma king (1).png",
      rating: 4.4,
      deliveryTime: "20-30 min",
      minOrder: "₹150"
    },
    {
      id: 46,
      name: "Mediterranean Bites",
      type: "Restaurant",
      image: "/assets/mediterranean-bites-logo.png",
      rating: 4.2,
      deliveryTime: "25-35 min",
      minOrder: "₹180"
    }
  ],
  'Pure Veg': [
    {
      id: 47,
      name: "Green Paradise",
      type: "Restaurant",
      image: "/assets/green-paradise.png",
      rating: 4.5,
      deliveryTime: "30-40 min",
      minOrder: "₹200"
    },
    {
      id: 48,
      name: "Satvik Kitchen",
      type: "Restaurant",
      image: "/assets/satvik-kitchen (1).png",
      rating: 4.4,
      deliveryTime: "25-35 min",
      minOrder: "₹180"
    },
    {
      id: 49,
      name: "Veggie Delight",
      type: "Restaurant",
      image: "/assets/veggie-delight.png",
      rating: 4.3,
      deliveryTime: "35-45 min",
      minOrder: "₹150"
    },
    {
      id: 50,
      name: "Nature's Bowl",
      type: "Restaurant",
      image: "/assets/nature-bowl.png",
      rating: 4.2,
      deliveryTime: "30-40 min",
      minOrder: "₹200"
    }
  ],
  'Pasta': [
    {
      id: 51,
      name: "La Pasta House",
      type: "Restaurant",
      image: "/assets/la-pasta-house.png",
      rating: 4.5,
      deliveryTime: "25-35 min",
      minOrder: "₹250"
    },
    {
      id: 52,
      name: "Italiano's",
      type: "Restaurant",
      image: "/assets/italianos (1).png",
      rating: 4.4,
      deliveryTime: "30-40 min",
      minOrder: "₹200"
    },
    {
      id: 53,
      name: "Pasta Paradise",
      type: "Restaurant",
      image: "/assets/pasta-paradise.png",
      rating: 4.3,
      deliveryTime: "35-45 min",
      minOrder: "₹180"
    },
    {
      id: 54,
      name: "Little Italy",
      type: "Restaurant",
      image: "/assets/little-italy (1).png",
      rating: 4.4,
      deliveryTime: "25-35 min",
      minOrder: "₹300"
    }
  ]
};

const FoodCategories: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [selectedCuisine, setSelectedCuisine] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleCategoryClick = (cuisine: string) => {
    setSelectedCuisine(cuisine);
  };

  const filteredRestaurants = useMemo(() => {
    if (!selectedCuisine || !restaurantsByCategory[selectedCuisine]) return [];
    
    return restaurantsByCategory[selectedCuisine].filter(restaurant => 
      restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      restaurant.type.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [selectedCuisine, searchQuery]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      const newScrollPosition = scrollContainerRef.current.scrollLeft + 
        (direction === 'left' ? -scrollAmount : scrollAmount);
      scrollContainerRef.current.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Food Categories</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {/* Search Bar with background image */}
        <div className="search-bar-bg">
          <div className="search-bar-container">
            <input
              type="text"
              className="search-bar-input"
              placeholder="Search for restaurants and food"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span className="search-bar-icon">
              <IonIcon icon={searchOutline} />
            </span>
          </div>
        </div>
        {/* Categories slider */}
        <div className="categories-section">
          <button 
            className="scroll-button prev"
            onClick={() => scroll('left')}
            aria-label="Scroll categories left"
          >
            <IonIcon icon={chevronBackOutline} />
          </button>

          <div className="categories-scroll" ref={scrollContainerRef}>
            {categories.map((category) => (
              <div 
                key={category.id}
                className="category-item"
                onClick={() => handleCategoryClick(category.cuisine)}
              >
                <div className="category-image-container">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="category-image"
                  />
                </div>
                <h3 className="category-name">{category.name}</h3>
              </div>
            ))}
          </div>

          <button 
            className="scroll-button next"
            onClick={() => scroll('right')}
            aria-label="Scroll categories right"
          >
            <IonIcon icon={chevronForwardOutline} />
          </button>
        </div>

        {selectedCuisine && restaurantsByCategory[selectedCuisine] && (
          <div className="restaurants-section">
            <h2 className="section-title">{selectedCuisine} Restaurants</h2>
            <div className="restaurant-cards-container">
              {filteredRestaurants.map((restaurant) => (
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
      </IonContent>
    </IonPage>
  );
};

export default FoodCategories; 