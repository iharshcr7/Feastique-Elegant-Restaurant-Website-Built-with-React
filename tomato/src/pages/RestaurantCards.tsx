"use client"

import React from 'react';
import { useState, useEffect } from "react"
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonRippleEffect,
  IonIcon,
  IonSkeletonText,
  IonButton
} from "@ionic/react"
import { star, locationOutline, timeOutline, heartOutline, heart, pricetag } from "ionicons/icons"
import "./RestaurantCards.css"
// In your root or global styles (e.g., index.tsx or _app.tsx)
import "@ionic/react/css/core.css"
import "@ionic/react/css/normalize.css"
import "@ionic/react/css/structure.css"
import "@ionic/react/css/typography.css"
// Optional utility styles
import "@ionic/react/css/padding.css"
import "@ionic/react/css/text-alignment.css"
import "@ionic/react/css/flex-utils.css"
import { useHistory } from 'react-router-dom';

interface Restaurant {
  id: number
  name: string
  subtitle: string
  location: string
  image: string
  rating?: number
  deliveryTime?: string
  price?: string
  discount?: string
  tags?: string[]
  description: string
}

const restaurants: Restaurant[] = [
  {
    id: 1,
    name: "Pizza Hut",
    subtitle: "Pizzas",
    location: "Gotri",
    image: "/assets/pizzahuut.png",
    rating: 4.2,
    deliveryTime: "30-40 min",
    price: "₹200 for two",
    discount: "50% off up to ₹100",
    tags: ["Pizza", "Fast Food", "Italian"],
    description: "Pizza Hut is a popular pizza restaurant known for its delicious pizzas and wide variety of toppings."
  },
  {
    id: 2,
    name: "McDonald's",
    subtitle: "Burgers, Beverages, Cafe, Desserts",
    location: "Diwalipura",
    image: "/assets/mcburger.png",
    rating: 4.1,
    deliveryTime: "25-35 min",
    price: "₹150 for two",
    discount: "Buy 1 Get 1 Free",
    tags: ["Burgers", "Fast Food", "Beverages"],
    description: "McDonald's is a fast food restaurant known for its burgers, fries, and beverages."
  },
  {
    id: 3,
    name: "KFC",
    subtitle: "Burgers, Fastfood, Rolls & Wraps",
    location: "Subhanpura",
    image: "/assets/kfc.png",
    rating: 4.0,
    deliveryTime: "35-45 min",
    price: "₹250 for two",
    discount: "20% off on orders above ₹500",
    tags: ["Chicken", "Fast Food", "Burgers"],
    description: "KFC is a fast food restaurant known for its fried chicken and burgers."
  },
  {
    id: 4,
    name: "Taco Bell",
    subtitle: "Mexican, Fastfood, Snacks",
    location: "Vadiwadi",
    image: "/assets/taco.png",
    rating: 3.9,
    deliveryTime: "40-50 min",
    price: "₹300 for two",
    discount: "Free delivery",
    tags: ["Mexican", "Fast Food", "Tacos"],
    description: "Taco Bell is a fast food restaurant known for its Mexican food and tacos."
  },
]

const RestaurantCards: React.FC = () => {
  const [favorites, setFavorites] = useState<number[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [visibleCards, setVisibleCards] = useState<Restaurant[]>([])
  const history = useHistory();

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    // Staggered appearance of cards
    const timer = setTimeout(() => {
      setVisibleCards(restaurants)
    }, 300)

    return () => clearTimeout(timer)
  }, [])

  const toggleFavorite = (id: number, e: React.MouseEvent) => {
    e.stopPropagation() // Prevent card click
    setFavorites((prev) => (prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]))
  }

  const handleRestaurantClick = (restaurantId: number) => {
    history.push(`/restaurant/${restaurantId}`);
  }

  // Render skeleton loaders while loading
  if (isLoading) {
    return (
      <div className="restaurant-card-container">
        {[1, 2, 3, 4].map((item) => (
          <div className="restaurant-card skeleton" key={item}>
            <div className="card-image-container skeleton-image">
              <IonSkeletonText animated style={{ width: "100%", height: "100%" }}></IonSkeletonText>
            </div>
            <div className="card-content skeleton-content">
              <IonSkeletonText animated style={{ width: "70%", height: "24px" }}></IonSkeletonText>
              <IonSkeletonText animated style={{ width: "90%", height: "16px" }}></IonSkeletonText>
              <IonSkeletonText animated style={{ width: "40%", height: "16px" }}></IonSkeletonText>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="restaurant-card-container">
      {restaurants.map((restaurant, index) => (
        <IonCard
          className={`restaurant-card ${visibleCards.includes(restaurant) ? "visible" : ""}`}
          key={restaurant.id}
          onClick={() => handleRestaurantClick(restaurant.id)}
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="card-image-container">
            <img alt={restaurant.name} src={restaurant.image || "/placeholder.svg"} className="restaurant-image" />
            <div className="delivery-time">
              <IonIcon icon={timeOutline} className="time-icon" />
              {restaurant.deliveryTime}
            </div>
            <button
              className={`favorite-button ${favorites.includes(restaurant.id) ? "active" : ""}`}
              onClick={(e) => toggleFavorite(restaurant.id, e)}
              aria-label={favorites.includes(restaurant.id) ? "Remove from favorites" : "Add to favorites"}
            >
              <IonIcon icon={favorites.includes(restaurant.id) ? heart : heartOutline} />
            </button>
            {restaurant.discount && (
              <div className="discount-badge">
                <IonIcon icon={pricetag} className="discount-icon" />
                {restaurant.discount}
              </div>
            )}
          </div>

          <IonCardHeader>
            <div className="card-header-content">
              <IonCardTitle className="restaurant-name">{restaurant.name}</IonCardTitle>
              <div className="rating">
                <span className="rating-value">{restaurant.rating}</span>
                <IonIcon icon={star} className="rating-star" />
              </div>
            </div>
            <IonCardSubtitle className="restaurant-cuisine">{restaurant.subtitle}</IonCardSubtitle>
          </IonCardHeader>

          <IonCardContent>
            <div className="tags">
              {restaurant.tags?.map((tag, i) => (
                <span key={i} className="tag">
                  {tag}
                </span>
              ))}
            </div>

            {restaurant.price && <div className="price">{restaurant.price}</div>}

            <div className="restaurant-location">
              <IonIcon icon={locationOutline} />
              <span>{restaurant.location}</span>
            </div>

            <div className="card-actions">
              <button className="action-button order-now">Order Now</button>
              <IonButton 
                expand="block" 
                color="primary"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRestaurantClick(restaurant.id);
                }}
              >
                View Menu
              </IonButton>
            </div>
          </IonCardContent>

          <IonRippleEffect />
        </IonCard>
      ))}
    </div>
  )
}

export default RestaurantCards

