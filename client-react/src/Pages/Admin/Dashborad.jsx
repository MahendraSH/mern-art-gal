import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const Dashborad = () => {
  axios.defaults.withCredentials = true;
  const api = import.meta.env.VITE_APP_API_URL;

  const { isLoading, data, isError, error } = useQuery(["adminStats"], () =>
    axios.get(`${api}/user/admin/stats`).then((res) => res.data)
  );

  return (
    <div className="min-h-screen bg-gradient-to-tr from-slate-200 via-fuchsia-50 to-cyan-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Admin Dashboard</h1>
            <p className="text-sm text-slate-500 mt-1">Real-time statistics and user management</p>
          </div>
          <Link
            to="/admin/users"
            className="btn btn-primary shadow-md hover:shadow-lg transition-all duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            Manage Users
          </Link>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ) : isError ? (
          <div className="alert alert-error shadow-lg">
            <span>Error: {error?.response?.data?.message || error.message || "Failed to load dashboard stats"}</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Stat 1 */}
            <div className="card bg-white shadow-xl hover:shadow-2xl transition-all duration-300 border border-slate-100">
              <div className="card-body p-6 flex flex-row items-center gap-4">
                <div className="p-3 bg-indigo-50 rounded-xl text-indigo-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Posts</p>
                  <h3 className="text-2xl font-bold text-slate-800">{data?.stats?.totalPosts || 0}</h3>
                </div>
              </div>
            </div>

            {/* Stat 2 */}
            <div className="card bg-white shadow-xl hover:shadow-2xl transition-all duration-300 border border-slate-100">
              <div className="card-body p-6 flex flex-row items-center gap-4">
                <div className="p-3 bg-teal-50 rounded-xl text-teal-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Users</p>
                  <h3 className="text-2xl font-bold text-slate-800">{data?.stats?.totalUsers || 0}</h3>
                </div>
              </div>
            </div>

            {/* Stat 3 */}
            <div className="card bg-white shadow-xl hover:shadow-2xl transition-all duration-300 border border-slate-100">
              <div className="card-body p-6 flex flex-row items-center gap-4">
                <div className="p-3 bg-purple-50 rounded-xl text-purple-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Admins</p>
                  <h3 className="text-2xl font-bold text-slate-800">{data?.stats?.totalAdmins || 0}</h3>
                </div>
              </div>
            </div>

            {/* Stat 4 */}
            <div className="card bg-white shadow-xl hover:shadow-2xl transition-all duration-300 border border-slate-100">
              <div className="card-body p-6 flex flex-row items-center gap-4">
                <div className="p-3 bg-amber-50 rounded-xl text-amber-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Views</p>
                  <h3 className="text-2xl font-bold text-slate-800">{data?.stats?.totalViews || 0}</h3>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashborad;
