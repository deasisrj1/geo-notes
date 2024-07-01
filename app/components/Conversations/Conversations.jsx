import Conversation from "./Conversation";

export default function Conversations({
  publicNotes,
  mapRef,
  markersRef,
  highlightNoteId,
}) {
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
