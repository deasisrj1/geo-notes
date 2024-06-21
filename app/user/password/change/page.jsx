export default function ChangePasswordPage() {
  return (
    <>
      <div className="bg-neutral-900 text-gray-200 min-h-screen flex flex-col items-center justify-center">
        <form className="w-full max-w-sm bg-gray-800 rounded-lg shadow-md px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <p className="text-2xl font-semibold mb-4 text-blue-500">
              Change Users Password
            </p>
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-300 font-bold mb-2"
            >
              Old Password:
            </label>
            <input
              id="old-password"
              name="old-password"
              type="password"
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-300 font-bold mb-2"
            >
              New Password:
            </label>
            <input
              id="new-password"
              name="new-password"
              type="password"
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-300 font-bold mb-2"
            >
              Confirm New Password:
            </label>
            <input
              id="confirm-password"
              name="confirm-password"
              type="password"
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          {/* <Link
            key={"home"}
            href="/user/password/change"
            className="text-cyan-500"
          >
            <p className="mb-4">Change Password</p>
          </Link> */}
          <div className="flex items-center justify-between">
            <button
              //   formAction={signup}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
