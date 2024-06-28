"use client";
import { loadPublicNotesInBounds } from "@/app/actions/map-notes/actions";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef, useState } from "react";
import { NEW_NOTE, MY_NOTES, PUBLIC_NOTES } from "@/app/enums/noteEnums";
import HeaderComponent from "../NoteListHeader/HeaderComponent";
import UserNoteListComponent from "../UserNoteList/UserNoteListComponent";
import NewNoteComponent from "../AddNewNote/NewNoteComponent";
import PublicNoteListComponent from "../PublicNoteList/PublicNoteListComponent";
import SidebarComponent from "../Sidebar/SidebarComponent";

export default function MapAndListContainerComponent({ user, userMapNotes }) {
  const [markerPos, setMarkerPos] = useState([53.5461, -113.4938]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [currentTab, setCurrentTab] = useState(NEW_NOTE);
  const [highlightNoteId, setHighlightNoteId] = useState(null);
  const [search, setSearch] = useState("");
  const [map, setMap] = useState(null);
  const [zoom, setZoom] = useState(13);
  const [boundsChange, setBoundsChange] = useState(false);
  const [boundButtonClicked, setBoundButtonClicked] = useState(true);
  // const [mapNotes, setMapNotes] = useState(userMapNotes || []);
  const [mapNotes, setMapNotes] = useState([]);

  const markersRef = useRef({});
  const mapRef = useRef(null);

  const Map = useMemo(
    () => dynamic(() => import("../Map/MapComponent"), { ssr: false }),
    []
  );

  const handleMarkerDragged = (latlong) => {
    setMarkerPos([latlong.lat, latlong.lng]);
  };

  useEffect(() => {
    if (highlightNoteId) {
      try {
        const targetElement = document.body.querySelector(
          `[id*="note-${highlightNoteId}"]`
        );
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth" });
        }
      } catch (e) {
        console.error(e, "container component");
      }
    }
  }, [highlightNoteId]);

  useEffect(() => {
    console.log("HERE");
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
    }
    if (map && !user && boundButtonClicked) {
      // setMapNotes([]);
      setCurrentTab(PUBLIC_NOTES);
      getPublicNotes();
    } else if (boundButtonClicked && user && currentTab === PUBLIC_NOTES) {
      // setMapNotes([]);
      getPublicNotes();
    } else if (user && currentTab !== PUBLIC_NOTES) {
      setBoundButtonClicked(true);
      setMapNotes(userMapNotes);
    }
    // }, [map, user, zoom]);
  }, [map, user, boundsChange, currentTab]);

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

  const newNoteProps = {
    title: title,
    body: body,
    setTitle: setTitle,
    setBody: setBody,
    user,
    markerPos,
  };

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

  return (
    <div className="rounded max-h-screen lg:overflow-y-auto overflow-y-auto flex-1 w-full flex flex-row lg:flex-row sm:flex-col md:flex-col xs:flex-col sm:overflow-y-scroll">
      <SidebarComponent setCurrentTab={setCurrentTab}>
        <PublicNoteListComponent
          publicNotes={mapNotes}
          mapRef={mapRef}
          markersRef={markersRef}
          highlightNoteId={highlightNoteId}
          name="Public Notes"
        />
        <UserNoteListComponent
          name="My Notes"
          markersRef={markersRef}
          mapRef={mapRef}
          userMapNotes={userMapNotes}
          user={user}
          highlightNoteId={highlightNoteId}
          setHighlightNoteId={setHighlightNoteId}
        />
      </SidebarComponent>
      <div className="relative flex flex-col w-full h-full  border border-neutral-900 rounded">
        <Map {...mapProps} />
        {boundsChange && currentTab === PUBLIC_NOTES && (
          <div className="absolute text-xs mt-4 left-0 right-0 grid place-items-center text-black z-999">
            <button
              onClick={() => {
                const marker = markersRef.current[`${highlightNoteId}`];
                if (marker) {
                  marker.closePopup();
                  setHighlightNoteId(null);
                }
                setBoundButtonClicked(true);
                setBoundsChange(false);
              }}
              className="font-bold rounded-full p-2 bg-white w-1/8 shadow-inner shadow-md border"
            >
              🔍 Get notes in area
            </button>
          </div>
        )}
      </div>
      {/* <div className=" flex flex-col overflow-y-auto  lg:basis-1/3 md:basis-2/3   bg-neutral-950 ml-2 rounded border border-neutral-900">
        <div className="flex block border-b-2 border-neutral-900 w-full">
          //// <input type="hidden" name="userId" id="userId" value={user?.id} /> 
          <label
            htmlFor="search"
            className=" py-2 block text-lg font-medium"
          ></label>
          <input
            id="search"
            name="search"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
            required
            className="block m-4 p-2.5 w-full text-md  bg-gray-50 rounded-full border border-gray-300  focus:ring-blue-500 focus:border-blue-500 dark:bg-neutral-800 dark:border-gray-600 dark:placeholder-gray-300 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <HeaderComponent
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          user={user}
        />
        {user && currentTab === NEW_NOTE && (
          <NewNoteComponent {...newNoteProps} />
        )}

        {user && currentTab === MY_NOTES && (
          <UserNoteListComponent
            markersRef={markersRef}
            mapRef={mapRef}
            userMapNotes={userMapNotes}
            user={user}
            highlightNoteId={highlightNoteId}
            setHighlightNoteId={setHighlightNoteId}
          />
        )}

        {currentTab === PUBLIC_NOTES && (
          <PublicNoteListComponent
            publicNotes={mapNotes}
            mapRef={mapRef}
            markersRef={markersRef}
            highlightNoteId={highlightNoteId}
          />
        )}
      </div> */}
    </div>
  );
}
