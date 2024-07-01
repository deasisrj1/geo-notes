"use client";
import { useMemo, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { createClient } from "@/utils/supabase/client";

// const comments = [
//   {
//     id: 1,
//     name: "Leslie Alexander",
//     content:
//       "Explicabo nihil laborum. Saepe facilis consequuntur in eaque. Consequatur perspiciatis quam. Sed est illo quia. Culpa vitae placeat vitae. Repudiandae sunt exercitationem nihil nisi facilis placeat minima eveniet.",
//     date: "1d ago",
//     dateTime: "2023-03-04T15:54Z",
//   },
// ];


function Comments() {
  const [comments,setComments] = useState([])
  useEffect(() => {
    async function getData() {
      const supabase = createClient();
      const { data, error } = await supabase.from("comments").select();
      console.log("data",data)

      /*
      shape we need
      //   {
//     id: 1,
//     name: "Leslie Alexander",
//     content:
//       "Explicabo nihil laborum. Saepe facilis consequuntur in eaque. Consequatur perspiciatis quam. Sed est illo quia. Culpa vitae placeat vitae. Repudiandae sunt exercitationem nihil nisi facilis placeat minima eveniet.",
//     date: "1d ago",
//     dateTime: "2023-03-04T15:54Z",
//   },
shape we have
{
    "id": "aa14e338-9825-4840-ab59-1c6e5277a983",
    "created_at": "2024-07-01T20:36:18.463753+00:00",
    "post_id": "ec69d039-d584-457b-a494-1d00e8701b56",
    "text": "test",
    "user_id": "81b80d0b-5748-4ce4-bdad-da7d0e24ad5a"
}
      */
      setComments(data)
    }
    getData();
  }, []);
  return (
    <ul role="list" className="divide-y divide-gray-100">
      {comments.map((comment) => (
        <li key={comment.id} className="flex gap-x-4 py-5">
          <div className="bg-pink-600 flex h-12 w-12 rounded-full flex-none items-center justify-center text-sm font-medium text-white">
            {comment.name?.[0]}{" "}
          </div>
          <div className="flex-auto">
            <div className="flex items-baseline justify-between gap-x-4">
              <p className="text-sm font-semibold leading-6 text-gray-900">
                {comment.name}
              </p>
              <p className="flex-none text-xs text-gray-600">
                <time dateTime={comment.dateTime}>{comment.date}</time>
              </p>
            </div>
            <p className="mt-1 line-clamp-2 text-sm leading-6 text-gray-600">
              {comment.content}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}

function Form({ id }) {
  // const handleSubmit = async () => {
  //   const { error } = await supabase
  //     .from("comments")
  //     .insert({ id: 1, name: "Denmark" });
  // };
  return (
    <div className="flex items-start space-x-4 mb-9">
      <div className="flex-shrink-0">
        <img
          className="inline-block h-10 w-10 rounded-full"
          src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt=""
        />
      </div>
      <div className="min-w-0 flex-1">
        <form action="#" className="relative">
          <div className="overflow-hidden rounded-lg shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
            <label htmlFor="comment" className="sr-only">
              Add your comment
            </label>
            <textarea
              rows={3}
              name="comment"
              id="comment"
              className="block w-full resize-none border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
              placeholder="Add your comment..."
              defaultValue={""}
            />

            {/* Spacer element to match the height of the toolbar */}
            <div className="py-2" aria-hidden="true">
              {/* Matches height of button in toolbar (1px border + 36px content height) */}
              <div className="py-px">
                <div className="h-9" />
              </div>
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-0 flex justify-between py-2 pl-3 pr-2">
            <div className="flex-shrink-0">
              <button
                type="submit"
                className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Post
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function Page({ params, searchParams }) {
  const Map = useMemo(
    () => dynamic(() => import("./PostMap"), { ssr: false }),
    []
  );

  const { title, body, firstname, lat, long } = searchParams;

  return (
    <>
      <div className="flex flex-col">
        <div className="flex justify-center ">
          <div className="justify-start w-5/6 my-4">
            <div>{title}</div>
            <div>{body}</div>
            <div>{firstname}</div>
          </div>
        </div>
        <Map lat={lat} long={long} />
        <div className="flex justify-center">
          <div className="w-5/6 mt-6 pt-5 border-t border-gray-200">
            <h3 className="text-lg mb-3 font-semibold leading-6 text-gray-900">
              Comments
            </h3>
            <Comments id={params?.id} />
            <Form />
          </div>
        </div>
      </div>
    </>
  );
}
