"use client";
import dynamic from "next/dynamic";
import { useState, useRef, useEffect } from "react";
import { NEW_NOTE, MY_NOTES } from "@/app/enums/noteEnums";
import {
  addMapNote,
  deleteMapNote,
  loadPublicNotesInBounds,
} from "@/app/actions/map-notes/actions";

import PublicNotes from "../components/PublicNotes";
import SidebarMobile from "../components/SidebarMobile";
import PublicNoteListComponent from "../components/PublicNoteList/PublicNoteListComponent";
import Footer from "../components/Footer";
import Topnav from "../components/TopNav";
const Map = dynamic(() => import("../components/Map/MapComponent"), {
  ssr: false,
});

import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";

import { XMarkIcon } from "@heroicons/react/24/outline";

function Notes({
  map,
  user,

  boundsChange,
  boundButtonClicked,
  mapRef,
  markersRef,
  highlightNoteId,
  setBoundButtonClicked,
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

        console.log("wtf", data);

        setPublicNotes(data);
        setBoundButtonClicked(false);
      }
    }
    getPublicNotes();
    // }, [map, user, zoom]);
  }, [map, user, boundsChange]);

  return (
    <>
      <PublicNoteListComponent
        publicNotes={publicNotes}
        mapRef={mapRef}
        markersRef={markersRef}
        highlightNoteId={highlightNoteId}
      />
    </>
  );
}
export default function Example({ user = null, userMapNotes = [] }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const markersRef = useRef({});
  const mapRef = useRef(null);
  const [markerPos, setMarkerPos] = useState([53.5461, -113.4938]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [currentTab, setCurrentTab] = useState(NEW_NOTE);
  const [highlightNoteId, setHighlightNoteId] = useState(null);
  const [search, setSearch] = useState("");
  const [map, setMap] = useState(null);
  const [publicNotes, setPublicNotes] = useState([]);
  const [zoom, setZoom] = useState(13);
  const [boundsChange, setBoundsChange] = useState(false);
  const [boundButtonClicked, setBoundButtonClicked] = useState(true);

  const handleMarkerDragged = (latlong) => {
    setMarkerPos([latlong.lat, latlong.lng]);
  };

  const mapProps = {
    markerPos: markerPos,
    handleMarkerDragged: handleMarkerDragged,
    notes: userMapNotes,
    title: title,
    body: body,
    markersRef,
    mapRef,
    setHighlightNoteId: setHighlightNoteId,
    setCurrentTab,
    user,
    setMap,
    publicNotes,
    zoom,
  };

  return (
    <>
      <div className="h-full">
        {/* <Transition show={sidebarOpen}>
          <Dialog className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
            <TransitionChild
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80" />
            </TransitionChild>

            <div className="fixed inset-0 flex">
              <TransitionChild
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <DialogPanel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <TransitionChild
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button
                        type="button"
                        className="-m-2.5 p-2.5"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </TransitionChild>
                  <SidebarMobile>
                    <Notes />
                  </SidebarMobile>
                </DialogPanel>
              </TransitionChild>
            </div>
          </Dialog>
        </Transition> */}

        <PublicNotes>
          <Notes
            map={map}
            user={user}
            boundsChange={boundsChange}
            boundButtonClicked={boundButtonClicked}
            mapRef={mapRef}
            markersRef={markersRef}
            highlightNoteId={highlightNoteId}
            setPublicNotes={setPublicNotes}
            setBoundButtonClicked={setBoundButtonClicked}
          />
        </PublicNotes>

        <div className="h-full lg:pl-72">
          <Topnav setSidebarOpen={setSidebarOpen} />
          <main className="h-full">
            <div className="h-full">
              <Map {...mapProps} />
            </div>
          </main>
        </div>
      </div>

      {/* <Footer setSidebarOpen={setSidebarOpen} /> */}
    </>
  );
}
