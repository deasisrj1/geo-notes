"use client";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css"; // Important!
import "leaflet-defaulticon-compatibility";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";

import { MY_NOTES, NEW_NOTE } from "@/app/enums/noteEnums";
import L, { popup } from "leaflet";

export default function MapComponent({
  markerPos,
  handleMarkerDragged,
  title,
  body,
  markersRef,
  mapRef,
  setHighlightNoteId,
  setCurrentTab,
  currentTab,
  user,
  setMap,
  zoom,
  mapNotes,
}) {
  const [marker, setMarker] = useState(null);

  const icon = L.divIcon({
    className: "custom-marker-icon",
    html: `
      <div style="
        width: 24px; 
        height: 24px;
        border: 2px dotted black; 
        border-radius: 50%;
        display: flex; 
        align-items: center;
        justify-content: center;
        border-bottom-right-radius: 0;
      ">
        <div style="width: 18px; height: 18px; background-color: ${"springgreen"}; border-radius: 50%; border-bottom-right-radius: 0;"></div>
      </div>`,
    iconSize: [20, 20],
    iconAnchor: [20, 20], // Adjust for icon type
  });

  useEffect(() => {
    if (marker) {
      marker.openPopup();
    }
  }, [marker]);

  return (
    <MapContainer
      className="rounded z-0"
      center={markerPos}
      zoom={zoom}
      scrollWheelZoom={true}
      style={{ width: "100%", height: "100%" }}
      whenReady={(map) => {
        setMap(map);
        mapRef.current = map;
      }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {mapNotes?.map((note) => (
        <Marker
          eventHandlers={{
            click: (m) => {
              if (currentTab === NEW_NOTE) setCurrentTab(MY_NOTES);
              setHighlightNoteId(note?.id);
            },
            popupclose: () => {
              setHighlightNoteId(null);
            },
            popupopen: () => {
              setHighlightNoteId(note?.id);
            },
            dragstart: (m) => {
              m.sourceTarget.closePopup();
              setHighlightNoteId(note?.id);
            },
          }}
          style={{ zIndex: 0 }}
          key={note.id}
          position={[note.lat, note.long]}
          ref={(marker) => (markersRef.current[note.id] = marker)}
          icon={icon}
        >
          <Popup>
            <h1 className="font-bold text-sm">{note.title}</h1>
            <p>{note.body}</p>
          </Popup>
        </Marker>
      ))}

      <Marker
        style={{ zIndex: 10 }}
        position={markerPos}
        draggable={true}
        activeMarker
        ref={(m) => {
          setMarker(m);
        }}
        eventHandlers={{
          click: () => {
            setCurrentTab(NEW_NOTE);
          },

          moveend: (e) => {
            setCurrentTab(NEW_NOTE);
            handleMarkerDragged(e.sourceTarget._latlng);
            e.sourceTarget.openPopup();
          },
        }}
      >
        <Popup className="text-xs">
          <h1 className="font-bold text-sm">
            {title || (user && "Add A Title") || "Welcome"}
          </h1>
          <p>
            {body ||
              (user && "Create a new note, drag the marker") ||
              "Login to create a new note, drag the marker"}
          </p>
        </Popup>
      </Marker>
    </MapContainer>
  );
}

// 53.585168439492456 - 113.42697143554689;
