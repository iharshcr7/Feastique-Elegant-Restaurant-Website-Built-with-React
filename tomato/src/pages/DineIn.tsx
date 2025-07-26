"use client"

import type React from "react"
import { useState, useEffect } from "react"
import {
  IonContent,
  IonPage,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonDatetime,
  IonToast,
  IonIcon,
  IonModal,
  IonSkeletonText,
  IonSpinner,
  IonChip,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonSearchbar,
  IonRefresher,
  IonRefresherContent,
  IonAlert,
  IonBadge,
  type RefresherEventDetail,
} from "@ionic/react"
import {
  restaurantOutline,
  timeOutline,
  peopleOutline,
  calendarOutline,
  closeCircleOutline,
  arrowForwardOutline,
  starOutline,
  star,
  heartOutline,
  heart,
  wineOutline,
  informationCircleOutline,
  locationOutline,
  checkmarkCircle,
  chevronDown,
  chevronUp,
} from "ionicons/icons"
import axios from "axios"
import "./dine-in.css"
import Header from "./Header"

const DineIn: React.FC = () => {
  // State for reservation form
  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [phone, setPhone] = useState<string>("")
  const [date, setDate] = useState<string>(new Date().toISOString())
  const [time, setTime] = useState<string>("19:00")
  const [guests, setGuests] = useState<number>(2)
  const [specialRequests, setSpecialRequests] = useState<string>("")

  // State for UI interactions
  const [showToast, setShowToast] = useState<boolean>(false)
  const [toastMessage, setToastMessage] = useState<string>("")
  const [showMenuModal, setShowMenuModal] = useState<boolean>(false)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [loading, setLoading] = useState<boolean>(true)
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false)
  const [bookingReference, setBookingReference] = useState<string>("")
  const [expandedMenuId, setExpandedMenuId] = useState<number | null>(null)
  const [favoriteMenus, setFavoriteMenus] = useState<number[]>([])
  const [serverStatus, setServerStatus] = useState<string>("checking")

  // State for menu items
  const [menuItems, setMenuItems] = useState<any[]>([])
  const [premiumMenus, setPremiumMenus] = useState<any[]>([
    {
      id: 1,
      name: "Royal Feast",
      description: "A luxurious dining experience featuring our chef's signature dishes",
      price: 2499,
      image: "assets/romantic.jpg",
      rating: 4.8,
      items: ["Truffle Risotto", "Herb-crusted Lamb Chops", "Saffron Panna Cotta"],
      tags: ["Signature", "Luxury"],
    },
    {
      id: 2,
      name: "Gourmet Voyage",
      description: "An exquisite journey through international cuisines",
      price: 2999,
      image: "assets/japanese.jpg",
      rating: 4.9,
      items: ["Mediterranean Mezze", "Wagyu Beef Steak", "Tiramisu"],
      tags: ["International", "Premium"],
    },
    {
      id: 3,
      name: "Chef's Special",
      description: "A carefully curated menu by our executive chef",
      price: 3499,
      image: "assets/biryani.jpg",
      rating: 4.7,
      items: ["Smoked Salmon Canapés", "Duck Confit", "Chocolate Fondant"],
      tags: ["Chef's Choice", "Exclusive"],
    },
  ])

  // Add new state for order tracking
  const [orderItems, setOrderItems] = useState<any[]>([]);
  const [orderTotal, setOrderTotal] = useState<number>(0);
  const [showOrderCard, setShowOrderCard] = useState<boolean>(false);

  // Add new state for package booking
  const [selectedPackage, setSelectedPackage] = useState<any>(null);
  const [showPackageConfirmation, setShowPackageConfirmation] = useState<boolean>(false);

  // Fetch menu items with loading simulation
  useEffect(() => {
    const fetchMenuItems = async () => {
      setLoading(true)
      try {
        // Check if server is available
        try {
          await axios.get("http://localhost:5000/api/health", { timeout: 2000 })
          setServerStatus("online")
        } catch (error) {
          console.log("Server appears to be offline, using default data")
          setServerStatus("offline")
          setMenuItems([
            {
              id: 1,
              name: "Butter Chicken",
              description: "Tender chicken in a rich tomato and butter sauce",
              price: 450,
              category: "main",
              image_url: "assets/dining.jpg",
            },
            {
              id: 2,
              name: "Paneer Tikka",
              description: "Grilled cottage cheese with spices",
              price: 350,
              category: "starter",
              image_url: "assets/paneer-tikka.jpg",
            },
            {
              id: 3,
              name: "Gulab Jamun",
              description: "Sweet milk solids balls soaked in sugar syrup",
              price: 150,
              category: "dessert",
              image_url: "assets/gulabjamun.jpg",
            },
            {
              id: 4,
              name: "Masala Dosa",
              description: "Crispy rice crepe filled with spiced potatoes",
              price: 250,
              category: "breakfast",
              image_url: "assets/dosa.jpg",
            },
            {
              id: 5,
              name: "Biryani",
              description: "Fragrant rice dish with spices and meat or vegetables",
              price: 550,
              category: "main",
              image_url: "assets/biryani.jpg",
            },
            {
              id: 6,
              name: "Mango Lassi",
              description: "Sweet yogurt drink with mango pulp",
              price: 120,
              category: "beverage",
              image_url: "assets/mango-lassi.jpg",
            },
          ]);
          setLoading(false);
          return;
        }

        // Simulate network delay for loading state demonstration
        await new Promise((resolve) => setTimeout(resolve, 1000))

        const response = await axios.get("http://localhost:5000/api/menu-items")
        setMenuItems(response.data)
      } catch (error) {
        console.error("Error fetching menu items:", error)
        // Fallback data
        setMenuItems([
          {
            id: 1,
            name: "Butter Chicken",
            description: "Tender chicken in a rich tomato and butter sauce",
            price: 450,
            category: "main",
            image_url: "assets/dining.jpg",
          },
          {
            id: 2,
            name: "Paneer Tikka",
            description: "Grilled cottage cheese with spices",
            price: 350,
            category: "starter",
            image_url: "assets/paneer-tikka.jpg",
          },
          {
            id: 3,
            name: "Gulab Jamun",
            description: "Sweet milk solids balls soaked in sugar syrup",
            price: 150,
            category: "dessert",
            image_url: "assets/gulabjamun.jpg",
          },
          {
            id: 4,
            name: "Masala Dosa",
            description: "Crispy rice crepe filled with spiced potatoes",
            price: 250,
            category: "breakfast",
            image_url: "assets/placeholder.jpg",
          },
          {
            id: 5,
            name: "Biryani",
            description: "Fragrant rice dish with spices and meat or vegetables",
            price: 550,
            category: "main",
            image_url: "assets/biryani.jpg",
          },
          {
            id: 6,
            name: "Mango Lassi",
            description: "Sweet yogurt drink with mango pulp",
            price: 120,
            category: "beverage",
            image_url: "assets/mango-lassi.jpg",
          },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchMenuItems()
  }, [])

  // Handle reservation submission with animation
  const handleReservation = async () => {
    if (!name || !email || !phone) {
      setToastMessage("Please fill in all required fields")
      setShowToast(true)
      return
    }

    try {
      setLoading(true)

      // Format the date and time
      const reservationDate = new Date(date)
      const [hours, minutes] = time.split(":")
      reservationDate.setHours(Number.parseInt(hours, 10), Number.parseInt(minutes, 10))

      const reservationData = {
        name,
        email,
        phone,
        reservation_date: reservationDate.toISOString(),
        guests,
        special_requests: specialRequests,
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Generate a random booking reference
      const reference = `BK${Math.floor(100000 + Math.random() * 900000)}`
      setBookingReference(reference)

      // Show confirmation instead of toast
      setShowConfirmation(true)

      // Reset form
      setName("")
      setEmail("")
      setPhone("")
      setDate(new Date().toISOString())
      setTime("19:00")
      setGuests(2)
      setSpecialRequests("")
    } catch (error) {
      console.error("Error submitting reservation:", error)
      setToastMessage("Failed to submit reservation. Please try again.")
      setShowToast(true)
    } finally {
      setLoading(false)
    }
  }

  // Toggle menu expansion
  const toggleMenuExpansion = (id: number) => {
    setExpandedMenuId(expandedMenuId === id ? null : id)
  }

  // Toggle favorite status
  const toggleFavorite = (id: number) => {
    setFavoriteMenus((prev) => (prev.includes(id) ? prev.filter((menuId) => menuId !== id) : [...prev, id]))

    // Show feedback
    setToastMessage(favoriteMenus.includes(id) ? "Removed from favorites" : "Added to favorites")
    setShowToast(true)
  }

  // Handle pull to refresh
  const handleRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
    try {
      // Simulate refresh
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Shuffle premium menus to simulate refresh
      setPremiumMenus((prev) => [...prev].sort(() => Math.random() - 0.5))

      setToastMessage("Content refreshed")
      setShowToast(true)
    } finally {
      event.detail.complete()
    }
  }

  // Filter menu items by category
  const filteredMenuItems =
    selectedCategory === "all" ? menuItems : menuItems.filter((item) => item.category === selectedCategory)

  // Get unique categories
  const categories = ["all", ...new Set(menuItems.map((item) => item.category))]

  // Render star ratings
  const renderStars = (rating: number) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<IonIcon key={i} icon={star} color="warning" />)
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<IonIcon key={i} icon={starOutline} color="warning" />)
      } else {
        stars.push(<IonIcon key={i} icon={starOutline} color="medium" />)
      }
    }

    return stars
  }

  // New function to add items to order
  const addToOrder = (item: any) => {
    const existingItemIndex = orderItems.findIndex(orderItem => orderItem.id === item.id);
    
    if (existingItemIndex >= 0) {
      // Item already exists in order, increment quantity
      const updatedItems = [...orderItems];
      updatedItems[existingItemIndex].quantity += 1;
      setOrderItems(updatedItems);
    } else {
      // Add new item to order
      setOrderItems([...orderItems, { ...item, quantity: 1 }]);
    }
    
    // Update total and show order card
    setOrderTotal(prevTotal => prevTotal + item.price);
    setShowOrderCard(true);
    
    // Show toast message
    setToastMessage(`${item.name} added to order`);
    setShowToast(true);
  };

  // Function to proceed to checkout
  const proceedToCheckout = () => {
    // Here you would implement the checkout logic
    // For now, we'll just show a message
    setToastMessage("Proceeding to checkout...");
    setShowToast(true);
  };

  // Function to book a premium package
  const bookPackage = (menuPackage: any) => {
    setSelectedPackage(menuPackage);
    setShowPackageConfirmation(true);
  };

  // Function to confirm package booking
  const confirmPackageBooking = () => {
    // Generate a booking reference
    const packageReference = `PKG-${Math.floor(100000 + Math.random() * 900000)}`;
    
    // Show toast message
    setToastMessage(`Package booked successfully! Reference: ${packageReference}`);
    setShowToast(true);
    
    // Close the confirmation
    setShowPackageConfirmation(false);
  };

  // Path prefix for images
  const getImagePath = (path: string) => {
    // If the path already includes http or https, don't modify it
    if (path.startsWith('http')) {
      return path;
    }
    
    // Otherwise, ensure it has the correct prefix
    return path.startsWith('/') ? path : `/${path}`;
  };

  return (
    <IonPage>
      <Header title="Dine In" />
      <IonContent className="ion-padding">
        {serverStatus === "offline" && (
          <div className="server-status-banner">
            <IonIcon icon={informationCircleOutline} />
            <span>Server is offline. Showing sample menu data.</span>
          </div>
        )}
        {/* Hero Section */}
        <div className="dine-in-hero">
          <div className="hero-overlay">
            <h1>Elegant Dining Experience</h1>
            <p>Indulge in a sophisticated atmosphere with exquisite food and impeccable service</p>
            <div className="hero-actions">
              <IonButton
                className="hero-button"
                color="light"
                fill="outline"
                onClick={() => document.getElementById("reservation-section")?.scrollIntoView({ behavior: "smooth" })}
              >
                Make a Reservation
              </IonButton>
              <IonButton
                className="hero-button"
                color="light"
                onClick={() => setShowMenuModal(true)}
              >
                View Menu
              </IonButton>
            </div>
          </div>
        </div>

        <IonGrid>
          {/* Premium Menus Section */}
          <div className="section">
            <div className="section-title">
              <h2>Premium Dining</h2>
              <p>Experience our chef's specially curated premium dining packages</p>
            </div>

            <IonRow className="premium-menus-section">
              {loading ? (
                // Premium menus loading skeleton
                Array(3)
                  .fill(null)
                  .map((_, index) => (
                    <IonCol key={index} size="12" sizeMd="4">
                      <IonCard className="premium-menu-card">
                        <div className="skeleton-image">
                          <IonSkeletonText animated style={{ height: "200px" }} />
                        </div>
                        <IonCardHeader>
                          <IonSkeletonText animated style={{ width: "60%", height: "20px" }} />
                          <IonSkeletonText animated style={{ width: "80%", height: "16px", marginTop: "8px" }} />
                        </IonCardHeader>
                        <IonCardContent>
                          <IonSkeletonText animated style={{ width: "100%" }} />
                          <IonSkeletonText animated style={{ width: "100%" }} />
                          <div style={{ marginTop: "20px" }}>
                            <IonSkeletonText animated style={{ width: "100%", height: "40px" }} />
                          </div>
                        </IonCardContent>
                      </IonCard>
                    </IonCol>
                  ))
              ) : (
                premiumMenus.map((menu) => (
                  <IonCol key={menu.id} size="12" sizeMd="4">
                    <IonCard className="premium-menu-card">
                      <div 
                        className="premium-menu-image" 
                        style={{ backgroundImage: `url(${getImagePath(menu.image)})` }}
                      >
                        <div className="premium-menu-price">₹{menu.price}</div>
                        <div className="favorite-button" onClick={() => toggleFavorite(menu.id)}>
                          <IonIcon
                            icon={favoriteMenus.includes(menu.id) ? heart : heartOutline}
                            color={favoriteMenus.includes(menu.id) ? "danger" : "light"}
                          />
                        </div>
                      </div>
                      <IonCardHeader>
                        <div className="menu-title-container">
                          <IonCardTitle className="menu-title">{menu.name}</IonCardTitle>
                          <div className="menu-rating">
                            {renderStars(menu.rating)}
                            <span className="rating-text">{menu.rating}</span>
                          </div>
                        </div>
                        <div className="menu-tags">
                          {menu.tags.map((tag: string, index: number) => (
                            <span key={index} className="menu-tag">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </IonCardHeader>
                      <IonCardContent>
                        <p className="premium-menu-description">{menu.description}</p>
                        
                        <div className="menu-details-toggle" onClick={() => toggleMenuExpansion(menu.id)}>
                          <span>{expandedMenuId === menu.id ? "Hide Details" : "View Details"}</span>
                          <IonIcon icon={expandedMenuId === menu.id ? chevronUp : chevronDown} />
                        </div>
                        
                        {expandedMenuId === menu.id && (
                          <div className="premium-menu-items">
                            <h4>Included Items</h4>
                            <ul>
                              {menu.items.map((item: string, index: number) => (
                                <li key={index}>
                                  <IonIcon icon={checkmarkCircle} color="success" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        <IonButton 
                          expand="block" 
                          className="book-package-button"
                          onClick={() => bookPackage(menu)}
                        >
                          Book This Package
                        </IonButton>
                      </IonCardContent>
                    </IonCard>
                  </IonCol>
                ))
              )}
            </IonRow>
          </div>

          <div className="section-divider">
            <div className="divider-line"></div>
            <IonIcon icon={restaurantOutline} className="divider-icon" />
            <div className="divider-line"></div>
          </div>

          {/* Reservation Section */}
          <div id="reservation-section" className="section">
            <div className="section-title">
              <h2>Reserve Your Table</h2>
              <p>Book your dining experience in advance to ensure your spot</p>
            </div>

            <IonRow>
              <IonCol size="12" sizeMd="6">
                <IonCard className="reservation-card">
                  <IonCardHeader>
                    <IonCardTitle className="card-title">
                      <IonIcon icon={restaurantOutline} className="card-title-icon" />
                      Table Reservation
                    </IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <form>
                      <IonItem className="form-item">
                        <IonLabel position="stacked">Your Name*</IonLabel>
                        <IonInput
                          value={name}
                          onIonChange={(e) => setName(e.detail.value!)}
                          required
                          className="custom-input"
                        />
                      </IonItem>

                      <IonItem className="form-item">
                        <IonLabel position="stacked">Email*</IonLabel>
                        <IonInput
                          type="email"
                          value={email}
                          onIonChange={(e) => setEmail(e.detail.value!)}
                          required
                          className="custom-input"
                        />
                      </IonItem>

                      <IonItem className="form-item">
                        <IonLabel position="stacked">Phone*</IonLabel>
                        <IonInput
                          type="tel"
                          value={phone}
                          onIonChange={(e) => setPhone(e.detail.value!)}
                          required
                          className="custom-input"
                        />
                      </IonItem>

                      <IonItem className="form-item">
                        <IonLabel>Date*</IonLabel>
                        <IonDatetime
                          min={new Date().toISOString()}
                          value={date}
                          onIonChange={(e) => setDate(e.detail.value as string)}
                          className="custom-datetime"
                        />
                        <IonIcon icon={calendarOutline} slot="start" className="form-icon" />
                      </IonItem>

                      <IonItem className="form-item">
                        <IonLabel>Time*</IonLabel>
                        <IonSelect
                          value={time}
                          onIonChange={(e) => setTime(e.detail.value)}
                          className="custom-select"
                        >
                          <IonSelectOption value="12:00">12:00 PM</IonSelectOption>
                          <IonSelectOption value="12:30">12:30 PM</IonSelectOption>
                          <IonSelectOption value="13:00">1:00 PM</IonSelectOption>
                          <IonSelectOption value="13:30">1:30 PM</IonSelectOption>
                          <IonSelectOption value="19:00">7:00 PM</IonSelectOption>
                          <IonSelectOption value="19:30">7:30 PM</IonSelectOption>
                          <IonSelectOption value="20:00">8:00 PM</IonSelectOption>
                          <IonSelectOption value="20:30">8:30 PM</IonSelectOption>
                          <IonSelectOption value="21:00">9:00 PM</IonSelectOption>
                        </IonSelect>
                        <IonIcon icon={timeOutline} slot="start" className="form-icon" />
                      </IonItem>

                      <IonItem className="form-item">
                        <IonLabel>Number of Guests*</IonLabel>
                        <IonSelect
                          value={guests}
                          onIonChange={(e) => setGuests(e.detail.value)}
                          className="custom-select"
                        >
                          {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                            <IonSelectOption key={num} value={num}>
                              {num}
                            </IonSelectOption>
                          ))}
                        </IonSelect>
                        <IonIcon icon={peopleOutline} slot="start" className="form-icon" />
                      </IonItem>

                      <IonItem className="form-item">
                        <IonLabel position="stacked">Special Requests</IonLabel>
                        <IonInput
                          value={specialRequests}
                          onIonChange={(e) => setSpecialRequests(e.detail.value!)}
                          className="custom-input"
                        />
                      </IonItem>

                      <IonButton
                        expand="block"
                        className="reservation-button"
                        onClick={handleReservation}
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <IonSpinner name="dots" className="button-spinner" />
                            Processing...
                          </>
                        ) : (
                          "Reserve Now"
                        )}
                      </IonButton>
                    </form>
                  </IonCardContent>
                </IonCard>
              </IonCol>

              <IonCol size="12" sizeMd="6">
                <IonCard className="dining-info-card">
                  <IonCardHeader>
                    <IonCardTitle className="card-title">
                      <IonIcon icon={informationCircleOutline} className="card-title-icon" />
                      Dining Information
                    </IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <div className="dining-info-item">
                      <IonIcon icon={timeOutline} className="info-icon" />
                      <div>
                        <h3>Opening Hours</h3>
                        <p>Lunch: 12:00 PM - 3:00 PM</p>
                        <p>Dinner: 7:00 PM - 11:00 PM</p>
                      </div>
                    </div>

                    <div className="dining-info-item">
                      <IonIcon icon={wineOutline} className="info-icon" />
                      <div>
                        <h3>Dress Code</h3>
                        <p>Smart Casual - No shorts, flip-flops or sportswear</p>
                      </div>
                    </div>

                    <div className="dining-info-item">
                      <IonIcon icon={locationOutline} className="info-icon" />
                      <div>
                        <h3>Location</h3>
                        <p>2nd Floor, North Wing</p>
                        <p>Next to the Lounge Area</p>
                      </div>
                    </div>

                    <div className="dining-info-item">
                      <IonIcon icon={restaurantOutline} className="info-icon" />
                      <div>
                        <h3>Cuisine</h3>
                        <p>Fine dining with influences from across the globe</p>
                        <div className="cuisine-tags">
                          <IonChip color="tertiary">Contemporary</IonChip>
                          <IonChip color="tertiary">International</IonChip>
                          <IonChip color="tertiary">Fusion</IonChip>
                          <IonChip color="tertiary">Gourmet</IonChip>
                        </div>
                      </div>
                    </div>

                    <IonButton
                      expand="block"
                      className="menu-button"
                      onClick={() => setShowMenuModal(true)}
                    >
                      View Full Menu <IonIcon slot="end" icon={arrowForwardOutline} />
                    </IonButton>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>
          </div>
        </IonGrid>

        {/* Menu Modal */}
        <IonModal isOpen={showMenuModal} onDidDismiss={() => setShowMenuModal(false)} className="menu-modal">
          <IonHeader>
            <IonToolbar color="light">
              <IonTitle>Restaurant Menu</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setShowMenuModal(false)}>
                  <IonIcon icon={closeCircleOutline} />
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding-bottom">
            <IonSearchbar
              placeholder="Search menu items"
              animated={true}
              className="menu-searchbar"
            />

            <div className="category-filters">
              <IonChip
                color={selectedCategory === "all" ? "primary" : "medium"}
                onClick={() => setSelectedCategory("all")}
                className="category-chip"
              >
                All
              </IonChip>
              <IonChip
                color={selectedCategory === "starter" ? "primary" : "medium"}
                onClick={() => setSelectedCategory("starter")}
                className="category-chip"
              >
                Starters
              </IonChip>
              <IonChip
                color={selectedCategory === "main" ? "primary" : "medium"}
                onClick={() => setSelectedCategory("main")}
                className="category-chip"
              >
                Main
              </IonChip>
              <IonChip
                color={selectedCategory === "dessert" ? "primary" : "medium"}
                onClick={() => setSelectedCategory("dessert")}
                className="category-chip"
              >
                Desserts
              </IonChip>
              <IonChip
                color={selectedCategory === "beverage" ? "primary" : "medium"}
                onClick={() => setSelectedCategory("beverage")}
                className="category-chip"
              >
                Drinks
              </IonChip>
            </div>

            <IonGrid>
              {loading ? (
                // Menu items loading skeleton
                Array(6)
                  .fill(null)
                  .map((_, index) => (
                    <IonRow key={index}>
                      <IonCol size="12">
                        <IonCard className="menu-item-card">
                          <IonRow>
                            <IonCol size="4">
                              <div className="skeleton-image">
                                <IonSkeletonText animated style={{ height: "100%" }} />
                              </div>
                            </IonCol>
                            <IonCol size="8">
                              <IonCardHeader>
                                <IonSkeletonText animated style={{ width: "60%" }} />
                              </IonCardHeader>
                              <IonCardContent>
                                <IonSkeletonText animated style={{ width: "90%" }} />
                                <IonSkeletonText animated style={{ width: "40%" }} />
                                <div style={{ marginTop: "1rem" }}>
                                  <IonSkeletonText animated style={{ width: "30%", height: "30px" }} />
                                </div>
                              </IonCardContent>
                            </IonCol>
                          </IonRow>
                        </IonCard>
                      </IonCol>
                    </IonRow>
                  ))
              ) : menuItems.length > 0 ? (
                menuItems
                  .filter(
                    (item) => selectedCategory === "all" || item.category === selectedCategory
                  )
                  .map((item) => (
                    <IonRow key={item.id}>
                      <IonCol size="12">
                        <IonCard className="menu-item-card">
                          <IonRow>
                            <IonCol size="4">
                              <div
                                className="menu-item-image"
                                style={{
                                  backgroundImage: `url(${getImagePath(item.image_url || "assets/dining.jpg")})`,
                                }}
                              >
                                <div className="menu-item-price">₹{item.price}</div>
                              </div>
                            </IonCol>
                            <IonCol size="8">
                              <IonCardHeader>
                                <IonCardTitle>{item.name}</IonCardTitle>
                              </IonCardHeader>
                              <IonCardContent>
                                <p>{item.description}</p>
                                <IonButton
                                  size="small"
                                  fill="outline"
                                  className="add-to-order-button"
                                  onClick={() => addToOrder(item)}
                                >
                                  Add to Order
                                </IonButton>
                              </IonCardContent>
                            </IonCol>
                          </IonRow>
                        </IonCard>
                      </IonCol>
                    </IonRow>
                  ))
              ) : (
                <IonRow>
                  <IonCol size="12">
                    <div className="no-results">
                      <IonIcon icon={informationCircleOutline} />
                      <h3>No menu items found</h3>
                      <p>Please try again later</p>
                    </div>
                  </IonCol>
                </IonRow>
              )}
            </IonGrid>

            {/* Add extra padding at the bottom when order card is shown */}
            {showOrderCard && <div style={{ height: "80px" }}></div>}
          </IonContent>

          {/* Order Now Card */}
          {showOrderCard && (
            <div className="order-now-card">
              <div className="order-details">
                <div className="order-total">₹{orderTotal}</div>
                <div className="order-items-count">
                  {orderItems.reduce((total, item) => total + item.quantity, 0)} {orderItems.length > 0 && (
                    <span>
                      {orderItems.length === 1 
                        ? orderItems[0].name 
                        : `items (${orderItems.map(item => item.name.split(' ')[0]).join(', ')})`}
                    </span>
                  )}
                </div>
              </div>
              <IonButton className="order-now-button" onClick={proceedToCheckout}>
                Order Now <IonBadge color="light">{orderItems.reduce((total, item) => total + item.quantity, 0)}</IonBadge>
              </IonButton>
            </div>
          )}
        </IonModal>

        {/* Confirmation Alert */}
        <IonAlert
          isOpen={showConfirmation}
          onDidDismiss={() => setShowConfirmation(false)}
          header="Reservation Confirmed!"
          subHeader={`Reference: ${bookingReference}`}
          message="Your table has been reserved. You will receive a confirmation email shortly."
          buttons={[
            {
              text: "OK",
              role: "cancel",
              handler: () => {
                setShowConfirmation(false);
              },
            },
          ]}
        />

        {/* Package Booking Confirmation Alert */}
        <IonAlert
          isOpen={showPackageConfirmation}
          onDidDismiss={() => setShowPackageConfirmation(false)}
          header="Confirm Package Booking"
          subHeader={selectedPackage ? `${selectedPackage.name} - ₹${selectedPackage.price}` : ''}
          message="Would you like to proceed with booking this dining package?"
          buttons={[
            {
              text: 'Cancel',
              role: 'cancel',
              handler: () => {
                setShowPackageConfirmation(false);
              }
            },
            {
              text: 'Confirm',
              handler: confirmPackageBooking
            }
          ]}
        />

        {/* Toast */}
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={2000}
          position="bottom"
          color="dark"
        />
      </IonContent>
    </IonPage>
  )
}

export default DineIn
