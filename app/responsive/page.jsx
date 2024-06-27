"use client";
import dynamic from "next/dynamic";
import { useState, useRef, useEffect } from "react";
import { NEW_NOTE, MY_NOTES } from "@/app/enums/noteEnums";
import {
  addMapNote,
  deleteMapNote,
  loadPublicNotesInBounds,
} from "@/app/actions/map-notes/actions";

import ConversationDrawer from "../components/Drawers/ConversationsDrawer";
import Conversations from "../components/Conversations/Conversations";
import SidebarMobile from "../components/Drawers/SidebarMobile";
import PublicNoteListComponent from "../components/PublicNoteList/PublicNoteListComponent";
import Footer from "../components/Footer";
import Topnav from "../components/TopNav";
const Map = dynamic(() => import("../components/Map/MapComponent"), {
  ssr: false,
});

import MobileDrawer from "../components/Drawers/MobileDrawer";

function Notes({
  map,
  user,
  boundsChange,
  boundButtonClicked,
  mapRef,
  markersRef,
  highlightNoteId,
  setBoundButtonClicked,
}) {
  const [publicNotes, setPublicNotes] = useState([]);

  useEffect(() => {
    async function getPublicNotes() {
      if (map && !user && boundButtonClicked) {
        const bounds = map.target.getBounds();
        const maxLong = bounds.getEast();
        const minLong = bounds.getWest();
        const maxLat = bounds.getNorth();
        const minLat = bounds.getSouth();

        const data = await loadPublicNotesInBounds({
          minLat,
          minLong,
          maxLat,
          maxLong,
        });

        console.log("wtf", data);

        setPublicNotes(data);
        setBoundButtonClicked(false);
      }
    }
    getPublicNotes();
    // }, [map, user, zoom]);
  }, [map, user, boundsChange]);

  return (
    <>
      <PublicNoteListComponent
        publicNotes={publicNotes}
        mapRef={mapRef}
        markersRef={markersRef}
        highlightNoteId={highlightNoteId}
      />
    </>
  );
}
export default function Example({ user = null, userMapNotes = [] }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const markersRef = useRef({});
  const mapRef = useRef(null);
  const [markerPos, setMarkerPos] = useState([53.5461, -113.4938]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [currentTab, setCurrentTab] = useState(NEW_NOTE);
  const [highlightNoteId, setHighlightNoteId] = useState(null);
  const [search, setSearch] = useState("");
  const [map, setMap] = useState(null);
  const [publicNotes, setPublicNotes] = useState([]);
  const [zoom, setZoom] = useState(13);
  const [boundsChange, setBoundsChange] = useState(false);
  const [boundButtonClicked, setBoundButtonClicked] = useState(true);

  const handleMarkerDragged = (latlong) => {
    setMarkerPos([latlong.lat, latlong.lng]);
  };

  const mapProps = {
    markerPos: markerPos,
    handleMarkerDragged: handleMarkerDragged,
    notes: userMapNotes,
    title: title,
    body: body,
    markersRef,
    mapRef,
    setHighlightNoteId: setHighlightNoteId,
    setCurrentTab,
    user,
    setMap,
    publicNotes,
    zoom,
  };

  return (
    <>
      <div className="h-full">
        <MobileDrawer sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}>
          <Conversations
              map={map}
              user={user}
              boundsChange={boundsChange}
              boundButtonClicked={boundButtonClicked}
              mapRef={mapRef}
              markersRef={markersRef}
              highlightNoteId={highlightNoteId}
              setPublicNotes={setPublicNotes}
              setBoundButtonClicked={setBoundButtonClicked}
            />
        </MobileDrawer>

        <ConversationDrawer>
          <Conversations
            map={map}
            user={user}
            boundsChange={boundsChange}
            boundButtonClicked={boundButtonClicked}
            mapRef={mapRef}
            markersRef={markersRef}
            highlightNoteId={highlightNoteId}
            setPublicNotes={setPublicNotes}
            setBoundButtonClicked={setBoundButtonClicked}
          />
        </ConversationDrawer>

        <div className="h-full lg:pl-72">
          <Topnav setSidebarOpen={setSidebarOpen}/>
          <main className="h-full">
            <div className="h-full">
              <Map {...mapProps} />
            </div>
          </main>
        </div>
      </div>

      <Footer setSidebarOpen={setSidebarOpen} />
    </>
  );
}
