export default function PublicNoteListComponent({
  publicNotes,
  mapRef,
  markersRef,
  highlightNoteId,
}) {
  const handleNoteClick = (id) => {
    const map = mapRef.current;
    if (!map) {
      return;
    }
    const marker = markersRef.current[`${id}`];
    map.target.flyTo(marker._latlng), 13;
    if (marker) {
      marker.openPopup();
    }
  };

  return (
    <>
      {`${publicNotes?.length} notes`}
      <div className="h-svh flex flex-grow flex-col xl:overflow-y-auto lg:overflow-y-auto">
        {publicNotes?.map((note) => (
          <div
            onClick={() => handleNoteClick(note?.id)}
            id={`note-${note.id}`}
            key={note.id}
            className={`relative py-2 bg-gray-700 rounded-md shadow-md flex flex-col items-start justify-between h-min m-2 hover:cursor-pointer hover:bg-gray-500 group ${
              highlightNoteId == note?.id
                ? "dark:bg-neutral-400 scroll-auto"
                : "dark:bg-neutral-800"
            }`}
          >
            <p className="px-4 py-1 border-b border-neutral-950 w-full flex text-sm">
              {note.firstname}
            </p>
            <h1 className="px-4 pt-2 text-xl font-semibold text-white mb-4">
              {note.title}
            </h1>
            <p className="px-4 ">{note.body}</p>
          </div>
        ))}
      </div>
    </>
  );
}
