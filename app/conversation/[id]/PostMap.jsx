"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css"; // Important!
import "leaflet-defaulticon-compatibility";

export default function PostMap({lat, long}) {
  const position = [lat, long];
  return (
    <div className="flex justify-center">
      <div className="h-72 w-5/6 ">
        <MapContainer
          center={position}
          zoom={13}
          scrollWheelZoom={false}
          className="rounded z-0 w-full h-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
}
