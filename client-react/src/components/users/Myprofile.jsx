import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../Layout/Loading";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const MyProfile = () => {
  axios.defaults.withCredentials = true;
  const api = import.meta.env.VITE_APP_API_URL;

  const { isLoading, data, isError, error } = useQuery(["user"], () =>
    axios.get(`${api}/user/me`).then((res) => res.data)
  );
  const navigate = useNavigate();
  if (isError) {
    console.log(error);
  }
  const user = data?.user;
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <section className="text-center body-font  bg-gradient-to-l from-indigo-200 to-gray-200">
            <h1 className="text-4xl font-medium  bg-clip-text text-transparent  bg-gradient-to-l from-slate-700 to-violet-900 ">
              {" "}
              My Profile
            </h1>
            <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
              <div className="avatar">
                <div className="rounded-full w-72 ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img src={user.avatar.url} alt="" />
                </div>
              </div>
              <div className="lg:flex-warp md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
                <div className="shadow-xl card w-96 bg-base-100">
                  <div className="card-body">
                    <div>
                      <span className="text-2xl">{user.name}</span>
                    </div>
                    <div>
                      <span className="text-2xl">{user.email}</span>
                    </div>
                    <div>
                      <span className="text-2xl">{user.role}</span>
                    </div>
                  </div>
                </div>
                <div className="shadow-xl card w-full  bg-base-100">
                  <div className="card-body">
                    <div className="stats stats-vertical lg:stats-horizontal shadow">
                      <div className="stat">
                        <div className="stat-title">Posts</div>
                        <div className="stat-value">31K</div>
                      </div>

                      <div className="stat">
                        <div className="stat-title"> Views</div>
                        <div className="stat-value">4,200</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default MyProfile;
{
  /* <div>
          <h1 className="font-bold text-7xl bg-base-200">My Profile</h1>
          <div className="min-h-screen hero bg-base-200">
            <div className="flex-col hero-content lg:flex-row">
              <div className="avatar">
                <div className="rounded-full w-72 ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img src={user.avatar.url} alt="" />
                </div>
              </div>
              <div>
                <div>
                  <div>
                    <h4 className="text-2xl">Full Name :</h4>
                    <p className="text-2xl">{user.name}</p>
                  </div>
                  <div>
                    <h4 className="text-2xl">Email :</h4>
                    <p className="text-2xl">{user.email}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */
}
