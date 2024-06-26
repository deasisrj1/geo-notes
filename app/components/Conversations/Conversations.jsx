import {useState, useEffect} from "react"
import Conversation from "./Conversation";

import {
    addMapNote,
    deleteMapNote,
    loadPublicNotesInBounds,
  } from "@/app/actions/map-notes/actions";

  
export default function Notes({ map, user, boundsChange, boundButtonClicked,
    mapRef, markersRef, highlightNoteId, setBoundButtonClicked
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
          setPublicNotes(data);
          setBoundButtonClicked(false);
        }
      }
      getPublicNotes();
      // }, [map, user, zoom]);
    }, [map, user, boundsChange]);
  
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