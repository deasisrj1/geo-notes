"use client";
import {
  addMapNote,
  deleteMapNote,
  loadPublicNotesInBounds,
} from "@/app/actions/map-notes/actions";
// import { createClient } from "@/utils/supabase/client";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef, useState } from "react";
import { NEW_NOTE, MY_NOTES } from "@/app/enums/noteEnums";
import HeaderComponent from "../NoteListHeader/HeaderComponent";
import UserNoteListComponent from "../UserNoteList/UserNoteListComponent";
import NewNoteComponent from "../AddNewNote/NewNoteComponent";
import PublicNoteListComponent from "../PublicNoteList/PublicNoteListComponent";

export default function MapAndListContainerComponent({ user, userMapNotes }) {
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

        setPublicNotes(data);
        setBoundButtonClicked(false);
      }
    }
    getPublicNotes();
    // }, [map, user, zoom]);
  }, [map, user, boundsChange]);

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
    <div className="rounded max-h-screen lg:overflow-y-auto flex-1 w-full flex flex-row py-2 lg:flex-row sm:flex-col md:flex-col xs:flex-col sm:overflow-y-scroll">
      <div className="relative flex flex-col w-full">
        <Map {...mapProps} />
        {boundsChange && !user && (
          <div className="absolute text-xs mt-4 left-0 right-0 grid place-items-center text-black z-9999">
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
      <div className=" flex flex-col overflow-y-auto  lg:basis-1/3 md:basis-2/3   bg-neutral-950 ml-2 rounded">
        <div className="flex block border-b-2 border-neutral-900 w-full">
          {/* <input type="hidden" name="userId" id="userId" value={user?.id} /> */}
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
        {user ? (
          // <div className=" flex flex-col overflow-y-auto  lg:basis-1/3 md:basis-2/3   bg-neutral-950 ml-2 rounded">
          <>
            <HeaderComponent
              currentTab={currentTab}
              setCurrentTab={setCurrentTab}
              user={user}
            />

            {currentTab === NEW_NOTE ? (
              <NewNoteComponent {...newNoteProps} />
            ) : (
              <UserNoteListComponent
                markersRef={markersRef}
                mapRef={mapRef}
                userMapNotes={userMapNotes}
                user={user}
                highlightNoteId={highlightNoteId}
                setHighlightNoteId={setHighlightNoteId}
              />
            )}
            {/* </div> */}
          </>
        ) : (
          <>
            <PublicNoteListComponent
              publicNotes={publicNotes}
              mapRef={mapRef}
              markersRef={markersRef}
              highlightNoteId={highlightNoteId}
            />
          </>
        )}
      </div>
    </div>
  );
}
