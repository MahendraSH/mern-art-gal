import React from "react";
import { Link } from "react-router-dom";

const GalaryCard = ({ item }) => {
  return (
    <>
      <div className="max-h-full p-2  shadow-md lg:w-1/3 sm:w-1/2 rounded-md shadow-base-content bg-base-300">
        <div className="relative flex">
          <img
            alt={item.image.public_id}
            className="absolute object-cover object-center w-full lg:h-48 md:h-36"
            src={item.image.url}
          />
          <div className="relative z-10 w-full px-8 py-10 bg-white border-4 border-gray-200 opacity-0 hover:opacity-100 lg:h-48 md:h-36">
            <h2 className="mb-1 text-sm font-medium tracking-widest text-indigo-500 title-font">
              {item.title}
            </h2>

            <p className="leading-relaxed">
              {item.discription.split(" ").slice(0, 6).join(" ")}
            </p>
            <div className="p-6">
              <h2 className="tracking-widest text-md title-font   mb-1  first-letter:capitalize">
                <div className="avatar">
                  <div className="w-4 rounded-full">
                    <img src={item.user.avatar.url} alt="createer" />
                  </div>
                </div>{" "}
                {item.user.name}
              </h2>
              <div className="flex items-center flex-wrap ">
                <Link
                  to={`/galary/${item._id}`}
                  className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0"
                >
                  view Post
                  <svg
                    className="w-4 h-4 ml-2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14"></path>
                    <path d="M12 5l7 7-7 7"></path>
                  </svg>
                </Link>
                <div>
                  <span className="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                    views
                  </span>
                  <span className="text-gray-400 inline-flex items-center leading-none text-sm">
                    {item.reqTimes}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GalaryCard;
