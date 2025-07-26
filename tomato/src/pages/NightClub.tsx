"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import {
  IonContent,
  IonPage,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
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
  IonBadge,
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonToggle,
  IonNote,
  IonButtons,
  IonSkeletonText,
  IonSpinner,
  IonChip,
  IonFab,
  IonFabButton,
  IonAlert,
  IonSearchbar,
  IonRefresher,
  IonRefresherContent,
  type RefresherEventDetail,
} from "@ionic/react"
import {
  timeOutline,
  peopleOutline,
  calendarOutline,
  closeCircleOutline,
  musicalNotesOutline,
  ticketOutline,
  wineOutline,
  starOutline,
  star,
  heartOutline,
  heart,
  informationCircleOutline,
  locationOutline,
  checkmarkCircle,
  chevronDown,
  chevronUp,
  shareOutline,
  addOutline,
  removeOutline,
  flameOutline,
} from "ionicons/icons"
import axios from "axios"
import "./night-club.css"
import Header from "./Header"

const NightClub: React.FC = () => {
  // Add ref for scrolling
  const contentRef = useRef<HTMLIonContentElement>(null);

  // State for events
  const [events, setEvents] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [favoriteEvents, setFavoriteEvents] = useState<number[]>([])
  const [expandedEventId, setExpandedEventId] = useState<number | null>(null)
  const [selectedGenre, setSelectedGenre] = useState<string>('all')
  const [serverStatus, setServerStatus] = useState<string>("checking")
  const [acceptTerms, setAcceptTerms] = useState<boolean>(false)
  
  // Other state variables
  const [showToast, setShowToast] = useState<boolean>(false)
  const [toastMessage, setToastMessage] = useState<string>("")
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false)
  const [bookingReference, setBookingReference] = useState<string>("")
  const [specialRequests, setSpecialRequests] = useState<string>("")

  // Path prefix for images
  const getImagePath = (path: string) => {
    // If the path already includes http or https, don't modify it
    if (path && path.startsWith('http')) {
      return path;
    }
    
    // Check if path includes party images that are missing
    if (path && path.includes('party')) {
      // Use club.png as fallback for party images
      return '/assets/club.png';
    }
    
    // Otherwise, ensure it has the correct prefix
    return path && path.startsWith('/') ? path : `/${path}`;
  };

  // Default events in case API fails
  const defaultEvents = [
    {
      id: 1,
      name: "Friday Night Fever",
      date: "2023-11-10",
      time: "9:00 PM - 2:00 AM",
      description: "Start your weekend with electrifying beats from our resident DJ",
      price: 500,
      image_url: "/assets/night-club-1.png",
      featured: true,
      dj: "DJ Blaze",
      genre: "House & EDM",
      rating: 4.8,
      attendees: 120,
    },
    {
      id: 2,
      name: "Saturday Sensation",
      date: "2023-11-11",
      time: "10:00 PM - 3:00 AM",
      description: "The ultimate party night with special guest performances",
      price: 800,
      image_url: "/assets/party2.png",
      featured: true,
      dj: "DJ Rhythm & MC Vibe",
      genre: "Hip Hop & R&B",
      rating: 4.9,
      attendees: 180,
    },
    {
      id: 3,
      name: "Bollywood Bash",
      date: "2023-11-15",
      time: "9:00 PM - 1:00 AM",
      description: "Dance to your favorite Bollywood hits all night long",
      price: 600,
      image_url: "public/assets/party3.png",
      featured: false,
      dj: "DJ Bollywood King",
      genre: "Bollywood & Punjabi",
      rating: 4.7,
      attendees: 95,
    },
    {
      id: 4,
      name: "Retro Rewind",
      date: "2023-11-18",
      time: "8:00 PM - 1:00 AM",
      description: "Travel back in time with classic hits from the 80s and 90s",
      price: 500,
      image_url: "public/assets/party4.png",
      featured: false,
      dj: "DJ Throwback",
      genre: "Retro & Classics",
      rating: 4.6,
      attendees: 85,
    },
  ]

  // State for VIP packages
  const [vipPackages, setVipPackages] = useState<any[]>([])
  const [expandedVIPId, setExpandedVIPId] = useState<number | null>(null)

  // Default VIP packages in case API fails
  const defaultVIPPackages = [
    {
      id: 1,
      name: "Silver VIP",
      price: 5000,
      capacity: "4-6 people",
      benefits: ["Premium table location", "1 Complementary bottle", "Priority entry", "Dedicated host service"],
      image_url: "/assets/party1.png",
      rating: 4.6,
      popularity: "Medium",
    },
    {
      id: 2,
      name: "Gold VIP",
      price: 8000,
      capacity: "6-8 people",
      benefits: [
        "Premium central table",
        "2 Complementary bottles",
        "Priority entry",
        "Dedicated server",
        "Complimentary snacks",
      ],
      image_url: "/assets/party2.png",
      rating: 4.8,
      popularity: "High",
    },
    {
      id: 3,
      name: "Platinum VIP",
      price: 15000,
      capacity: "8-10 people",
      benefits: [
        "Best table in the house",
        "3 Complementary bottles",
        "VIP entry",
        "Dedicated server",
        "Complementary appetizers",
        "Personal DJ song requests",
        "Photo service",
      ],
      image_url: "/assets/party3.png",
      rating: 4.9,
      popularity: "Very High",
    },
  ]

  // State for booking
  const [showEventBooking, setShowEventBooking] = useState<boolean>(false)
  const [showVIPBooking, setShowVIPBooking] = useState<boolean>(false)
  const [selectedEvent, setSelectedEvent] = useState<any>(null)
  const [selectedVIP, setSelectedVIP] = useState<any>(null)
  const [quantity, setQuantity] = useState<number>(1)
  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [phone, setPhone] = useState<string>("")
  const [date, setDate] = useState<string>(new Date().toISOString())
  const [time, setTime] = useState<string>("21:00")
  const [guests, setGuests] = useState<number>(4)

  // State for UI interactions
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [showSearch, setShowSearch] = useState<boolean>(false)

  // Fetch events and VIP packages
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        // Check if server is available
        try {
          await axios.get("http://localhost:5000/api/health", { timeout: 2000 })
          setServerStatus("online")
        } catch (error) {
          console.log("Server appears to be offline, using default data")
          setServerStatus("offline")
          // If server is offline, immediately use default data
          setEvents(defaultEvents)
          setVipPackages(defaultVIPPackages)
          setLoading(false)
          return
        }

        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Fetch events
        const eventsResponse = await axios.get("http://localhost:5000/api/nightclub-events")
        if (eventsResponse.data && eventsResponse.data.length > 0) {
          setEvents(eventsResponse.data)
        } else {
          setEvents(defaultEvents)
        }

        // Fetch VIP packages
        const packagesResponse = await axios.get("http://localhost:5000/api/vip-packages")
        if (packagesResponse.data && packagesResponse.data.length > 0) {
          setVipPackages(packagesResponse.data)
        } else {
          setVipPackages(defaultVIPPackages)
        }
      } catch (error) {
        console.error("Error fetching data:", error)
        // Use default data if API fails
        setEvents(defaultEvents)
        setVipPackages(defaultVIPPackages)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Event booking functions
  const openEventBooking = (event: any) => {
    setSelectedEvent(event)
    setShowEventBooking(true)
  }

  const handleEventBooking = async () => {
    if (!name || !email || !phone || !acceptTerms) {
      setToastMessage("Please fill in all required fields and accept terms")
      setShowToast(true)
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setToastMessage("Please enter a valid email address")
      setShowToast(true)
      return
    }

    // Phone validation
    const phoneRegex = /^\d{10}$/
    if (!phoneRegex.test(phone.replace(/[^0-9]/g, ''))) {
      setToastMessage("Please enter a valid 10-digit phone number")
      setShowToast(true)
      return
    }

    try {
      setLoading(true)

      // Simulate API call with shorter delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Generate a random booking reference
      const reference = `EV${Math.floor(100000 + Math.random() * 900000)}`
      setBookingReference(reference)

      // Show confirmation
      setShowConfirmation(true)
      setShowEventBooking(false)

      // Reset form
      setName("")
      setEmail("")
      setPhone("")
      setQuantity(1)
      setAcceptTerms(false)
    } catch (error) {
      console.error("Error booking tickets:", error)
      setToastMessage("Error processing your booking. Please try again.")
      setShowToast(true)
    } finally {
      setLoading(false)
    }
  }

  // VIP booking functions
  const openVIPBooking = (vipPackage: any) => {
    setSelectedVIP(vipPackage)
    setShowVIPBooking(true)
  }

  const handleVIPBooking = async () => {
    if (!name || !email || !phone || !date || !acceptTerms) {
      setToastMessage("Please fill in all required fields and accept terms")
      setShowToast(true)
      return
    }

    try {
      setLoading(true)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Generate a random booking reference
      const reference = `VIP${Math.floor(100000 + Math.random() * 900000)}`
      setBookingReference(reference)

      // Show confirmation
      setShowConfirmation(true)
      setShowVIPBooking(false)

      // Reset form
      setName("")
      setEmail("")
      setPhone("")
      setDate(new Date().toISOString())
      setTime("21:00")
      setGuests(4)
      setSpecialRequests("")
      setAcceptTerms(false)
    } catch (error) {
      console.error("Error booking VIP table:", error)
      setToastMessage("Error processing your VIP booking. Please try again.")
      setShowToast(true)
    } finally {
      setLoading(false)
    }
  }

  // Toggle event expansion
  const toggleEventExpansion = (id: number) => {
    setExpandedEventId(expandedEventId === id ? null : id)
  }

  // Toggle VIP expansion
  const toggleVIPExpansion = (id: number) => {
    setExpandedVIPId(expandedVIPId === id ? null : id)
  }

  // Toggle favorite status
  const toggleFavorite = (id: number) => {
    setFavoriteEvents((prev) => (prev.includes(id) ? prev.filter((eventId) => eventId !== id) : [...prev, id]))

    // Show feedback
    setToastMessage(favoriteEvents.includes(id) ? "Removed from favorites" : "Added to favorites")
    setShowToast(true)
  }

  // Share event
  const shareEvent = (event: any) => {
    if (navigator.share) {
      navigator.share({
        title: event.name,
        text: `Check out this event: ${event.name} on ${event.date}, ${event.time}`,
        url: window.location.href,
      })
      .then(() => {
        setToastMessage("Event shared successfully")
        setShowToast(true)
      })
      .catch((error) => {
        console.error("Error sharing:", error)
      })
    } else {
      // Fallback for browsers that don't support share API
      const shareText = `Check out this event: ${event.name} on ${event.date}, ${event.time}`
      navigator.clipboard.writeText(shareText)
        .then(() => {
          setToastMessage("Event details copied to clipboard")
          setShowToast(true)
        })
        .catch(err => {
          console.error("Error copying text: ", err)
        })
    }
  }

  // Handle pull to refresh
  const handleRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
    try {
      // Simulate refresh
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Shuffle events to simulate refresh
      setEvents((prev) => [...prev].sort(() => Math.random() - 0.5))

      setToastMessage("Content refreshed")
      setShowToast(true)
    } finally {
      event.detail.complete()
    }
  }

  // Filter events by genre
  const filteredEvents = events.filter((event) => {
    // Filter by genre
    if (selectedGenre === 'all') {
      return true;
    } else if (selectedGenre === 'house-edm' && event.genre === 'House & EDM') {
      return true;
    } else if (selectedGenre === 'hiphop-rnb' && event.genre === 'Hip Hop & R&B') {
      return true;
    } else if (selectedGenre === 'bollywood' && event.genre === 'Bollywood & Punjabi') {
      return true;
    } else if (selectedGenre === 'retro' && event.genre === 'Retro & Classics') {
      return true;
    }
    return false;
  })

  // Get unique genres
  const genres = ["all", ...new Set(events.map((event) => event.genre || "Other"))]

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

  // Scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element && contentRef.current) {
      contentRef.current.scrollToPoint(0, element.offsetTop - 60, 1000)
    }
  }

  return (
    <IonPage>
      <Header title="Night Club" />
      <IonContent ref={contentRef} className="ion-padding">
        {serverStatus === "offline" && (
          <div className="server-status-banner">
            <IonIcon icon={informationCircleOutline} />
            <span>Server is offline. Showing sample data.</span>
          </div>
        )}
        
        {/* Hero Section */}
        <div className="nightclub-hero">
          <div className="hero-overlay animate-fade-in">
            <h1>Feastique Night Club</h1>
            <p>Experience unforgettable nights with amazing music, premium drinks, and electrifying atmosphere</p>
            <div className="hero-actions">
              <IonButton 
                className="hero-button animate-slide-up stagger-1" 
                color="light" 
                fill="outline"
                onClick={() => scrollToSection('events')}
              >
                View Events
              </IonButton>
              <IonButton 
                className="hero-button animate-slide-up stagger-2" 
                color="light"
                onClick={() => scrollToSection('vip')}
              >
                VIP Tables
              </IonButton>
            </div>
          </div>
        </div>

        {/* Navigation Shortcuts */}
        <div className="quick-nav">
          <IonGrid>
            <IonRow>
              <IonCol size="12">
                <div className="genre-filters">
                  <IonChip 
                    className={`genre-chip ${selectedGenre === 'all' ? 'active' : ''}`} 
                    onClick={() => setSelectedGenre('all')}
                    color={selectedGenre === 'all' ? 'primary' : undefined}
                  >All</IonChip>
                  <IonChip 
                    className={`genre-chip ${selectedGenre === 'house-edm' ? 'active' : ''}`} 
                    onClick={() => setSelectedGenre('house-edm')}
                    color={selectedGenre === 'house-edm' ? 'primary' : undefined}
                  >House & EDM</IonChip>
                  <IonChip 
                    className={`genre-chip ${selectedGenre === 'hiphop-rnb' ? 'active' : ''}`} 
                    onClick={() => setSelectedGenre('hiphop-rnb')}
                    color={selectedGenre === 'hiphop-rnb' ? 'primary' : undefined}
                  >Hip Hop & R&B</IonChip>
                  <IonChip 
                    className={`genre-chip ${selectedGenre === 'bollywood' ? 'active' : ''}`} 
                    onClick={() => setSelectedGenre('bollywood')}
                    color={selectedGenre === 'bollywood' ? 'primary' : undefined}
                  >Bollywood & Punjabi</IonChip>
                  <IonChip 
                    className={`genre-chip ${selectedGenre === 'retro' ? 'active' : ''}`} 
                    onClick={() => setSelectedGenre('retro')}
                    color={selectedGenre === 'retro' ? 'primary' : undefined}
                  >Retro & Classics</IonChip>
                </div>
              </IonCol>
            </IonRow>
          </IonGrid>
        </div>

        {/* Events Section */}
        <div id="events" className="section">
          <div className="section-title">
            <h2>Upcoming Events</h2>
            <p>Don't miss our exciting events lineup</p>
          </div>

          {loading ? (
            <IonGrid>
              {Array(4).fill(null).map((_, i) => (
                <IonRow key={i}>
                  <IonCol size="12">
                    <IonCard>
                      <div className="skeleton-image">
                        <IonSkeletonText animated style={{ height: '200px' }} />
                      </div>
                      <IonCardHeader>
                        <IonSkeletonText animated style={{ width: '70%' }} />
                        <IonSkeletonText animated style={{ width: '40%' }} />
                      </IonCardHeader>
                      <IonCardContent>
                        <IonSkeletonText animated style={{ width: '90%' }} />
                        <IonSkeletonText animated style={{ width: '60%' }} />
                      </IonCardContent>
                    </IonCard>
                  </IonCol>
                </IonRow>
              ))}
            </IonGrid>
          ) : events.length > 0 ? (
            <IonGrid>
              {filteredEvents.map((event) => (
                <IonRow key={event.id}>
                  <IonCol size="12">
                    <IonCard className="event-card animate-scale">
                      <img 
                        src={getImagePath(event.image_url)} 
                        alt={event.name} 
                        className="event-image"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.onerror = null;
                          target.src = "/assets/club.png";
                        }}
                      />
                      {event.featured && (
                        <IonBadge className="event-badge">Featured</IonBadge>
                      )}
                      <IonCardHeader>
                        <IonCardTitle className="event-title">{event.name}</IonCardTitle>
                        <IonCardSubtitle className="event-subtitle">
                          <IonIcon icon={calendarOutline} className="subtitle-icon" />
                          {event.date}
                          <span className="subtitle-divider">•</span>
                          <IonIcon icon={timeOutline} className="subtitle-icon" />
                          {event.time}
                        </IonCardSubtitle>
                      </IonCardHeader>
                      <IonCardContent>
                        <p className="event-description">{event.description}</p>
                        <div className="event-detail">
                          <IonIcon icon={musicalNotesOutline} />
                          <span>{event.genre}</span>
                        </div>
                        <div className="event-detail">
                          <IonIcon icon={peopleOutline} />
                          <span>{event.attendees} attending</span>
                        </div>
                        <button 
                          className="event-details-toggle"
                          onClick={() => toggleEventExpansion(event.id)}
                        >
                          {expandedEventId === event.id ? (
                            <>Less Info <IonIcon icon={chevronUp} /></>
                          ) : (
                            <>More Info <IonIcon icon={chevronDown} /></>
                          )}
                        </button>
                        
                        {expandedEventId === event.id && (
                          <div className="event-expanded-details">
                            <div className="expanded-detail">
                              <span className="detail-label">DJ:</span>
                              <span className="detail-value">{event.dj}</span>
                            </div>
                            <div className="expanded-detail">
                              <span className="detail-label">Rating:</span>
                              <div className="rating-stars">{renderStars(event.rating)}</div>
                              <span className="rating-text">{event.rating}/5</span>
                            </div>
                            <div className="social-share">
                              <button 
                                className="share-button"
                                onClick={() => shareEvent(event)}
                                aria-label="Share event"
                              >
                                <IonIcon icon={shareOutline} />
                                Share
                              </button>
                            </div>
                          </div>
                        )}
                        
                        <div className="event-actions">
                          <button 
                            className="favorite-button"
                            onClick={() => toggleFavorite(event.id)}
                            aria-label="Toggle favorite"
                          >
                            <IonIcon icon={favoriteEvents.includes(event.id) ? heart : heartOutline} />
                          </button>
                          <button 
                            className="book-ticket-button"
                            onClick={() => openEventBooking(event)}
                          >
                            <IonIcon icon={ticketOutline} />
                            Book Tickets - ₹{event.price}
                          </button>
                        </div>
                      </IonCardContent>
                    </IonCard>
                  </IonCol>
                </IonRow>
              ))}
            </IonGrid>
          ) : (
            <div className="no-results">
              <IonIcon icon={informationCircleOutline} />
              <h3>No events found</h3>
              <p>Try changing your search or check back later</p>
            </div>
          )}
        </div>

        {/* VIP Section */}
        <div id="vip" className="section">
          <div className="section-title">
            <h2>VIP Tables</h2>
            <p>Elevate your night with our premium VIP packages</p>
          </div>

          {loading ? (
            <IonGrid>
              {Array(3).fill(null).map((_, i) => (
                <IonRow key={i}>
                  <IonCol size="12" sizeMd="4">
                    <IonCard>
                      <div className="skeleton-image">
                        <IonSkeletonText animated style={{ height: '200px' }} />
                      </div>
                      <IonCardHeader>
                        <IonSkeletonText animated style={{ width: '70%' }} />
                        <IonSkeletonText animated style={{ width: '40%' }} />
                      </IonCardHeader>
                      <IonCardContent>
                        <IonSkeletonText animated style={{ width: '90%' }} />
                        <IonSkeletonText animated style={{ width: '60%' }} />
                      </IonCardContent>
                    </IonCard>
                  </IonCol>
                </IonRow>
              ))}
            </IonGrid>
          ) : vipPackages.length > 0 ? (
            <IonGrid>
              <IonRow>
                {vipPackages.map((vip) => (
                  <IonCol key={vip.id} size="12" sizeMd="4">
                    <IonCard className="vip-card animate-scale">
                      <div 
                        className="vip-image" 
                        style={{ 
                          backgroundImage: `url(${getImagePath(vip.image_url)})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center'
                        }}
                      >
                        <div className="vip-price">₹{vip.price}</div>
                        <div className="popularity-badge">{vip.popularity}</div>
                      </div>
                      <IonCardHeader>
                        <IonCardTitle className="vip-title">{vip.name}</IonCardTitle>
                        <IonCardSubtitle className="vip-subtitle">
                          <IonIcon icon={peopleOutline} className="subtitle-icon" />
                          {vip.capacity}
                        </IonCardSubtitle>
                      </IonCardHeader>
                      <IonCardContent>
                        <div className="vip-rating">
                          {renderStars(vip.rating)}
                          <span className="rating-text">{vip.rating}/5</span>
                        </div>
                        
                        <button 
                          className="vip-details-toggle"
                          onClick={() => toggleVIPExpansion(vip.id)}
                        >
                          {expandedVIPId === vip.id ? (
                            <>Less Info <IonIcon icon={chevronUp} /></>
                          ) : (
                            <>More Info <IonIcon icon={chevronDown} /></>
                          )}
                        </button>
                        
                        {expandedVIPId === vip.id && (
                          <div className="vip-benefits">
                            <h4>Package Benefits</h4>
                            <ul>
                              {vip.benefits.map((benefit: string, index: number) => (
                                <li key={index}>
                                  <IonIcon icon={checkmarkCircle} color="success" />
                                  {benefit}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        <IonButton 
                          expand="block" 
                          className="book-vip-button"
                          onClick={() => openVIPBooking(vip)}
                        >
                          <IonIcon icon={flameOutline} />
                          Book VIP Table
                        </IonButton>
                      </IonCardContent>
                    </IonCard>
                  </IonCol>
                ))}
              </IonRow>
            </IonGrid>
          ) : (
            <div className="no-results">
              <IonIcon icon={informationCircleOutline} />
              <h3>No VIP packages available</h3>
              <p>Please check back later or contact us directly</p>
            </div>
          )}
        </div>

        {/* Event Booking Modal */}
        <IonModal isOpen={showEventBooking} onDidDismiss={() => setShowEventBooking(false)}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Book Event Tickets</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setShowEventBooking(false)}>
                  <IonIcon icon={closeCircleOutline} />
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            {selectedEvent && (
              <div className="booking-form-container">
                <div className="booking-event-details">
                  <h2>{selectedEvent.name}</h2>
                  <div className="event-date-time">
                    <IonIcon icon={calendarOutline} />
                    <span>{selectedEvent.date}</span>
                    <span className="detail-separator">•</span>
                    <IonIcon icon={timeOutline} />
                    <span>{selectedEvent.time}</span>
                  </div>
                </div>
                <form>
                  <IonItem className="form-item">
                    <IonLabel position="stacked">Your Name</IonLabel>
                    <IonInput 
                      value={name} 
                      onIonChange={e => setName(e.detail.value!)} 
                      placeholder="Full name"
                      required
                    />
                  </IonItem>
                  
                  <IonItem className="form-item">
                    <IonLabel position="stacked">Email</IonLabel>
                    <IonInput 
                      type="email" 
                      value={email} 
                      onIonChange={e => setEmail(e.detail.value!)} 
                      placeholder="Your email address"
                      required
                    />
                  </IonItem>
                  
                  <IonItem className="form-item">
                    <IonLabel position="stacked">Phone</IonLabel>
                    <IonInput 
                      type="tel" 
                      value={phone} 
                      onIonChange={e => setPhone(e.detail.value!)} 
                      placeholder="Contact number"
                      required
                    />
                  </IonItem>
                  
                  <div className="quantity-selector">
                    <IonLabel>Number of Tickets</IonLabel>
                    <div className="quantity-controls">
                      <IonButton 
                        fill="clear" 
                        onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                      >
                        <IonIcon icon={removeOutline} />
                      </IonButton>
                      <span className="quantity-value">{quantity}</span>
                      <IonButton 
                        fill="clear" 
                        onClick={() => setQuantity(quantity + 1)}
                      >
                        <IonIcon icon={addOutline} />
                      </IonButton>
                    </div>
                  </div>
                  
                  <div className="price-summary">
                    <div className="price-item">
                      <span>Ticket Price</span>
                      <span>₹{selectedEvent.price} x {quantity}</span>
                    </div>
                    <div className="price-total">
                      <span>Total</span>
                      <span>₹{selectedEvent.price * quantity}</span>
                    </div>
                  </div>
                  
                  <IonItem lines="none" className="terms-item">
                    <IonToggle 
                      checked={acceptTerms} 
                      onIonChange={e => setAcceptTerms(e.detail.checked)}
                    />
                    <IonLabel>I agree to the <a href="#">terms and conditions</a></IonLabel>
                  </IonItem>
                  
                  <IonButton 
                    expand="block" 
                    className="booking-submit-button"
                    disabled={!name || !email || !phone || !acceptTerms}
                    onClick={handleEventBooking}
                  >
                    Confirm Booking
                  </IonButton>
                  
                  <p className="booking-note">
                    <IonIcon icon={informationCircleOutline} />
                    Your tickets will be sent to your email after booking confirmation
                  </p>
                </form>
              </div>
            )}
          </IonContent>
        </IonModal>

        {/* VIP Booking Modal */}
        <IonModal isOpen={showVIPBooking} onDidDismiss={() => setShowVIPBooking(false)}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Book VIP Table</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setShowVIPBooking(false)}>
                  <IonIcon icon={closeCircleOutline} />
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            {selectedVIP && (
              <div className="booking-form-container">
                <div className="booking-vip-details">
                  <h2>{selectedVIP.name}</h2>
                  <div className="vip-capacity">
                    <IonIcon icon={peopleOutline} />
                    <span>Capacity: {selectedVIP.capacity}</span>
                  </div>
                  <div className="vip-price-display">₹{selectedVIP.price}</div>
                </div>
                <form>
                  <IonItem className="form-item">
                    <IonLabel position="stacked">Your Name</IonLabel>
                    <IonInput 
                      value={name} 
                      onIonChange={e => setName(e.detail.value!)} 
                      placeholder="Full name"
                      required
                    />
                  </IonItem>
                  
                  <IonItem className="form-item">
                    <IonLabel position="stacked">Email</IonLabel>
                    <IonInput 
                      type="email" 
                      value={email} 
                      onIonChange={e => setEmail(e.detail.value!)} 
                      placeholder="Your email address"
                      required
                    />
                  </IonItem>
                  
                  <IonItem className="form-item">
                    <IonLabel position="stacked">Phone</IonLabel>
                    <IonInput 
                      type="tel" 
                      value={phone} 
                      onIonChange={e => setPhone(e.detail.value!)} 
                      placeholder="Contact number"
                      required
                    />
                  </IonItem>
                  
                  <IonItem className="form-item">
                    <IonLabel>Date</IonLabel>
                    <IonDatetime
                      min={new Date().toISOString()}
                      value={date}
                      onIonChange={(e) => setDate(e.detail.value as string)}
                      className="custom-datetime"
                    />
                    <IonIcon icon={calendarOutline} slot="start" className="form-icon" />
                  </IonItem>

                  <IonItem className="form-item">
                    <IonLabel>Time</IonLabel>
                    <IonSelect
                      value={time}
                      onIonChange={(e) => setTime(e.detail.value)}
                      className="custom-select"
                    >
                      <IonSelectOption value="21:00">9:00 PM</IonSelectOption>
                      <IonSelectOption value="21:30">9:30 PM</IonSelectOption>
                      <IonSelectOption value="22:00">10:00 PM</IonSelectOption>
                      <IonSelectOption value="22:30">10:30 PM</IonSelectOption>
                      <IonSelectOption value="23:00">11:00 PM</IonSelectOption>
                    </IonSelect>
                    <IonIcon icon={timeOutline} slot="start" className="form-icon" />
                  </IonItem>

                  <IonItem className="form-item">
                    <IonLabel>Number of Guests</IonLabel>
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
                      placeholder="Any special requirements or preferences"
                      className="custom-input"
                    />
                  </IonItem>
                  
                  <IonItem lines="none" className="terms-item">
                    <IonToggle 
                      checked={acceptTerms} 
                      onIonChange={e => setAcceptTerms(e.detail.checked)}
                    />
                    <IonLabel>I agree to the <a href="#">terms and conditions</a></IonLabel>
                  </IonItem>
                  
                  <IonButton 
                    expand="block" 
                    className="booking-submit-button"
                    disabled={!name || !email || !phone || !date || !acceptTerms}
                    onClick={handleVIPBooking}
                  >
                    Confirm VIP Booking
                  </IonButton>
                  
                  <p className="booking-note">
                    <IonIcon icon={informationCircleOutline} />
                    A 50% deposit is required to secure your VIP table booking
                  </p>
                </form>
              </div>
            )}
          </IonContent>
        </IonModal>

        {/* Confirmation Alert */}
        <IonAlert
          isOpen={showConfirmation}
          onDidDismiss={() => setShowConfirmation(false)}
          header="Booking Confirmed!"
          message={`Your booking has been confirmed. Reference: ${bookingReference}`}
          buttons={[
            {
              text: 'OK',
              handler: () => {
                setShowConfirmation(false);
              }
            }
          ]}
        />

        {/* Toast Notification */}
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={3000}
          position="bottom"
          color="success"
        />
      </IonContent>
    </IonPage>
  )
}

export default NightClub
