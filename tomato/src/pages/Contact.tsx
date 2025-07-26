import React, { useState, FormEvent } from 'react';
import {
  IonPage,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonButton,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  useIonToast,
  InputCustomEvent,
  TextareaCustomEvent,
  InputChangeEventDetail,
  TextareaChangeEventDetail
} from '@ionic/react';
import { mailOutline, callOutline, locationOutline, sendOutline } from 'ionicons/icons';
import CommonHeader from '../components/CommonHeader';
import { useInView } from 'react-intersection-observer';
import './Contact.css';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [present] = useIonToast();

  const handleChange = (e: InputCustomEvent<InputChangeEventDetail> | TextareaCustomEvent<TextareaChangeEventDetail>) => {
    const { name, value } = e.target as (HTMLIonInputElement | HTMLIonTextareaElement);
    if (value !== null && value !== undefined) {
        setFormData(prevState => ({
          ...prevState,
          [name!]: value,
        }));
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Basic validation check
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
        present({
            message: 'Please fill out all fields.',
            duration: 2000,
            color: 'warning'
        });
        return;
    }
    // Replace with your actual form submission logic (e.g., API call)
    console.log('Form submitted:', formData);
    present({
      message: 'Message sent successfully!',
      duration: 3000,
      color: 'success'
    });
    // Reset form after submission
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
  };

  // Intersection observers for animations
  const { ref: infoRef, inView: infoInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: formRef, inView: formInView } = useInView({ triggerOnce: true, threshold: 0.1, delay: 200 }); // Add slight delay

  return (
    <IonPage>
      <CommonHeader />
      <IonContent className="contact-page" scrollEvents={true}>
        <div className="contact-container">
          {/* Header */}
          <div className="contact-header">
            <h1>Contact Us</h1>
            <p>Get in touch with us for any questions or feedback</p>
          </div>

          <IonGrid>
            <IonRow>
              {/* Left Column: Contact Info - Make narrower */}
              <IonCol size="12" sizeMd="4" ref={infoRef} className={`animate-slide-up ${infoInView ? 'in-view' : ''}`}>
                <div className="contact-info-wrapper">
                  {/* Email */}
                  <div className="info-item">
                    <IonIcon icon={mailOutline} className="info-icon" />
                    <div className="info-text">
                      <h3>Email</h3>
                      <p>support@feastique.com</p>
                    </div>
                  </div>
                  {/* Phone */}
                  <div className="info-item">
                    <IonIcon icon={callOutline} className="info-icon" />
                    <div className="info-text">
                      <h3>Phone</h3>
                      <p>+1 (555) 123-4567</p>
                    </div>
                  </div>
                  {/* Address */}
                  <div className="info-item">
                    <IonIcon icon={locationOutline} className="info-icon" />
                    <div className="info-text">
                      <h3>Address</h3>
                      <p>123 Food Street, Cuisine City, FC 12345</p>
                    </div>
                  </div>
                </div>
              </IonCol>

              {/* Right Column: Form - Make wider */}
              <IonCol size="12" sizeMd="8" ref={formRef} className={`animate-slide-up ${formInView ? 'in-view' : ''}`}>
                <form onSubmit={handleSubmit} className="contact-form-wrapper">
                  {/* Name */}
                  <IonItem className="form-item">
                    <IonLabel position="floating">Name</IonLabel>
                    <IonInput
                      name="name"
                      value={formData.name}
                      onIonChange={handleChange}
                      placeholder="Enter your name"
                      clearInput
                      required
                    />
                  </IonItem>
                  {/* Email */}
                  <IonItem className="form-item">
                    <IonLabel position="floating">Email</IonLabel>
                    <IonInput
                      type="email"
                      name="email"
                      value={formData.email}
                      onIonChange={handleChange}
                      placeholder="Enter your email"
                      clearInput
                      required
                    />
                  </IonItem>
                  {/* Subject */}
                  <IonItem className="form-item">
                    <IonLabel position="floating">Subject</IonLabel>
                    <IonInput
                      name="subject"
                      value={formData.subject}
                      onIonChange={handleChange}
                      placeholder="Enter the subject"
                      clearInput
                      required
                    />
                  </IonItem>
                  {/* Message */}
                  <IonItem className="form-item">
                    <IonLabel position="floating">Message</IonLabel>
                    <IonTextarea
                      name="message"
                      value={formData.message}
                      onIonChange={handleChange}
                      placeholder="Enter your message"
                      rows={5}
                      required
                    />
                  </IonItem>
                  {/* Submit Button */}
                  <IonButton expand="block" type="submit" className="submit-button">
                    <IonIcon icon={sendOutline} slot="start" />
                    Send Message
                  </IonButton>
                </form>
              </IonCol>
            </IonRow>
          </IonGrid>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Contact; 