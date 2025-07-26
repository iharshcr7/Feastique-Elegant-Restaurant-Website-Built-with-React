// Events page component for Feastique
import {
  IonContent,
  IonPage,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
  IonButton,
  IonInput,
} from '@ionic/react';
import {
  calendarOutline,
  timeOutline,
  locationOutline,
  peopleOutline,
  diamondOutline,
  wineOutline,
  restaurantOutline,
  musicalNotesOutline,
} from 'ionicons/icons';
import CommonHeader from '../components/CommonHeader';
import { useInView } from 'react-intersection-observer';
import './Events.css';

const Events: React.FC = () => {
  const upcomingEvents = [
    {
      title: "Wine Tasting Evening",
      date: "March 25, 2024",
      time: "7:00 PM",
      location: "Main Hall",
      capacity: "50 guests",
      description: "Join us for an exclusive wine tasting experience featuring premium selections from around the world.",
      icon: wineOutline
    },
    {
      title: "Chef's Table Experience",
      date: "April 2, 2024",
      time: "6:30 PM",
      location: "Private Dining Room",
      capacity: "12 guests",
      description: "An intimate dining experience with our executive chef featuring a special tasting menu.",
      icon: restaurantOutline
    }
  ];

  const features = [
    {
      title: "Customized Menus",
      description: "Tailored dining experiences for your special occasion",
      icon: restaurantOutline
    },
    {
      title: "Professional Service",
      description: "Dedicated staff to ensure a memorable event",
      icon: peopleOutline
    },
    {
      title: "Elegant Venues",
      description: "Beautiful spaces for any gathering",
      icon: locationOutline
    },
    {
      title: "Entertainment Options",
      description: "Live music and performance arrangements",
      icon: musicalNotesOutline
    }
  ];

  // Intersection observers for animations
  const { ref: upcomingRef, inView: upcomingInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: privateRef, inView: privateInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: newsletterRef, inView: newsletterInView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <IonPage className="events-page">
      <CommonHeader />
      <IonContent scrollEvents={true}>
        {/* Hero Section */}
        <div className="events-hero animate-fade-in">
          <h1 className="events-title">Special Events</h1>
          <p className="events-subtitle">Create unforgettable moments with us</p>
        </div>

        {/* Upcoming Events Section */}
        <section ref={upcomingRef} className="upcoming-events-section">
          <h2 className="section-title">Upcoming Events</h2>
          <IonGrid>
            <IonRow>
              {upcomingEvents.map((event, index) => (
                <IonCol size="12" sizeMd="6" key={index} className={`animate-slide-up ${upcomingInView ? 'in-view' : ''}`} style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="event-card">
                    <div className="event-header">
                      <div className="event-icon-wrapper">
                        <IonIcon icon={event.icon} />
                      </div>
                      <div className="event-title-date">
                        <h3>{event.title}</h3>
                        <span>{event.date}</span>
                      </div>
                    </div>
                    <div className="event-details">
                      <div className="detail-item">
                        <IonIcon icon={timeOutline} />
                        <span>{event.time}</span>
                      </div>
                      <div className="detail-item">
                        <IonIcon icon={locationOutline} />
                        <span>{event.location}</span>
                      </div>
                      <div className="detail-item">
                        <IonIcon icon={peopleOutline} />
                        <span>{event.capacity}</span>
                      </div>
                    </div>
                    <p className="event-description">{event.description}</p>
                    <IonButton expand="block" className="book-button">
                      Book Now
                    </IonButton>
                  </div>
                </IonCol>
              ))}
            </IonRow>
          </IonGrid>
        </section>

        {/* Private Events Section */}
        <section ref={privateRef} className="private-events-section">
          <h2 className="section-title">Private Event Features</h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className={`feature-card animate-slide-up ${privateInView ? 'in-view' : ''}`} style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="feature-icon-wrapper">
                  <IonIcon icon={feature.icon} />
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>

          {/* CTA Section - Simplified */}
          <div className={`cta-section animate-fade-in ${privateInView ? 'in-view' : ''}`} style={{ animationDelay: '0.4s' }}>
            <h3>Plan Your Perfect Private Event</h3>
            <p>Let our expert team assist you in creating a memorable occasion. Contact us today to discuss your requirements.</p>
            <IonButton className="contact-button">
              Contact Events Team
            </IonButton>
          </div>
        </section>

        {/* Newsletter Section */}
        <section ref={newsletterRef} className={`newsletter-section animate-fade-in ${newsletterInView ? 'in-view' : ''}`}>
          <h2>Stay Updated</h2>
          <p>Subscribe to our newsletter for exclusive event invitations and special offers.</p>
          <form className="subscribe-form" onSubmit={(e) => { e.preventDefault(); /* Add submit logic */ }}>
            <IonInput
              type="email"
              placeholder="Enter your email"
              className="email-input"
              required
            />
            <IonButton type="submit" className="subscribe-button">
              Subscribe
            </IonButton>
          </form>
        </section>
      </IonContent>
    </IonPage>
  );
};

export default Events; 