import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import Header from './pages/Header';
import SearchBar from './pages/SearchBar';
import RestaurantCards from './pages/RestaurantCards';
import FoodSlider from './pages/FoodSlider';
import Splash from "./pages/Splash"
import Welcome from "./pages/Welcome"
import LoginSignup from "./pages/LoginSignup"
import Order from './pages/Order';
import Contact from './pages/Contact';
import About from './pages/About';
import Special from './pages/Special';
import Menu from './pages/Menu';
import Events from './pages/Events';
import SideMenu from './components/SideMenu';
import RestaurantMenu from './pages/RestaurantMenu';
import OrderCart from './pages/OrderCart';
import OrderConfirmation from './pages/OrderConfirmation';
import Role from './pages/Role';
import Partner from './pages/Partner';
import Admin from './pages/Admin';
import AdminDashboard from './pages/AdminDashboard';
// import DineIn from './pages/DineIn';
import FoodCategories from './pages/FoodCategories';
import Profile from './pages/Profile';
import PlaceOrder from './pages/PlaceOrder';
import AdminOrders from './pages/AdminOrders';
import OrderHistory from './pages/OrderHistory';
import DineIn from './pages/DineIn';
import NightClub from './pages/NightClub';
/* Core CSS required for Ionic components to work propimerly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Dark Mode */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import RestaurantList from './pages/RestaurantList';

setupIonicReact();

const App: React.FC = () => {
  console.log('Rendering App');
  console.log('Current path:', window.location.pathname);

  return (
    <IonApp>
      <IonReactRouter>
        <SideMenu />
        <IonRouterOutlet id="main-content">
          <Route exact path="/splash" component={Splash} />
          <Route exact path="/welcome" component={Welcome} />
          <Route exact path="/login" component={LoginSignup} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/order" component={Order} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/about" component={About} />
          <Route exact path="/special" component={Special} />
          <Route exact path="/menu" component={Menu} />
          <Route exact path="/events" component={Events} />
          <Route path="/restaurant/:id" component={RestaurantMenu} />
          <Route path="/order-cart" component={OrderCart}></Route>
          <Route path="/order-confirmation" component={OrderConfirmation}></Route>
          <Route path="/role" component={Role}></Route>
          <Route path="/partner" component={Partner}></Route>
          <Route path="/admin" component={Admin}></Route>
          <Route path="/admin-dashboard" component={AdminDashboard}></Route>
          <Route path="/restaurant-list" component={RestaurantList}></Route>
          <Route path="/special" component={Special}></Route>
          {/* <Route path="/dine-in" component={DineIn}></Route> */}
          <Route path="/food-categories" component={FoodCategories}></Route>
          <Route path="/profile" component={Profile}></Route>
          <Route path="/place-order" component={PlaceOrder}></Route>
          <Route path="/admin-orders" component={AdminOrders}></Route>
          <Route path="/order-history" component={OrderHistory}></Route>
          <Route path="/DineIn" component={DineIn}></Route>
          <Route path="/NightClub" component={NightClub}></Route>

          <Route exact path="/">
            <Redirect to="/splash" />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;