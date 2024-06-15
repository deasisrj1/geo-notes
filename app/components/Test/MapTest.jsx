"use client";

import { addMapNote, deleteMapNote } from "@/app/actions/map-notes/actions";
import { createClient } from "@/utils/supabase/client";
import dynamic from "next/dynamic";
import { useMemo, useState } from "react";

export default function MapTest({ user, userMapNotes }) {
  const supabase = createClient();
  //   const [userMapNotes, setUserMapNotes] = useState([]);
  const [markerPos, setMarkerPos] = useState([53.5461, -113.4938]);

  const Map = useMemo(
    () => dynamic(() => import("../Map/MapComponent"), { ssr: false }),
    []
  );

  const handleMarkerDragged = (latlong) => {
    setMarkerPos([latlong.lat, latlong.lng]);
  };

  return (
    <div className="w-full flex h-full flex-row">
      <Map markerPos={markerPos} handleMarkerDragged={handleMarkerDragged} />
      <div className="basis-1/3 bg-neutral-950	max-h-[800px]">
        {user ? (
          <form action={addMapNote} className="bg-neutral-950	p-5 h-[400px]">
            {markerPos}
            <div className=" rounded-md shadow-md flex flex-row items-start justify-between">
              <h1 className="w-full block mb-2 text-xl font-medium 	">
                NEW NOTE
              </h1>
              <select
                id="visibility"
                className="bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-25% p-2.5
                dark:bg-neutral-800	 "
              >
                <option defaultValue value="public">
                  Public
                </option>
                <option value="private">Private</option>
              </select>
            </div>
            <input
              type="hidden"
              name="longitude"
              id="longitude"
              value={markerPos[1]}
            />
            <input
              type="hidden"
              name="latitude"
              id="latitude"
              value={markerPos[0]}
            />
            <input type="hidden" name="userId" id="userId" value={user?.id} />
            <label htmlFor="title" className="block mb-2 text-lg font-medium">
              Title:
            </label>
            <input
              id="title"
              name="title"
              type="text"
              placeholder="Title"
              required
              className="block p-2.5 w-full text-md  bg-gray-50 rounded-lg border border-gray-300  focus:ring-blue-500 focus:border-blue-500 dark:bg-neutral-800 dark:border-gray-600 dark:placeholder-gray-300 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <label htmlFor="body" className="block mb-2 text-lg font-medium	 ">
              Your Note:
            </label>
            <textarea
              id="body"
              name="body"
              rows="4"
              className="block p-2.5 w-full text-md bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-neutral-800 dark:border-gray-600 dark:placeholder-gray-300 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Write your thoughts here..."
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 focus:outline-none focus:shadow-outline"
            >
              Add Note
            </button>
          </form>
        ) : (
          <></>
        )}

        <div className=" gap-4 p-4 bg-neutral-950 overflow-y-auto h-full max-h-[400px]">
          <h1 className=" text-xl font-bold text-white mb-4">MY NOTES</h1>
          {userMapNotes?.map((note) => (
            <div
              key={note.id}
              className="relative p-4 bg-gray-700 dark:bg-neutral-800 rounded-md shadow-md flex flex-col items-start justify-between h-min m-2"
            >
              <h1 className="text-xl font-semibold text-white mb-2">
                {note.title}
              </h1>
              <p>{note.body}</p>
              <form action={deleteMapNote}>
                <input
                  type="hidden"
                  name="noteId"
                  id="noteId"
                  value={note.id}
                />
                <button
                  type="submit"
                  className="absolute top-2 right-2 text-gray-400 hover:text-red-500 mr-2"
                >
                  <span className="text-2xl font-bold">&times;</span>
                </button>
              </form>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
