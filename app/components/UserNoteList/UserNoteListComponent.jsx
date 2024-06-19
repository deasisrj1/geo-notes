import { deleteMapNote } from "@/app/actions/map-notes/actions";
import { useEffect, useState } from "react";
import EditNoteComponent from "./EditNoteComponent";

export default function UserNoteListComponent({
  markersRef,
  mapRef,
  userMapNotes,
  user,
  highlightNoteId,
  setHighlightNoteId,
}) {
  const [showEdit, setShowEdit] = useState(false);
  const [noteData, setNoteData] = useState({});

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

  useEffect(() => {
    if (showEdit) {
      try {
        const targetElement = document.body.querySelector(`.EDIT-DIV`);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth" });
        }
      } catch (e) {
        console.error(e, "[showEdit] useEffect");
      }
    }
  }, [showEdit]);

  return (
    <>
      {showEdit && (
        <EditNoteComponent
          setShowEdit={setShowEdit}
          user={user}
          noteData={noteData}
          setNoteData={setNoteData}
          setHighlightNoteId={setHighlightNoteId}
          markersRef={markersRef}
        />
      )}
      <div className="h-svh flex flex-grow flex-col xl:overflow-y-auto lg:overflow-y-auto">
        {userMapNotes?.map((note) => (
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
            <form action={deleteMapNote}>
              <input type="hidden" name="noteId" id="noteId" value={note.id} />
              <button
                type="submit"
                className="absolute top-2 right-2 text-gray-400 hover:text-red-500 mr-2 hidden group-hover:pointer-events-auto group-hover:block"
              >
                <span className="text-2xl font-bold">&times;</span>
              </button>
            </form>
            <button
              type=""
              onClick={() => {
                setNoteData((prev) => {
                  if (prev) {
                    const marker = markersRef.current[`${prev.id}`];
                    if (marker) {
                      marker.setPopupContent(
                        `<p>${prev.title}</p><p>${prev.body}</p>`
                      );
                      marker.dragging.disable();
                      marker.setZIndexOffset(1);
                    }
                  }
                  return {
                    id: note.id,
                    title: note.title,
                    body: note.body,
                    visibility: note.visibility,
                  };
                });
                setShowEdit(true);
                if (showEdit) {
                  try {
                    const targetElement =
                      document.body.querySelector(`.EDIT-DIV`);
                    if (targetElement) {
                      targetElement.scrollIntoView({ behavior: "smooth" });
                    }
                  } catch (e) {
                    console.error(e, "user note list");
                  }
                }
              }}
              className="absolute top-2 right-10 text-gray-400 hover:text-yellow-500 mr-2 group-hover:pointer-events-auto hidden group-hover:block"
            >
              <span className="text-2xl font-bold">✎</span>
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
