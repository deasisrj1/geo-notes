export default function Conversation({
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
    //setHighlightNoteId
    console.log("note id", id)
    
    const marker = markersRef.current[`${id}`];
    console.log("marker", marker)
    console.log("markersRef", markersRef)

    map.target.flyTo(marker._latlng), 13;
    if (marker) {
      marker.openPopup();
    }
  };

  let publicNotes2 = [...publicNotes, ...publicNotes, ...publicNotes];
  let publicNotes3 = [...publicNotes2, ...publicNotes2, ...publicNotes2];
  console.log("publicNotes", publicNotes)
  return (
    <>
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {publicNotes3.map((note) => (
                <li key={`note-${note.id}`}>
                  <div className="border-t border-gray-200 bg-white px-4 py-5 sm:px-6">
                    <div className="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
                      <div className="ml-4 mt-4 w-3/6">
                        <h3 className="truncate text-base font-semibold leading-6 text-gray-900 overflow-auto">
                          {note.title}
                        </h3>
                        {note.body}
                        <p className="mt-1 text-sm text-gray-500">{note.firstname}</p>
                      </div>
                      <div className="ml-4 mt-4 flex-shrink-0">
                        <button
                          type="button"
                          onClick={() => handleNoteClick(note?.id)}
                          className="relative inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Open
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </nav>
    </>
  );
}
