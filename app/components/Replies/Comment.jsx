import { ChatBubbleLeftEllipsisIcon, TagIcon, UserCircleIcon } from '@heroicons/react/20/solid'

export default function Comment({activityItem}) {
  return (
    <>
      <div className="relative">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 ring-8 ring-white">
          <UserCircleIcon
            className="h-5 w-5 text-gray-500"
            aria-hidden="true"
          />
        </div>
        {/* <img
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-400 ring-8 ring-white"
            src={activityItem.imageUrl}
            alt=""
          />
          <UserCircleIcon className="h-5 w-5 text-gray-500" aria-hidden="true" /> */}

        <span className="absolute -bottom-0.5 -right-1 rounded-tl bg-white px-0.5 py-px">
          {/* <ChatBubbleLeftEllipsisIcon className="h-5 w-5 text-gray-400" aria-hidden="true" /> */}
        </span>
      </div>
      <div className="min-w-0 flex-1">
        <div>
          <div className="text-sm">
            <a
              href={activityItem.person.href}
              className="font-medium text-gray-900"
            >
              {activityItem.person.name}
            </a>
          </div>
          <p className="mt-0.5 text-sm text-gray-500">
            Commented {activityItem.date}
          </p>
        </div>
        <div className="mt-2 text-sm text-gray-700">
          <p>{activityItem.comment}</p>
        </div>
      </div>
    </>
  );
}
