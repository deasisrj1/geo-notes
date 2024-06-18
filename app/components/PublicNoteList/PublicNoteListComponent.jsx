export default function PublicNoteListComponent({
  publicNotes,
  mapRef,
  markersRef,
  highlightNoteId,
}) {
  const handleNoteClick = (id) => {
    // setHighlightNoteId(id);
    const map = mapRef.current;
    if (!map) {
      return;
    }

    const marker = markersRef.current[`${id}`];

    map.target.flyTo(marker._latlng), 13;

    // marker.dragging.enable();
    console.log(marker);
    if (marker) {
      marker.openPopup();
    }
  };
  return (
    <div className="h-svh flex flex-grow flex-col xl:overflow-y-auto lg:overflow-y-auto">
      {`${publicNotes.length} notes`}
      {publicNotes?.map((note) => (
        <div
          onClick={() => handleNoteClick(note?.id)}
          id={`note-${note.id}`}
          key={note.id}
          className={`relative p-4 bg-gray-700 rounded-md shadow-md flex flex-col items-start justify-between h-min m-2 hover:cursor-pointer hover:bg-gray-500 group ${
            highlightNoteId == note?.id
              ? "dark:bg-neutral-400 scroll-auto"
              : "dark:bg-neutral-800"
          }`}
        >
          <h1 className="text-xl font-semibold text-white mb-2">
            {note.title}
          </h1>
          <p>{note.body}</p>
        </div>
      ))}
    </div>
  );
}
