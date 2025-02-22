"use client";

import { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import RestaurantDetails from "./RestaurantDetails";
import styles from "./Map.module.css";
import axios from "axios";

const GEOAPIFY_API_KEY = process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY;

async function getCoordinates(address: string) {
  const encodedAddress = encodeURIComponent(address);
  const url = `https://api.geoapify.com/v1/geocode/search?text=${encodedAddress}&apiKey=${GEOAPIFY_API_KEY}`;
  try {
    const response = await axios.get(url);
    const results = response.data.features;

    if (results.length > 0) {
      const [lon, lat] = results[0].geometry.coordinates; // Ensure correct order
      return { lat, lng: lon }; // Google Maps needs { lat, lng }
    } else {
      console.error("No results found for address:", address);
      return null;
    }
  } catch (error) {
    console.error("Error fetching coordinates:", error);
    return null;
  }
}

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

const priceMapping: { [key: number]: number } = {
  1: 10,
  2: 15,
  3: 20,
  4: 30,
  5: 40,
};

interface MapProps {
  onRestaurantSelect: (restaurant: any) => Promise<void>;
}

export default function Map({ onRestaurantSelect }: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState<any>(null);

  useEffect(() => {
    const loadMap = async () => {
      const loader = new Loader({
        apiKey: GOOGLE_MAPS_API_KEY!,
        version: "weekly",
      });

      try {
        const google = await loader.load();
        const mapOptions = {
          center: { lat: 40.7128, lng: -74.006 },
          zoom: 13,
          disableDefaultUI: true,
          zoomControl: true,
        };

        const newMap = new google.maps.Map(mapRef.current!, mapOptions);
        setMap(newMap);
        console.log("Map Object:", newMap);

        const response = await axios.get("http://localhost:3001");
        const restaurants = response.data;

        for (const restaurant of restaurants) {
          const address = restaurant.vicinity;
          const coordinates = await getCoordinates(address);

          if (coordinates) {
            console.log(`Coordinates for ${restaurant.name}:`, coordinates);

            // Get price from price_level
            const price = priceMapping[restaurant.price_level] || "N/A";

            const marker = new google.maps.Marker({
              position: coordinates,
              map: newMap,
              title: `${restaurant.name} - ${price}`,
            });

            marker.addListener("click", () => {
              const restaurantWithPrice = { ...restaurant, price: `${price}` };
              // Call the parent's onRestaurantSelect callback
              onRestaurantSelect(restaurantWithPrice);
              // Optionally, update local state to show RestaurantDetails within Map
              setSelectedRestaurant(restaurantWithPrice);
            });
          } else {
            console.error(`Failed to get coordinates for: ${address}`);
          }
        }
      } catch (error) {
        console.error("Error loading map or fetching restaurants:", error);
      }
    };

    loadMap();
  }, [onRestaurantSelect]);

  return (
    <div className={styles.mapContainer}>
      <div ref={mapRef} className={styles.map} />
      {selectedRestaurant && (
        <RestaurantDetails
          restaurant={selectedRestaurant}
          onClose={() => setSelectedRestaurant(null)}
        />
      )}
    </div>
  );
}
