import { createClient } from "@/utils/supabase/server";
import MapAndListContainerComponent from "./components/MapAndListContainer/ContainerComponent";
import { loadUserMapNotes } from "./actions/map-notes/actions";

export default async function Home() {
  const supabase = createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
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

    if (mapNotesError && status !== 406) {
      console.error(error);
    }
  }

  return (
    <div className="flex flex-col w-full flex-grow overflow-y-auto">
      <MapAndListContainerComponent user={user} userMapNotes={mapNotes} />
    </div>
  );
}
