import { Fragment, useState } from "react";
import useSWR from 'swr'
import { Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { ArrowSmDownIcon, ArrowSmUpIcon } from "@heroicons/react/solid";
import {
  CursorClickIcon,
  MailOpenIcon,
  UsersIcon,
} from "@heroicons/react/outline";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}


const stats = [
  {
    id: 1,
    name: "Complexity",
    stat: "3",
    icon: UsersIcon
  },
  {
    id: 2,
    name: "Waves",
    stat: "3",
    icon: MailOpenIcon,
  },
  {
    id: 3,
    name: "Smth",
    stat: "5",
    icon: CursorClickIcon
  },
];

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function SpotDetails({ spot, removeSpot }) {

  const { data } = useSWR('/api/marine', fetcher)
  console.log('DATA MARINE', data);
  
  return (
    <Transition.Root show={Boolean(spot?.id)} as={Fragment}>
      <div className="right-0 absolute h-full z-50">
        <Transition.Child
          as={Fragment}
          enter="transform transition ease-in-out duration-500 sm:duration-700"
          enterFrom="translate-x-full"
          enterTo="translate-x-0"
          leave="transform transition ease-in-out duration-500 sm:duration-700"
          leaveFrom="translate-x-0"
          leaveTo="translate-x-full"
        >
          <div className="w-screen max-w-md h-full">
            <div className="h-full flex flex-col bg-white shadow-xl">
              <div className="py-6 px-4 bg-indigo-700 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="text-lg font-medium text-white">
                    {spot.name}{" "}
                    <span className="mx-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-pink-100 text-pink-800">
                      water {data?.data?.weather?.[0].hourly?.[0].waterTemp_C} °C
                    </span>
                    <span className="mx-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-pink-100 text-green-800">
                      air {data?.data?.weather?.[0].maxtempC} °C
                    </span>
                  </div>
                  <div className="ml-3 h-7 flex items-center">
                    <button
                      className="bg-indigo-700 rounded-md text-indigo-200 hover:text-white focus:outline-none focus:ring-1 focus:ring-white"
                      onClick={removeSpot}
                    >
                      <span className="sr-only">Close panel</span>
                      <XIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </div>
                <div className="mt-1">
                  <p className="text-sm h-16 text-indigo-300 overflow-clip overflow-hidden ">
                    {spot.description}
                  </p>{" "}
                </div>
              </div>
              <div className="relative flex-1 py-6 px-4 sm:px-6">
                {/* Replace with your content */}
                <div className="absolute inset-0 py-6 px-4 sm:px-6">
                  <div>
                    <div className="flex -space-x-2 relative mt-4 pl-1 z-0 overflow-hidden">
                      <img
                        className="relative z-30 inline-block h-14 w-14 rounded-full ring-1 ring-indigo-300"
                        src="https://cdn.lifestyleasia.com/wp-content/uploads/2017/11/23172240/iStock-160896636.jpg"
                        alt=""
                      />
                      <img
                        className="relative z-20 inline-block h-14 w-14 rounded-full ring-1 ring-indigo-300"
                        src="http://cdn.cnn.com/cnnnext/dam/assets/130624173927-50-surf-spots-rincon.jpg"
                        alt=""
                      />
                      <img
                        className="relative z-10 inline-block h-14 w-14 rounded-full ring-1 ring-indigo-300"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQjQgKPQ4hV4riJEN30BAq_T0TIg-6QArd6g&usqp=CAU"
                        alt=""
                      />
                      <img
                        className="relative z-0 inline-block h-14 w-14 rounded-full ring-1 ring-indigo-300"
                        src="https://img.traveltriangle.com/blog/wp-content/uploads/2018/12/ghana-surfing-cover.jpg"
                        alt=""
                      />
                    </div>

                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Stats
                    </h3>

                    <dl className="mt-5 grid grid-cols-1 gap-5">
                      {stats.map((item) => (
                        <div
                          key={item.id}
                          className="relative bg-white overflow-hidden"
                        >
                          <dt>
                            <div className="absolute bg-indigo-500 rounded-md p-3">
                              <item.icon
                                className="h-6 w-6 text-white"
                                aria-hidden="true"
                              />
                            </div>
                            <p className="ml-16 text-sm font-medium text-gray-500 truncate">
                              {item.name}
                            </p>
                          </dt>
                          <dd className="ml-16 flex items-baseline">
                            <p className="text-2xl font-semibold text-gray-900">
                              {item.stat}
                            </p>
                            <p
                              className={classNames(
                                item.changeType === "increase"
                                  ? "text-green-600"
                                  : "text-red-600",
                                "ml-2 flex items-baseline text-sm font-semibold"
                              )}
                            >
                              {item.changeType === "increase" ? (
                                <ArrowSmUpIcon
                                  className="self-center flex-shrink-0 h-5 w-5 text-green-500"
                                  aria-hidden="true"
                                />
                              ) : (
                                <ArrowSmDownIcon
                                  className="self-center flex-shrink-0 h-5 w-5 text-red-500"
                                  aria-hidden="true"
                                />
                              )}

                              <span className="sr-only">
                                {item.changeType === "increase"
                                  ? "Increased"
                                  : "Decreased"}{" "}
                                by
                              </span>
                              {item.change}
                            </p>
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Transition.Child>
      </div>
    </Transition.Root>
  );
}
