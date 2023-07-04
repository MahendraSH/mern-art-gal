import React from "react";
import { Link } from "react-router-dom";

const Dashborad = () => {
  return (
    <>
      <div className="hero min-h-screen bg-gradient-to-tr from-slate-400 via-fuchsia-100 to-cyan-100">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <ul className="w-56 menu rounded-box bg-secondary p-2 shadow content-center">
              <li>
                <Link
                  className=" text-zinc-300 hover:text-zinc-100 text-center"
                  to="/admin/users"
                >
                  ALl Users{" "}
                </Link>
              </li>
            </ul>
            <h4> Some statistics </h4>
            <div className="stats stats-vertical lg:stats-horizontal shadow">
              <div className="stat">
                <div className="stat-title">Posts</div>
                <div className="stat-value">31K</div>
              </div>

              <div className="stat">
                <div className="stat-title"> Users</div>
                <div className="stat-value">4,200</div>
              </div>

              <div className="stat">
                <div className="stat-title"> Admins</div>
                <div className="stat-value">1,200</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashborad;
