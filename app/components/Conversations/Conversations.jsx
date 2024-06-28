import {useState, useEffect} from "react"
import Conversation from "./Conversation";

import {
    addMapNote,
    deleteMapNote,
    loadPublicNotesInBounds,
  } from "@/app/actions/map-notes/actions";

  
export default function Conversations({ sidebarOpen, map, user, boundsChange, boundButtonClicked,
    mapRef, markersRef, highlightNoteId, setBoundButtonClicked
  }) {
    const [publicNotes, setPublicNotes] = useState([]);
  
    useEffect(() => {
      async function getPublicNotes() {
        console.log("here??", map , !user , boundButtonClicked)
        if (map && !user) {
          console.log("here 2??")
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
          console.log("data", data)
          setPublicNotes(data);
          setBoundButtonClicked(false);
        }
      }
      getPublicNotes();
      // }, [map, user, zoom]);
    }, [map, user, boundsChange, sidebarOpen]);
  
    return (
      <>
        <Conversation
          publicNotes={publicNotes}
          mapRef={mapRef}
          markersRef={markersRef}
          highlightNoteId={highlightNoteId}
        />
      </>
    );
  }