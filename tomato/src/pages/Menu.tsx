// Menu page component for Feastique
import {
  IonContent,
  IonPage,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
  IonButton,
  IonBadge,
} from '@ionic/react';
import {
  restaurant,
  pizzaOutline,
  fastFoodOutline,
  beerOutline,
  wineOutline,
  iceCreamOutline,
  leafOutline,
  nutritionOutline,
  basketOutline,
  sunnyOutline,
  flowerOutline,
  fishOutline,
} from 'ionicons/icons';
import CommonHeader from '../components/CommonHeader';
import './Menu.css';

interface MenuItem {
  name: string;
  price: string;
  description: string;
  tags: string[];
  isPopular?: boolean;
  isNew?: boolean;
  isChefSpecial?: boolean;
}

interface MenuCategory {
  category: string;
  items: MenuItem[];
}

const Menu: React.FC = () => {
  const categories = [
    { name: 'Indian Specialties', icon: restaurant, items: 15 },
    { name: 'Fast Food Favorites', icon: fastFoodOutline, items: 12 },
    { name: 'Tandoor Delights', icon: flowerOutline, items: 8 },
    { name: 'Street Food Corner', icon: nutritionOutline, items: 10 },
    { name: 'Beverages', icon: beerOutline, items: 15 },
    { name: 'Desserts', icon: iceCreamOutline, items: 9 },
  ];

  const menuItems = [
    {
      category: 'Indian Specialties',
      items: [
        {
          name: 'Butter Chicken',
          price: '$16.99',
          description: 'Tender chicken in rich tomato-butter gravy with aromatic spices',
          tags: ['Popular', 'Spicy'],
          isPopular: true
        },
        {
          name: 'Paneer Tikka Masala',
          price: '$14.99',
          description: 'Grilled cottage cheese cubes in creamy spiced tomato sauce',
          tags: ['Vegetarian'],
          isChefSpecial: true
        },
        {
          name: 'Biryani Special',
          price: '$18.99',
          description: 'Fragrant basmati rice with choice of chicken/mutton, served with raita',
          tags: ['Signature Dish'],
          isPopular: true
        }
      ]
    },
    {
      category: 'Fast Food Favorites',
      items: [
        {
          name: 'Classic Burger Combo',
          price: '$12.99',
          description: 'Juicy beef/chicken patty with cheese, fries, and drink',
          tags: ['Bestseller'],
          isPopular: true
        },
        {
          name: 'Supreme Pizza',
          price: '$19.99',
          description: 'Loaded with pepperoni, mushrooms, bell peppers, and extra cheese',
          tags: ['Family Size'],
          isPopular: true
        },
        {
          name: 'Crispy Chicken Wings',
          price: '$14.99',
          description: '8 pieces of wings with choice of sauce: Spicy, BBQ, or Honey Garlic',
          tags: ['Spicy Available'],
          isNew: true
        }
      ]
    },
    {
      category: 'Tandoor Delights',
      items: [
        {
          name: 'Mixed Tandoori Platter',
          price: '$24.99',
          description: 'Assortment of chicken tikka, seekh kebab, fish tikka, and naan',
          tags: ['Sharing'],
          isChefSpecial: true
        },
        {
          name: 'Garlic Naan Basket',
          price: '$8.99',
          description: 'Freshly baked assorted naan breads with butter and garlic',
          tags: ['Vegetarian'],
          isPopular: true
        }
      ]
    },
    {
      category: 'Street Food Corner',
      items: [
        {
          name: 'Pani Puri Platter',
          price: '$9.99',
          description: 'Crispy puris with spiced water, potato filling, and chutneys',
          tags: ['Vegetarian'],
          isPopular: true
        },
        {
          name: 'Samosa Chat',
          price: '$8.99',
          description: 'Crushed samosas topped with yogurt, chutneys, and sev',
          tags: ['Vegetarian'],
          isNew: true
        },
        {
          name: 'Vada Pav',
          price: '$6.99',
          description: 'Mumbai-style spiced potato patty in bun with chutneys',
          tags: ['Vegetarian'],
          isPopular: true
        }
      ]
    }
  ];

  return (
    <IonPage>
      <CommonHeader />
      <IonContent className="menu-background">
        {/* Hero Section */}
        <div className="menu-hero">
          <h1 className="menu-title">Authentic Indian Cuisine & Global Flavors</h1>
          <p className="menu-subtitle">Crafted with premium ingredients • Award-winning chefs • Traditional recipes with modern twists</p>
        </div>

        {/* Categories */}
        <div className="categories-section">
          <IonGrid>
            <IonRow>
              {categories.map((category, index) => (
                <IonCol size="6" sizeMd="4" sizeLg="2" key={index}>
                  <div className="category-card">
                    <IonIcon icon={category.icon} className="category-icon" />
                    <h3>{category.name}</h3>
                    <IonBadge color="warning">{category.items} items</IonBadge>
                  </div>
                </IonCol>
              ))}
            </IonRow>
          </IonGrid>
        </div>

        {/* Menu Items */}
        <div className="menu-items-section">
          {menuItems.map((category, index) => (
            <div key={index} className="menu-category">
              <h2 className="category-title">{category.category}</h2>
              <IonGrid>
                <IonRow>
                  {category.items.map((item, itemIndex) => (
                    <IonCol size="12" sizeMd="6" sizeLg="4" key={itemIndex}>
                      <div className="menu-item-card">
                        <div className="item-content">
                          <div className="item-header">
                            <h3>{item.name}</h3>
                            {item.isNew && <IonBadge color="success">New</IonBadge>}
                            {item.isPopular && <IonBadge color="warning">Popular</IonBadge>}
                            {item.isChefSpecial && <IonBadge color="danger">Chef's Special</IonBadge>}
                          </div>
                          <p>{item.description}</p>
                          <div className="item-tags">
                            {item.tags.map((tag, tagIndex) => (
                              <span key={tagIndex} className="tag">
                                <IonIcon icon={leafOutline} />
                                {tag}
                              </span>
                            ))}
                          </div>
                          <div className="item-price">{item.price}</div>
                        </div>
                        <IonButton expand="block" className="order-button">
                          <IonIcon icon={basketOutline} slot="start" />
                          Order Now
                        </IonButton>
                      </div>
                    </IonCol>
                  ))}
                </IonRow>
              </IonGrid>
            </div>
          ))}
        </div>

        {/* Chef's Corner & Specialties */}
        <div className="chefs-corner-section">
          <h2 className="section-title">Chef's Corner & Specialties</h2>
          <p className="section-subtitle">Discover our master chef's signature creations and seasonal delicacies</p>
          <div className="specialties-grid">
            {[
              { 
                name: "Chef's Tasting Experience", 
                icon: restaurant,
                description: "A curated 7-course journey through our finest dishes, featuring seasonal ingredients and artistic presentations",
                badge: "Premium Experience",
                price: "$89/person"
              },
              { 
                name: "Seasonal Showcase", 
                icon: sunnyOutline,
                description: "Limited-time creations featuring the best ingredients of the season, crafted with innovative techniques",
                badge: "Limited Time",
                price: "Market Price"
              },
              { 
                name: "Wine Pairing Journey", 
                icon: wineOutline,
                description: "Expert-selected wines perfectly matched with your dining experience by our certified sommeliers",
                badge: "Curated Selection",
                price: "$45/person"
              },
              { 
                name: "Private Dining Experience", 
                icon: restaurant,
                description: "Exclusive dining room with personalized menu and dedicated service for your special occasions",
                badge: "Reservation Only",
                price: "Custom Quote"
              }
            ].map((specialty, index) => (
              <div key={index} className="specialty-card">
                <div className="specialty-header">
                  <div className="specialty-icon-wrapper">
                    <IonIcon icon={specialty.icon} className="specialty-icon" />
                  </div>
                  <IonBadge color="warning" className="specialty-badge">{specialty.badge}</IonBadge>
                </div>
                <div className="specialty-content">
                  <h3>{specialty.name}</h3>
                  <p>{specialty.description}</p>
                  <div className="specialty-price">{specialty.price}</div>
                </div>
                <IonButton expand="block" className="reserve-button" fill="solid">
                  Reserve Experience
                </IonButton>
              </div>
            ))}
          </div>
          <div className="specialties-cta">
            <div className="cta-content">
              <h3>Looking for a Unique Dining Experience?</h3>
              <p>Our master chefs can create a custom menu tailored to your preferences and occasion</p>
            </div>
            <IonButton fill="outline" className="custom-menu-btn" size="large">
              Inquire About Custom Experiences
            </IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Menu; 