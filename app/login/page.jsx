import Link from "next/link";
import { login } from "./actions";

// Link; ?

export default function LoginPage() {
  return (
    <div className=" text-gray-200 min-h-screen flex flex-col items-center justify-center">
      <form className="w-full max-w-sm bg-gray-800 rounded-lg shadow-md px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <p className="text-2xl font-semibold mb-4 text-blue-500">Log In</p>
          <label htmlFor="email" className="block text-gray-300 font-bold mb-2">
            Email:
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-6">
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
        </div>
        <div className="flex items-center justify-between">
          <button
            formAction={login}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Log In
          </button>
          <Link key="signup" href="/signup">
            <button className="bg-gray-700 hover:bg-gray-600 text-gray-300 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Sign Up
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}
