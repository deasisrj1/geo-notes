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

  const {
    data: mapNotes,
    error: mapNotesError,
    status,
  } = await supabase.rpc("get_all_user_notes", {
    user_id: user?.id,
  });

  // console.log(mapNotes);

  // get_all_user_notes

  // TABLE(lat double precision, long double precision, title text, body text, id integer)
  //   select
  //   st_y(location :: geometry) as lat,
  //   st_x(location :: geometry) as long,
  //   title,
  //   body,
  //   id
  // from public.map_notes
  // where public.map_notes.user_id = user_id

  if (mapNotesError && status !== 406) {
    console.error(error);
  }

  return (
    <div className="flex flex-col w-full flex-grow overflow-y-auto px-14">
      <MapAndListContainerComponent user={user} userMapNotes={mapNotes} />
    </div>
  );
}

// create table if not exists public.map_notes (
//     id int generated by default as identity primary key,
//     auth_id uuid,
//     title text not null,
//     body text,
//     location geography(POINT) not null,
//     created_at,
//     update_at

// )

// insert into public.map_notes(name, location)
// values
// ("example name", st_point(123, 123))

// await supabase.from('map_notes').insert([
//     {
//         name: 'example name',
//         location: 'POINT(-lat, long)'
//     },
//     {
//         name: 'example name',
//         location: 'POINT(-123, 1231)'
//     }
// ])
