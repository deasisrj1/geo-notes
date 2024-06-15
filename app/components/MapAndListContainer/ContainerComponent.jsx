"use client";
import { addMapNote, deleteMapNote } from "@/app/actions/map-notes/actions";
// import { createClient } from "@/utils/supabase/client";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef, useState } from "react";
import { NEW_NOTE, MY_NOTES } from "@/app/enums/noteEnums";
import HeaderComponent from "../NoteListHeader/HeaderComponent";
import UserNoteListComponent from "../UserNoteList/UserNoteListComponent";
import NewNoteComponent from "../AddNewNote/NewNoteComponent";

export default function MapAndListContainerComponent({ user, userMapNotes }) {
  const [markerPos, setMarkerPos] = useState([53.5461, -113.4938]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [currentTab, setCurrentTab] = useState(NEW_NOTE);
  const [highlightNoteId, setHighlightNoteId] = useState(null);

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
        // console.log(targetElement);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth" });
        }
      } catch (e) {
        console.log(e, "container component");
      }
    }
  }, [highlightNoteId]);

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
  };

  return (
    <div className="rounded max-h-screen lg:overflow-y-auto flex-1 w-full flex flex-row py-2 lg:flex-row sm:flex-col md:flex-col xs:flex-col sm:overflow-y-scroll">
      <Map {...mapProps} />

      {user ? (
        <div className=" flex flex-col overflow-y-auto  lg:basis-1/3 md:basis-2/3   bg-neutral-950 ml-2 rounded">
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
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
