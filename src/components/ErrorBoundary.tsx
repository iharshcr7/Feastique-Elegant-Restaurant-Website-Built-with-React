import React, { Component, ErrorInfo, ReactNode } from 'react';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton } from '@ionic/react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Something went wrong</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p>We're sorry, but something went wrong. Please try again.</p>
            <IonButton onClick={() => window.location.reload()}>
              Reload Page
            </IonButton>
          </IonCardContent>
        </IonCard>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 