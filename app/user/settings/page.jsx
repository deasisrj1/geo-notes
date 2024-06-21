"use client";

import { getUserInfo, updateUserInfo } from "@/app/actions/user/actions";
import ImageCropperComponent from "@/app/components/ImageCropper/ImageCropperComponent";
import Link from "next/link";
// import { createClient } from "@/utils/supabase/server";
import { useEffect, useState } from "react";

export default function SettingsPage() {
  const [user, setUser] = useState({});
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [openImgCrop, setOpenImgCrop] = useState(false);

  // look into https://nextjs.org/docs/app/building-your-application/data-fetching/patterns
  //   preloading data to see if a user is auth if not ...
  //

  useEffect(() => {
    async function getUser() {
      setLoading(true);
      const data = await getUserInfo();

      console.log(data);
      setUser(data);
      setFirstName(data.user_metadata.firstName);
      setLastName(data.user_metadata.lastName);
      setEmail(data.email);
      setLoading(false);
    }
    getUser();
  }, []);

  const handleImage = (e) => {
    console.log(e);
    const file = e.target.files[0];

    console.log(file);
    // setImage(file);
    if (file) {
      setImage(URL.createObjectURL(file));
      URL.revokeObjectURL(file);
      setOpenImgCrop(true);
    }
  };

  const imgCropProps = {
    image,
    setImage,
    setOpenImgCrop,
  };
  return (
    <>
      {openImgCrop && <ImageCropperComponent {...imgCropProps} />}
      <div className="bg-neutral-900 text-gray-200 min-h-screen flex flex-col items-center justify-center">
        <form className="w-full max-w-sm bg-gray-800 rounded-lg shadow-md px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <p className="text-2xl font-semibold mb-4 text-blue-500">
              User Settings
            </p>

            <label
              htmlFor="file-upload"
              className=" flex flex-row justify-center m-4 "
            >
              <div className=" cursor-pointer rounded-full w-[100px] h-[100px]">
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  accept="image/jpeg, image/jpg, image/png"
                  onChange={(e) => handleImage(e)}
                />
                {!image && (
                  <div className="flex rounded-full w-[100px] h-[100px] bg-neutral-800 border-neutral-700 border-2 bg-neutral-800 border-neutral-700 justify-center align-center hover:bg-neutral-900">
                    <p className="text-6xl mt-5">👤</p>
                  </div>
                )}
                {image && (
                  <img
                    className=" w-[100px] h-[100px] rounded-full overflow-hidden border-2 border-neutral-700"
                    src={image}
                    // style={{ aspectRatio: "4/3" }}
                  />
                )}
              </div>
            </label>
            <label
              htmlFor="firstname"
              className="block text-gray-300 font-bold mb-2"
            >
              First Name:
            </label>
            <input
              id="firstname"
              name="firstname"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <label
              htmlFor="lastname"
              className="block text-gray-300 font-bold mb-2"
            >
              Last Name:
            </label>
            <input
              id="lastname"
              name="lastname"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <label
              htmlFor="email"
              className="block text-gray-300 font-bold mb-2"
            >
              Email:
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          {/* <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-300 font-bold mb-2"
            >
              Password:
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div> */}
          <Link
            key={"home"}
            href="/user/password/change"
            className="text-cyan-500"
          >
            <p className="mb-4">Change Password</p>
          </Link>
          <div className="flex items-center justify-between">
            <button
              formAction={updateUserInfo}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
