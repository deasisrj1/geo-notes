import { addMapNote } from "@/app/actions/map-notes/actions";

export default function NewNoteComponent({
  title,
  body,
  setTitle,
  setBody,
  user,
  markerPos,
}) {
  return (
    <div className="">
      {user ? (
        <form
          action={addMapNote}
          onSubmit={() => {
            setBody("");
            setTitle("");
          }}
          className="bg-neutral-950	p-2"
        >
          {markerPos}
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
          <label htmlFor="title" className=" py-2 block text-lg font-medium">
            Title:
          </label>
          <input
            id="title"
            name="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            required
            className="block p-2.5 w-full text-md  bg-gray-50 rounded-lg border border-gray-300  focus:ring-blue-500 focus:border-blue-500 dark:bg-neutral-800 dark:border-gray-600 dark:placeholder-gray-300 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <label htmlFor="body" className="block py-2 text-lg font-medium	 ">
            Your Note:
          </label>
          <textarea
            id="body"
            name="body"
            rows="4"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="block p-2.5 w-full text-md bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-neutral-800 dark:border-gray-600 dark:placeholder-gray-300 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Write your thoughts here..."
          />
          <div className=" rounded-md flex flex-col items-start justify-between">
            <label
              htmlFor="visibility"
              className="block py-2 text-lg font-medium	 "
            >
              Visibility:
            </label>
            <select
              id="visibility"
              name="visibility"
              className="bg-neutral-800 text-md rounded border-r-8  border-transparent  py-2 px-2 mt-1 outline outline-neutral-700 dark:bg-neutral-800 focus:ring-blue-500 w-full cursor-pointer"
            >
              <option defaultValue value="PUBLIC">
                Public
              </option>
              <option value="PRIVATE">Private</option>
            </select>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 focus:outline-none focus:shadow-outline w-full text-center"
            >
              Add Note
            </button>
          </div>
        </form>
      ) : (
        <></>
      )}
    </div>
  );
}
