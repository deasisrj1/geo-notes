"use server";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getUserInfo() {
  const supabase = createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  // if (error || !data?.user) {
  // redirect("/");
  // }

  if (!user) {
    redirect("/login");
  }
  //   revalidatePath("/", "layout");
  return user;
  //   redirect("/");
}

export async function updateUserInfo(formData) {
  const firstName = formData.get("firstname");
  const lastName = formData.get("lastname");
  const email = formData.get("email");

  const supabase = createClient();

  // supabase.auth.updateUser  will print out warning in console
  // Using the user object as returned from supabase.auth.getSession() or from some supabase.auth.onAuthStateChange() events could be insecure! This value comes directly from the storage medium (usually cookies on the server) and many not be authentic. Use supabase.auth.getUser() instead which authenticates the data by contacting the Supabase Auth server.
  //
  //   Open issue in supabase
  // https://github.com/supabase/auth-js/issues/873
  //   will need double email confirmation if email is changed
  // can change in config.toml search for double confi... set to = false for new email conf.. only

  const { error } = await supabase.auth.updateUser({
    email: email,
    data: { firstName: firstName, lastName: lastName },
  });
  console.log("36 actions/user/actions.js", error);

  revalidatePath("/user/settings", "layout");
  return;
}
