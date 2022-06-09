import React, {useState, useEffect} from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";

import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import "leaflet-defaulticon-compatibility"

export default function Map({ spots, selectSpot, children }) {
  const [position, setPosition] = useState([
    32.57808830709014, -117.13498505855627,
  ]);

  return (
    <>
      <MapContainer center={position} zoom={4} scrollWheelZoom={false}  >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {spots.map((spot) => (
          <Marker
            key={spot.id ?? spot.name}
            position={spot.coordinates}
            draggable={true} 
            animate={true} 
            eventHandlers={{
              click() {
                selectSpot(spot);
                setPosition(spot.coordinates);
              },
            }}
          />
        ))}
        {children}
      </MapContainer>
    </>
  );
}
