import React from "react";
import { Link } from "react-router-dom";

const GalaryCard = ({ item }) => {
  return (
    <div className="w-full sm:w-1/2 lg:w-1/3 p-4">
      <div className="card bg-white shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100 hover:-translate-y-1 rounded-2xl overflow-hidden group">
        {/* Image Frame */}
        <figure className="relative h-64 overflow-hidden bg-slate-100">
          <img
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            src={item.image?.url}
          />
          {/* Category Badge */}
          <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-indigo-600 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
            {item.category || "Digital Art"}
          </span>
          {/* Views Overlay */}
          <div className="absolute top-4 right-4 bg-slate-900/60 backdrop-blur-md text-white text-xs font-bold px-2.5 py-1.5 rounded-full shadow-sm flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <span>{item.reqTimes || 0}</span>
          </div>
        </figure>

        {/* Content Body */}
        <div className="card-body p-6 flex flex-col justify-between">
          <div>
            <h3 className="card-title text-xl font-extrabold text-slate-800 tracking-tight line-clamp-1 first-letter:capitalize">
              {item.title}
            </h3>
            <p className="text-slate-500 text-sm mt-2 line-clamp-3">
              {item.discription}
            </p>
          </div>

          {/* Footer - Creator Info & Action */}
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-100">
            <div className="flex items-center gap-2">
              <div className="avatar">
                <div className="w-8 h-8 rounded-full ring-2 ring-primary/10">
                  <img src={item.user?.avatar?.url} alt={item.user?.name} className="object-cover" />
                </div>
              </div>
              <span className="text-xs font-bold text-slate-700 line-clamp-1">{item.user?.name}</span>
            </div>
            
            <Link
              to={`/galary/${item._id}`}
              className="btn btn-ghost btn-sm text-xs font-bold text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700 rounded-xl flex items-center gap-1 transition-all"
            >
              Details
              <svg
                className="w-3.5 h-3.5"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14"></path>
                <path d="M12 5l7 7-7 7"></path>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalaryCard;
