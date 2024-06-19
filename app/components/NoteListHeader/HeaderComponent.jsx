import { NEW_NOTE, MY_NOTES, PUBLIC_NOTES } from "@/app/enums/noteEnums";

export default function HeaderComponent({ currentTab, setCurrentTab, user }) {
  return (
    <nav className="flex flex-row p-4 bg-neutral-950 ">
      <div className="container flex items-center justify-between overflow-x-auto ">
        <ul className="flex space-x-2">
          {user ? (
            <>
              <li>
                <button
                  onClick={() => setCurrentTab(NEW_NOTE)}
                  className={`text-nowrap p-4 w-full text-white hover:text-gray-300 rounded-lg ${
                    currentTab == NEW_NOTE ? "bg-neutral-800" : ""
                  }`}
                >
                  New Note
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentTab(MY_NOTES)}
                  className={`text-nowrap p-4 w-full text-white hover:text-gray-300 rounded-lg ${
                    currentTab == MY_NOTES ? "bg-neutral-800" : ""
                  }`}
                >
                  My Notes
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentTab(PUBLIC_NOTES)}
                  className={`text-nowrap p-4 w-full text-white hover:text-gray-300 rounded-lg ${
                    currentTab == PUBLIC_NOTES ? "bg-neutral-800" : ""
                  }`}
                >
                  Public Notes
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <button
                  onClick={() => setCurrentTab(PUBLIC_NOTES)}
                  className={`text-nowrap p-4 w-full text-white hover:text-gray-300 rounded-lg ${
                    currentTab == PUBLIC_NOTES ? "bg-neutral-800" : ""
                  }`}
                >
                  Public Notes
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
