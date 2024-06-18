import { createClient } from "@/utils/supabase/server";
import MapAndListContainerComponent from "./components/MapAndListContainer/ContainerComponent";
import { loadUserMapNotes } from "./actions/map-notes/actions";

export default async function Home() {
  const supabase = createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  // const { data, error } = await supabase.auth.getUser();
  // if (error || !data?.user) {
  // redirect("/");
  // }

  let mapNotes;
  if (user) {
    const {
      data,
      error: mapNotesError,
      status,
    } = await supabase.rpc("get_all_user_notes", {
      user_id: user?.id,
    });

    mapNotes = data;

    // console.log(mapNotes, "MAP");

    if (mapNotesError && status !== 406) {
      console.error(error);
    }
  }

  // async function getPublicMapNotes (bounds) {
  //   const {
  //     data,
  //     error: e,
  //     status: s,
  //   } = await supabase.rpc("get_public_notes_in_bounds", {
  //     min_lat: 53.5132658454116,
  //     min_long: -113.52739334106447,
  //     max_lat: 53.578951907534005,
  //     max_long: -113.46027374267578,
  //   });

  //   console.log(data, "ASDASD");
  //   return data;
  // }

  return (
    <div className="flex flex-col w-full flex-grow overflow-y-auto px-14">
      <MapAndListContainerComponent user={user} userMapNotes={mapNotes} />
    </div>
  );
}
