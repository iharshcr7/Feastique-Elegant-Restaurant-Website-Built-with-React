import React, { useState } from "react";
import { IonIcon } from "@ionic/react";
import { locationOutline, searchOutline } from "ionicons/icons";
import "./Home.css";

const SearchBar: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  return (
    <div className="search-container">
      <h1 className="search-title">Discover the best food & drinks in <span className="city-name">India</span></h1>
      <div className="search-bar-container">
        <div className="location-input">
          <IonIcon icon={locationOutline} className="location-icon" />
          <input type="text" placeholder="Place.." className="place-input" />
        </div>
        <div className="search-input">
          <IonIcon icon={searchOutline} className="search-icon" />
          <input type="text" placeholder="Search for restaurant, cuisine or a dish" className="restaurant-input" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;