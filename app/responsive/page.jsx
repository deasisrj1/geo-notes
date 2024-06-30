"use client";
import dynamic from "next/dynamic";
import { useState, useRef, useMemo, useEffect } from "react";
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
// const Map = dynamic(() => import("../components/Map/MapComponent"), {
//   ssr: false,
// });

import MobileDrawer from "../components/Drawers/MobileDrawer";

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
  const [mapNotes, setMapNotes] = useState(userMapNotes || []);

  const handleMarkerDragged = (latlong) => {
    setMarkerPos([latlong.lat, latlong.lng]);
  };

  // const Map = dynamic(() => import("../components/Map/MapComponent"), {

  const Map = useMemo(
    () => dynamic(() => import("../components/Map/MapComponent"), { ssr: false }),
    []
  );


  useEffect(() => {
    if (map) {
      map.target.on("zoomend", (m) => {
        setBoundsChange(true);
      });
      map.target.on("moveend", (m) => {
        setBoundsChange(true);
      });
    }
  }, [map]);
  


  useEffect(() => {
    async function getPublicNotes() {
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
      setMapNotes(data);
      setBoundButtonClicked(false);
      setPublicNotes(data)
      console.log("getPublicNotes", data);

    }
    
    if (map) {
    // if (map && !user && boundButtonClicked) {
      setMapNotes([]);
      // setCurrentTab(PUBLIC_NOTES);
      getPublicNotes();
    } else if (boundButtonClicked && user && currentTab === PUBLIC_NOTES) {
      setMapNotes([]);
      getPublicNotes();
    } else if (user && currentTab !== PUBLIC_NOTES) {
      setBoundButtonClicked(true);
      setMapNotes(userMapNotes);
    }
    // }, [map, user, zoom]);
  }, [map, user, boundsChange, currentTab, sidebarOpen]);


  const mapProps = {
    markerPos: markerPos,
    handleMarkerDragged: handleMarkerDragged,
    title: title,
    body: body,
    markersRef,
    mapRef,
    setHighlightNoteId: setHighlightNoteId,
    setCurrentTab,
    currentTab,
    user,
    setMap,
    zoom,
    mapNotes,
  };

  console.log("page smarkersRef", markersRef)

  const getConversations = () => {
    return (
      <Conversations
          sidebarOpen={sidebarOpen}
              map={map}
              user={user}
              boundsChange={boundsChange}
              boundButtonClicked={boundButtonClicked}
              mapRef={mapRef}
              markersRef={markersRef}
              highlightNoteId={highlightNoteId}
              setPublicNotes={setPublicNotes}
              setBoundButtonClicked={setBoundButtonClicked}
              publicNotes={publicNotes}
            />
    )
  }
  return (
    <>
      <div className="h-full">
        <MobileDrawer sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}>
        <Conversations
          sidebarOpen={sidebarOpen}
              map={map}
              user={user}
              boundsChange={boundsChange}
              boundButtonClicked={boundButtonClicked}
              mapRef={mapRef}
              markersRef={markersRef}
              highlightNoteId={highlightNoteId}
              setPublicNotes={setPublicNotes}
              setBoundButtonClicked={setBoundButtonClicked}
              publicNotes={publicNotes}
            />        </MobileDrawer>

        <ConversationDrawer>
          {getConversations()}
        </ConversationDrawer>

        <div className="h-full lg:pl-72">
          {/* <Topnav setSidebarOpen={setSidebarOpen}/> */}
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
