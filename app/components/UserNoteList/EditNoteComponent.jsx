import { updateUserMapNotes } from "@/app/actions/map-notes/actions";
import { useEffect, useState } from "react";

// TODO: when edit is save setNoteData({})
export default function EditNoteComponent({
  setShowEdit,
  user,
  noteData,
  setNoteData,
  setHighlightNoteId,
  markersRef,
}) {
  const [editTitle, setEditTitle] = useState(noteData.title);
  const [editBody, setEditBody] = useState(noteData.body);
  const [editVisibility, setEditVisibility] = useState(noteData.visibility);

  const marker = markersRef.current[`${noteData.id}`];
  const [editMarkerPos, setEditMarkerPos] = useState([
    marker?._latlng.lat,
    marker?._latlng.lng,
  ]);

  useEffect(() => {
    setEditBody(noteData.body);
    setEditTitle(noteData.title);
    setEditVisibility(noteData.visibility);
    if (marker) {
      marker.setZIndexOffset(100);
      marker.dragging.enable();
      marker.on("moveend", (m) => {
        const { lat, lng } = m.sourceTarget._latlng;
        setEditMarkerPos([lat, lng]);
        marker.openPopup();
      });
    }
  }, [noteData]);

  useEffect(() => {
    // TODO: move editTitle and editBody to UserNoteListComponent and give it the the map component to show live text editing instead
    // setPopup since it creates memory leak
    // console.log(marker);
    // if (marker) {
    //   marker.setPopupContent(`${editTitle} ${editBody} `);
    //   // marker.setPopupContent(`<p>${editTitle}</p><p>${editBody}</p>`);
    // }
  }, [editBody, editTitle]);
  return (
    <div className="EDIT-DIV flex flex-col  full bg-neutral-900 mx-2 rounded  sm:basis-1/3 md:basis-2/3 lg:basis-2/3">
      <div className=" flex flex-row p-4 rounded-t-lg bg-neutral-900 border-b-2 border-neutral-700">
        <div className="container flex items-center justify-between ">
          <div className={`p-2 w-full text-lg text-white rounded-lg `}>
            Edit Note
          </div>

          <button
            onClick={() => {
              // if (marker) {
              //   marker.setPopupContent(
              //     `<p>${noteData.title}</p><p>${noteData.body}</p>`
              //   );
              // }
              if (marker) {
                // marker.setPopupContent(`a`);
                marker.dragging.disable();
              }

              setShowEdit(false);
              setHighlightNoteId(null);
            }}
            className=" text-gray-400 hover:text-red-500 mr-2 "
          >
            <span className="text-2xl font-bold">&times;</span>
          </button>
        </div>
      </div>
      <form
        action={updateUserMapNotes}
        onSubmit={() => {
          marker.dragging.disable();
          marker.openPopup();
          // marker.setLatLng(editMarkerPos);
          // marker.off();
          setShowEdit(false);
          // setHighlightNoteId(null);
          setEditMarkerPos([]);
          setNoteData({});
        }}
        className="bg-neutral-900	px-5 overflow-y-auto rounded-lg gap-2 flex flex-col mt-2"
      >
        <input
          type="hidden"
          name="longitude"
          id="longitude"
          value={editMarkerPos[1]}
        />
        <input
          type="hidden"
          name="latitude"
          id="latitude"
          value={editMarkerPos[0]}
        />
        <input type="hidden" name="userId" id="userId" value={user?.id} />
        <input type="hidden" name="noteId" id="noteId" value={noteData?.id} />
        {/* <label htmlFor="title" className="block py-2 text-lg font-medium">
          Title:
        </label> */}
        <input
          id="title"
          name="title"
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          placeholder="Title"
          required
          className="block p-2.5 w-full text-md  bg-gray-50 rounded-lg border border-gray-300  focus:ring-blue-500 focus:border-blue-500 dark:bg-neutral-800 dark:border-gray-600 dark:placeholder-gray-300 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        {/* <label htmlFor="body" className="block py-2 text-lg font-medium	 ">
          Your Note:
        </label> */}
        <textarea
          id="body"
          name="body"
          rows="4"
          value={editBody}
          onChange={(e) => setEditBody(e.target.value)}
          className="block p-2.5 w-full text-md bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-neutral-800 dark:border-gray-600 dark:placeholder-gray-300 dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Write your thoughts here..."
        />
        <div className=" rounded-md flex flex-col items-start justify-between">
          {/* <label
            htmlFor="visibility"
            className="block py-2 text-lg font-medium	 "
          >
            Visibility:
          </label> */}
          <select
            value={editVisibility}
            onChange={(e) => setEditVisibility(e.target.value)}
            id="visibility"
            name="visibility"
            // className="bg-gray-50 border border-gray-300  text-lg rounded focus:ring-blue-500 focus:border-blue-500 blockdark:bg-neutral-800	py-2 px-4 mt-4 "
            className=" bg-neutral-800 text-md rounded border-r-8  border-transparent  py-2 px-2 outline outline-neutral-700 dark:bg-neutral-800 focus:ring-blue-500 w-full cursor-pointer"
          >
            <option value="PUBLIC">Public</option>
            <option value="PRIVATE">Private</option>
          </select>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded my-4 focus:outline-none focus:shadow-outline w-full text-center"
          >
            Save Edit
          </button>
        </div>
      </form>
    </div>
  );
}
