import React, { useState, useRef } from 'react';
import { IonContent, IonPage, IonIcon } from '@ionic/react';
import { chevronForwardOutline, chevronBackOutline } from 'ionicons/icons';
import CommonHeader from '../components/CommonHeader';
import './Order.css';

// Food inspiration data
const foodInspirations = [
  { id: 1, name: 'Noodles', image: '/src/assets/noodles.jpg' },
  { id: 2, name: 'Paneer', image: '/src/assets/paneer.jpg' },
  { id: 3, name: 'Pizza', image: '/src/assets/pizza.jpg' },
  { id: 4, name: 'Sandwich', image: '/src/assets/sandwich.jpg' },
  { id: 5, name: 'Shawarma', image: '/src/assets/shawarma.jpg' },
];

// Top brands data
const topBrands = [
  { id: 1, name: 'KFC', image: '/src/assets/kfc.png', time: '45 min' },
  { id: 2, name: 'Pizza Hut', image: '/src/assets/pizzahut.png', time: '35 min' },
  { id: 3, name: 'Scoops', image: '/src/assets/scoops.png', time: '30 min' },
  { id: 4, name: 'KFC', image: '/src/assets/kfc.png', time: '40 min' },
  { id: 5, name: 'Pizza Hut', image: '/src/assets/pizzahut.png', time: '25 min' },
];

// Filter tags
const filterTags = [
  'All',
  'Delivery Time',
  'Pure Veg',
  'Rating 4.0+',
  'Premium',
  'Cuisines'
];

const Order: React.FC = () => {
  const [activeTab, setActiveTab] = useState('delivery');
  const [selectedFilters, setSelectedFilters] = useState<string[]>(['All']);
  const inspirationRef = useRef<HTMLDivElement>(null);
  const brandsRef = useRef<HTMLDivElement>(null);

  const scroll = (ref: React.RefObject<HTMLDivElement>, direction: 'left' | 'right') => {
    if (ref.current) {
      const scrollAmount = 300; // Adjust scroll amount as needed
      const newScrollLeft = ref.current.scrollLeft + (direction === 'right' ? scrollAmount : -scrollAmount);
      ref.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  const handleFilterClick = (filter: string) => {
    if (filter === 'All') {
      setSelectedFilters(['All']);
    } else {
      const newFilters = selectedFilters.includes('All') 
        ? [filter]
        : selectedFilters.includes(filter)
          ? selectedFilters.filter(f => f !== filter)
          : [...selectedFilters, filter];
      setSelectedFilters(newFilters.length ? newFilters : ['All']);
    }
  };

  return (
    <IonPage>
      <CommonHeader />
      <IonContent>
        <div className="order-page">
          {/* Navigation Tabs */}
          <div className="nav-tabs">
            <button 
              className={`nav-tab ${activeTab === 'delivery' ? 'active' : ''}`}
              onClick={() => setActiveTab('delivery')}
            >
              <img src="/src/assets/delivery-icon.png" alt="Delivery" />
              Delivery
            </button>
            <button 
              className={`nav-tab ${activeTab === 'dining' ? 'active' : ''}`}
              onClick={() => setActiveTab('dining')}
            >
              <img src="/src/assets/dining-icon.png" alt="Dining" />
              Dining
            </button>
            <button 
              className={`nav-tab ${activeTab === 'nightlife' ? 'active' : ''}`}
              onClick={() => setActiveTab('nightlife')}
            >
              <img src="/src/assets/nightlife-icon.png" alt="Nightlife" />
              Nightlife
            </button>
          </div>

          {/* Filter Tags */}
          <div className="filter-tags">
            {filterTags.map(filter => (
              <button
                key={filter}
                className={`filter-tag ${selectedFilters.includes(filter) ? 'active' : ''}`}
                onClick={() => handleFilterClick(filter)}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Food Inspiration Section */}
          <section className="food-inspiration">
            <h2>Inspiration for your first order</h2>
            <div className="scroll-container">
              <button 
                className="scroll-button prev"
                onClick={() => scroll(inspirationRef, 'left')}
                aria-label="Scroll inspiration items left"
              >
                <IonIcon icon={chevronBackOutline} />
              </button>
              <div className="inspiration-cards" ref={inspirationRef}>
                {foodInspirations.map(item => (
                  <div key={item.id} className="inspiration-card">
                    <div className="card-image">
                      <img src={item.image} alt={item.name} />
                    </div>
                    <h3>{item.name}</h3>
                  </div>
                ))}
              </div>
              <button 
                className="scroll-button next"
                onClick={() => scroll(inspirationRef, 'right')}
                aria-label="Scroll inspiration items right"
              >
                <IonIcon icon={chevronForwardOutline} />
              </button>
            </div>
          </section>

          {/* Top Brands Section */}
          <section className="top-brands">
            <h2>Top brands for you</h2>
            <div className="scroll-container">
              <button 
                className="scroll-button prev"
                onClick={() => scroll(brandsRef, 'left')}
                aria-label="Scroll brands left"
              >
                <IonIcon icon={chevronBackOutline} />
              </button>
              <div className="brand-cards" ref={brandsRef}>
                {topBrands.map(brand => (
                  <div key={brand.id} className="brand-card">
                    <div className="brand-image">
                      <img src={brand.image} alt={brand.name} />
                    </div>
                    <h3>{brand.name}</h3>
                    <p>{brand.time}</p>
                  </div>
                ))}
              </div>
              <button 
                className="scroll-button next"
                onClick={() => scroll(brandsRef, 'right')}
                aria-label="Scroll brands right"
              >
                <IonIcon icon={chevronForwardOutline} />
              </button>
            </div>
          </section>

          {/* Restaurant Cards Section */}
          <section className="delivery-restaurants">
            <h2>Delivery Restaurants in Gachibowli</h2>
            <div className="restaurant-grid">
              {/* We'll implement the restaurant cards in the next step */}
            </div>
          </section>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Order; 