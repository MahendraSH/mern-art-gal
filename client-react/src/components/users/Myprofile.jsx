import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../Layout/Loading";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const MyProfile = () => {
  axios.defaults.withCredentials = true;
  const api = import.meta.env.VITE_APP_API_URL;
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("uploads"); // 'uploads' or 'favorites'

  const { isLoading, data, isError, error, refetch: refetchUser } = useQuery(["user"], () =>
    axios.get(`${api}/user/me`).then((res) => res.data)
  );

  const { data: postsData, isLoading: postsLoading, refetch: refetchPosts } = useQuery(["myPosts"], () =>
    axios.get(`${api}/post/me`).then((res) => res.data)
  );

  const handleDeletePost = async (postId) => {
    if (window.confirm("Are you sure you want to delete this artwork?")) {
      try {
        await axios.delete(`${api}/post/${postId}`);
        refetchPosts();
        refetchUser();
      } catch (err) {
        alert(err.response?.data?.message || "Failed to delete artwork");
      }
    }
  };

  const handleUnsavePost = async (postId) => {
    if (window.confirm("Remove this artwork from your favorites?")) {
      try {
        await axios.put(`${api}/post/${postId}/favorite`);
        refetchUser();
      } catch (err) {
        alert("Failed to unsave artwork");
      }
    }
  };

  if (isLoading || postsLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] p-4">
        <div className="alert alert-error max-w-md shadow-lg">
          <span>Error loading profile: {error?.response?.data?.message || error.message}</span>
        </div>
      </div>
    );
  }

  const user = data?.user;
  const stats = data?.stats;
  const myPosts = postsData?.galary || [];
  const savedPosts = user?.favorites || [];

  return (
    <div className="min-h-screen bg-gradient-to-l from-indigo-50 via-slate-100 to-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Profile Card & Stats Section */}
        <section className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 transition-all duration-300 hover:shadow-2xl">
          <div className="md:flex">
            {/* Left side: Avatar */}
            <div className="md:flex-shrink-0 bg-gradient-to-br from-indigo-500 to-purple-600 flex justify-center items-center p-8 md:w-80">
              <div className="avatar">
                <div className="rounded-full w-48 h-48 ring-4 ring-white ring-offset-4 shadow-2xl transition-transform duration-500 hover:scale-105">
                  <img src={user?.avatar?.url} alt={user?.name} className="object-cover" />
                </div>
              </div>
            </div>

            {/* Right side: Info & Stats */}
            <div className="p-8 flex-grow flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">{user?.name}</h1>
                  <span className={`badge ${user?.role === 'admin' ? 'badge-secondary' : 'badge-primary'} capitalize font-semibold shadow-sm`}>
                    {user?.role}
                  </span>
                </div>
                <p className="text-slate-500 font-medium mt-1">{user?.email}</p>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-8 max-w-md">
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 text-center">
                  <span className="block text-slate-400 text-xs font-bold uppercase tracking-wider">My Artworks</span>
                  <span className="block text-2xl font-extrabold text-indigo-600 mt-1">{stats?.postsCount || 0}</span>
                </div>
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 text-center">
                  <span className="block text-slate-400 text-xs font-bold uppercase tracking-wider">Total Views</span>
                  <span className="block text-2xl font-extrabold text-emerald-600 mt-1">{stats?.totalViews || 0}</span>
                </div>
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 text-center">
                  <span className="block text-slate-400 text-xs font-bold uppercase tracking-wider">Saved</span>
                  <span className="block text-2xl font-extrabold text-purple-600 mt-1">{savedPosts.length}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery / Artworks Section */}
        <section className="space-y-6">
          {/* Tab Selector & Actions */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-200 pb-4 gap-4">
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab("uploads")}
                className={`btn btn-sm rounded-xl transition-all ${
                  activeTab === "uploads"
                    ? "btn-primary text-white"
                    : "btn-ghost text-slate-500 hover:bg-slate-100"
                }`}
              >
                My Uploads ({myPosts.length})
              </button>
              <button
                onClick={() => setActiveTab("favorites")}
                className={`btn btn-sm rounded-xl transition-all ${
                  activeTab === "favorites"
                    ? "btn-primary text-white"
                    : "btn-ghost text-slate-500 hover:bg-slate-100"
                }`}
              >
                Saved Artworks ({savedPosts.length})
              </button>
            </div>
            
            {activeTab === "uploads" && (
              <Link to="/post/create" className="btn btn-primary btn-sm rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Upload Artwork
              </Link>
            )}
          </div>

          {/* Tab Content: Uploads */}
          {activeTab === "uploads" && (
            myPosts.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-3xl border-2 border-dashed border-slate-200 p-8 shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-slate-400 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <h3 className="text-lg font-bold text-slate-700">No artworks uploaded yet</h3>
                <p className="text-sm text-slate-500 mt-1">Start showcasing your masterpieces by uploading your first image!</p>
                <Link to="/post/create" className="btn btn-primary btn-sm rounded-xl mt-4 shadow">
                  Upload Now
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {myPosts.map((post) => (
                  <div key={post._id} className="card bg-white shadow-lg overflow-hidden border border-slate-100 hover:shadow-2xl transition-all duration-300 group rounded-2xl">
                    <figure className="relative h-48 overflow-hidden bg-slate-100">
                      <img
                        src={post?.image?.url}
                        alt={post?.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-semibold text-slate-700 shadow-sm flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        {post?.reqTimes || 0}
                      </div>
                    </figure>
                    <div className="card-body p-5 justify-between">
                      <div>
                        <h3 className="card-title text-lg font-bold text-slate-800 line-clamp-1 first-letter:capitalize">{post?.title}</h3>
                        <p className="text-slate-500 text-sm mt-1 line-clamp-2">{post?.discription}</p>
                      </div>
                      <div className="card-actions justify-end mt-4 pt-4 border-t border-slate-50 flex items-center gap-2">
                        <Link to={`/galary/${post._id}`} className="btn btn-ghost btn-xs text-indigo-600 hover:bg-indigo-50 rounded-lg">
                          View
                        </Link>
                        <button
                          onClick={() => handleDeletePost(post._id)}
                          className="btn btn-ghost btn-xs text-rose-600 hover:bg-rose-50 rounded-lg"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )
          )}

          {/* Tab Content: Saved Artworks */}
          {activeTab === "favorites" && (
            savedPosts.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-3xl border-2 border-dashed border-slate-200 p-8 shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-slate-400 mb-4" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                </svg>
                <h3 className="text-lg font-bold text-slate-700">No saved artworks</h3>
                <p className="text-sm text-slate-500 mt-1">Artworks you save will appear here for easy access.</p>
                <Link to="/galary" className="btn btn-primary btn-sm rounded-xl mt-4 shadow">
                  Browse Gallery
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {savedPosts.map((post) => (
                  <div key={post._id} className="card bg-white shadow-lg overflow-hidden border border-slate-100 hover:shadow-2xl transition-all duration-300 group rounded-2xl">
                    <figure className="relative h-48 overflow-hidden bg-slate-100">
                      <img
                        src={post?.image?.url}
                        alt={post?.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-indigo-600 text-[10px] font-extrabold px-2.5 py-1 rounded-full shadow-sm">
                        {post?.category || "Digital Art"}
                      </span>
                    </figure>
                    <div className="card-body p-5 justify-between">
                      <div>
                        <div className="flex items-center gap-1.5 mb-1.5">
                          <div className="avatar">
                            <div className="w-5 h-5 rounded-full border">
                              <img src={post?.user?.avatar?.url} alt={post?.user?.name} className="object-cover" />
                            </div>
                          </div>
                          <span className="text-[10px] font-bold text-slate-500">{post?.user?.name}</span>
                        </div>
                        <h3 className="card-title text-lg font-bold text-slate-800 line-clamp-1 first-letter:capitalize">{post?.title}</h3>
                        <p className="text-slate-500 text-sm mt-1 line-clamp-2">{post?.discription}</p>
                      </div>
                      <div className="card-actions justify-end mt-4 pt-4 border-t border-slate-50 flex items-center gap-2">
                        <Link to={`/galary/${post._id}`} className="btn btn-ghost btn-xs text-indigo-600 hover:bg-indigo-50 rounded-lg">
                          View
                        </Link>
                        <button
                          onClick={() => handleUnsavePost(post._id)}
                          className="btn btn-ghost btn-xs text-rose-600 hover:bg-rose-50 rounded-lg"
                        >
                          Unsave
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )
          )}
        </section>
      </div>
    </div>
  );
};

export default MyProfile;
