import {
  IonContent,
  IonPage,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
  IonButton
} from '@ionic/react';
import {
  people,
  heart,
  star,
  restaurant,
  timeOutline,
  starOutline,
  trophyOutline,
  timerOutline,
  ribbonOutline,
  peopleOutline,
  medalOutline,
  restaurantOutline
} from 'ionicons/icons';
import CommonHeader from '../components/CommonHeader';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import './About.css';

const About: React.FC = () => {
  const { ref: statsRef, inView: statsInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { ref: timelineRef, inView: timelineInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: chefsRef, inView: chefsInView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <IonPage>
      <CommonHeader />
      <IonContent className="about-background" scrollEvents={true}>
        {/* Hero Section */}
        <IonGrid className="about-hero-grid">
          <IonRow className="about-hero-row" style={{ alignItems: 'center' }}>
            <IonCol size="12" sizeMd="6" className="chef-image-col">
              <img src="/assets/chef-about.png" alt="Chef presenting" className="chef-img" />
            </IonCol>
            <IonCol size="12" sizeMd="6" className="about-text-col">
              <h2 className="about-heading">ABOUT US</h2>
              <h1 className="about-title">Feastique</h1>
              <p className="about-description">
                Your one-stop destination for mouth-watering dishes — whether you prefer dining out or chilling at home.
              </p>
            </IonCol>
          </IonRow>
        </IonGrid>

        {/* Story & Mission Section */}
        <IonGrid>
          <IonRow className="story-mission-row">
            <IonCol size="12" sizeMd="6">
              <div className="glass-card">
                <IonCardHeader>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <IonIcon icon={restaurant} style={{ color: '#8e44ad', fontSize: '24px' }} />
                    <IonCardTitle>OUR STORY</IonCardTitle>
                  </div>
                  <IonCardSubtitle>Delivering Happiness Since 2024</IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                  Feastique was born from a simple idea: make food delivery not just convenient, but joyful. Every bite tells a story, and we're here to deliver that story to your doorstep.
                </IonCardContent>
              </div>
            </IonCol>

            <IonCol size="12" sizeMd="6">
              <div className="glass-card">
                <IonCardHeader>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <IonIcon icon={star} style={{ color: '#ffb703', fontSize: '24px' }} />
                    <IonCardTitle>OUR MISSION</IonCardTitle>
                  </div>
                </IonCardHeader>
                <IonCardContent>
                  To bring the restaurant experience to your home — through quality ingredients, curated menus, and service that makes you smile.
                </IonCardContent>
              </div>
            </IonCol>
          </IonRow>

          {/* Features Section */}
          <IonRow className="features-row">
            <IonCol size="12" sizeMd="4">
              <div className="feature-card">
                <IonIcon icon={people} className="feature-icon" />
                <h3>Our Community</h3>
                <p>We serve thousands of food lovers every day, building a vibrant and hungry family.</p>
              </div>
            </IonCol>
            <IonCol size="12" sizeMd="4">
              <div className="feature-card">
                <IonIcon icon={heart} className="feature-icon" />
                <h3>Quality First</h3>
                <p>Partnering with top restaurants to deliver food you can trust and crave.</p>
              </div>
            </IonCol>
            <IonCol size="12" sizeMd="4">
              <div className="feature-card">
                <IonIcon icon={star} className="feature-icon" />
                <h3>Exceptional Support</h3>
                <p>Need help? Our friendly team is always here to ensure your experience is seamless.</p>
              </div>
            </IonCol>
          </IonRow>
        </IonGrid>

        {/* Timeline Section */}
        <section ref={timelineRef} className={`timeline-section ${timelineInView ? 'animate-section' : ''}`}>
          <h2 className="section-title">Our Journey of Excellence</h2>
          <div className="timeline-container">
            <div className={`timeline-item ${timelineInView ? 'animate' : ''}`}>
              <div className="timeline-content">
                <div className="timeline-year">2008</div>
                <p className="timeline-text">Founded as a family restaurant, bringing authentic flavors to our community</p>
              </div>
            </div>
            <div className={`timeline-item ${timelineInView ? 'animate' : ''}`}>
              <div className="timeline-content">
                <div className="timeline-year">2013</div>
                <p className="timeline-text">Expanded to multiple locations, sharing our passion across the region</p>
              </div>
            </div>
            <div className={`timeline-item ${timelineInView ? 'animate' : ''}`}>
              <div className="timeline-content">
                <div className="timeline-year">2018</div>
                <p className="timeline-text">Earned our first Michelin star, recognizing our culinary excellence</p>
              </div>
            </div>
            <div className={`timeline-item ${timelineInView ? 'animate' : ''}`}>
              <div className="timeline-content">
                <div className="timeline-year">2023</div>
                <p className="timeline-text">Voted Best Indian Restaurant, celebrating our commitment to quality</p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section ref={statsRef} className="stats-section">
          <div className="stats-grid">
            <div className={`stat-card ${statsInView ? 'animate' : ''}`}>
              <div className="stat-number">
                {statsInView && (
                  <CountUp 
                    end={15} 
                    duration={2.5} 
                    suffix="+" 
                    startOnMount={false}
                    preserveValue={true}
                  />
                )}
              </div>
              <div className="stat-label">Years of Excellence</div>
            </div>
            <div className={`stat-card ${statsInView ? 'animate' : ''}`}>
              <div className="stat-number">
                {statsInView && (
                  <CountUp 
                    end={50} 
                    duration={2.5} 
                    suffix="K+" 
                    startOnMount={false}
                    preserveValue={true}
                  />
                )}
              </div>
              <div className="stat-label">Happy Customers</div>
            </div>
            <div className={`stat-card ${statsInView ? 'animate' : ''}`}>
              <div className="stat-number">
                {statsInView && (
                  <CountUp 
                    end={4.8} 
                    duration={2.5} 
                    decimals={1} 
                    decimal="." 
                    startOnMount={false}
                    preserveValue={true}
                  />
                )}
              </div>
              <div className="stat-label">Customer Rating</div>
            </div>
            <div className={`stat-card ${statsInView ? 'animate' : ''}`}>
              <div className="stat-number">
                {statsInView && (
                  <CountUp 
                    end={200} 
                    duration={2.5} 
                    suffix="+" 
                    startOnMount={false}
                    preserveValue={true}
                  />
                )}
              </div>
              <div className="stat-label">Signature Dishes</div>
            </div>
          </div>
        </section>

        {/* Chefs Section */}
        <section ref={chefsRef} className={`chefs-section ${chefsInView ? 'animate-section' : ''}`}>
          <h2 className="section-title">Meet Our Culinary Artists</h2>
          <p className="section-subtitle">
            The masterminds behind our exceptional cuisine, bringing together tradition and innovation
          </p>
          <div className="chefs-grid">
            <div className={`chef-card ${chefsInView ? 'animate' : ''}`}>
              <div className="chef-image-container">
                <img src="/assets/Cook1.png" alt="Chef Sanjeev Kumar" className="chef-image" />
              </div>
              <div className="chef-info">
                <h3 className="chef-name">Chef Sanjeev Kumar</h3>
                <div className="chef-title">Executive Chef</div>
                <div className="chef-details">
                  <div className="chef-detail-item">
                    <IonIcon icon={timerOutline} className="chef-detail-icon" />
                    Experience: 20+ years
                  </div>
                  <div className="chef-detail-item">
                    <IonIcon icon={restaurantOutline} className="chef-detail-icon" />
                    Speciality: Indian Cuisine
                  </div>
                </div>
                <div className="chef-awards">
                  <div className="award-item">
                    <IonIcon icon={starOutline} className="award-icon" />
                    Michelin Star 2022
                  </div>
                  <div className="award-item">
                    <IonIcon icon={trophyOutline} className="award-icon" />
                    Best Chef Award 2021
                  </div>
                </div>
              </div>
            </div>

            <div className={`chef-card ${chefsInView ? 'animate' : ''}`}>
              <div className="chef-image-container">
                <img src="/assets/Cook2.png" alt="Chef Ranbeer Brar" className="chef-image" />
              </div>
              <div className="chef-info">
                <h3 className="chef-name">Chef Ranbeer Brar</h3>
                <div className="chef-title">Head Chef - Global Fusion</div>
                <div className="chef-details">
                  <div className="chef-detail-item">
                    <IonIcon icon={timerOutline} className="chef-detail-icon" />
                    Experience: 15+ years
                  </div>
                  <div className="chef-detail-item">
                    <IonIcon icon={restaurantOutline} className="chef-detail-icon" />
                    Speciality: Contemporary Fusion
                  </div>
                </div>
                <div className="chef-awards">
                  <div className="award-item">
                    <IonIcon icon={ribbonOutline} className="award-icon" />
                    Innovation in Cuisine 2022
                  </div>
                </div>
              </div>
            </div>

            <div className={`chef-card ${chefsInView ? 'animate' : ''}`}>
              <div className="chef-image-container">
                <img src="/assets/Cook3.png" alt="Chef Ming Lee" className="chef-image" />
              </div>
              <div className="chef-info">
                <h3 className="chef-name">Chef Ming Lee</h3>
                <div className="chef-title">Specialty Chef - Asian Cuisine</div>
                <div className="chef-details">
                  <div className="chef-detail-item">
                    <IonIcon icon={timerOutline} className="chef-detail-icon" />
                    Experience: 12+ years
                  </div>
                  <div className="chef-detail-item">
                    <IonIcon icon={restaurantOutline} className="chef-detail-icon" />
                    Speciality: Pan-Asian Delicacies
                  </div>
                </div>
                <div className="chef-awards">
                  <div className="award-item">
                    <IonIcon icon={medalOutline} className="award-icon" />
                    Asian Culinary Excellence 2023
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </IonContent>
    </IonPage>
  );
};

export default About;
