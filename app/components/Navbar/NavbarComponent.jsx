import { signOut } from "@/app/logout/actions";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

export default async function Navbar() {
  const supabase = createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  return (
    <div className="flex flex-row h-14 justify-between w-full bg-neutral-950 py-4 px-14 items-center">
      <div>
        <Link className="text-neutral-500" key={"home"} href="/">
          <h1>Geo Notes</h1>
        </Link>
      </div>
      <div>
        {user ? (
          <div className="flex flex-row justify-center items-center">
            {/* <p className=" mx-12">hello {user?.user_metadata.firstName}</p> */}
            <form>
              <button formAction={signOut}>Sign Out</button>
            </form>
            <Link key={"user-settings"} href="/user/settings">
              <button className="ml-4 w-10 h-10 bg-neutral-800 rounded-full border-2 border-neutral-700 fill-none text-lg">
                👤
              </button>
            </Link>
          </div>
        ) : (
          <div className="flex flex-row justify-center items-center ">
            <Link className="pl-12" key={"login"} href="/login">
              <p>Login</p>
            </Link>
            <Link className="pl-4" key="signup" href="/signup">
              <p>Sign Up</p>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
