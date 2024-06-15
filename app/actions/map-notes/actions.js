"use server";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function addMapNote(formData) {
  const supabase = createClient();

  console.log(formData);
  const mapNotes = {
    user_id: formData.get("userId"),
    title: formData.get("title"),
    body: formData.get("body"),
    location: `POINT(${formData.get("longitude")} ${formData.get("latitude")})`,
    visibility: formData.get("visibility"),
  };

  console.log(mapNotes);
  const insertResponse = await supabase.from("map_notes").insert([mapNotes]);

  if (insertResponse.error) {
    console.error("Error inserting data in addMapNote", insertResponse.error);
    return;
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function deleteMapNote(formData) {
  const noteId = formData.get("noteId");
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const response = await supabase
    .from("map_notes")
    .delete()
    .match({ id: noteId, user_id: user.id })
    .select();

  revalidatePath("/", "layout");
  redirect("/");
}

export async function loadUserMapNotes(userId) {
  const supabase = createClient();

  //   create
  // or replace function get_all_user_notes(user_id uuid)
  // returns table (
  //   lat float,
  //   long float,
  //   title text,
  //   body text,
  //   id integer,
  //   visibility text
  // ) language sql as $$
  // select
  //   st_y(location :: geometry) as lat,
  //   st_x(location :: geometry) as long,
  //   title,
  //   body,
  //   id,
  //   visibility
  // from public.map_notes
  // where public.map_notes.user_id = user_id
  // $$;

  try {
    const { data, error, status } = await supabase.rpc("get_all_user_notes", {
      user_id: userId,
    });

    if (error && status !== 406) {
      throw error;
    }

    revalidatePath("/", "layout");
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function updateUserMapNotes(formData) {
  const supabase = createClient();

  const mapNotes = {
    title: formData.get("title"),
    body: formData.get("body"),
    location: `POINT(${formData.get("longitude")} ${formData.get("latitude")})`,
    visibility: formData.get("visibility"),
    updated_at: new Date().toISOString().toLocaleString("en-CA"),
  };
  const noteId = formData.get("noteId");
  const userId = formData.get("userId");

  const updateResponse = await supabase
    .from("map_notes")
    .update(mapNotes)
    .match({ id: noteId, user_id: userId });

  revalidatePath("/", "layout");
  redirect("/");
}
