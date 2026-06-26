import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const UserDetails = () => {
  axios.defaults.withCredentials = true;
  const { id } = useParams();
  const navigate = useNavigate();
  const api = import.meta.env.VITE_APP_API_URL;

  const [updatingRole, setUpdatingRole] = useState(false);

  // Fetch User Details
  const { isLoading: isUserLoading, data: userData, isError: isUserError, error: userError, refetch: refetchUser } = useQuery(
    ["adminUser", id],
    () => axios.get(`${api}/user/${id}`).then((res) => res.data)
  );

  // Fetch User's posts - we can fetch all posts and filter them by user id
  const { isLoading: isPostsLoading, data: postsData, isError: isPostsError, error: postsError, refetch: refetchPosts } = useQuery(
    ["allPostsAdmin"],
    () => axios.get(`${api}/post/all`).then((res) => res.data)
  );

  const user = userData?.user;
  const allPosts = postsData?.galary || [];
  const userPosts = allPosts.filter(post => post.user?._id === id);

  // Handle Role Change
  const handleRoleChange = async (e) => {
    const newRole = e.target.value;
    setUpdatingRole(true);
    try {
      await axios.put(`${api}/user/${id}`, { role: newRole });
      refetchUser();
      alert("User role updated successfully");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update role");
    } finally {
      setUpdatingRole(false);
    }
  };

  // Handle Delete Post
  const handleDeletePost = async (postId) => {
    if (window.confirm("Are you sure you want to delete this artwork?")) {
      try {
        await axios.delete(`${api}/post/${postId}`);
        refetchPosts();
      } catch (err) {
        alert(err.response?.data?.message || "Failed to delete artwork");
      }
    }
  };

  // Handle Delete User
  const handleDeleteUser = async () => {
    if (window.confirm("Are you sure you want to permanently delete this user? This will also delete all their uploaded artworks!")) {
      try {
        await axios.delete(`${api}/user/${id}`);
        alert("User and all their artworks deleted successfully");
        navigate("/admin/users");
      } catch (err) {
        alert(err.response?.data?.message || "Failed to delete user");
      }
    }
  };

  const isLoading = isUserLoading || isPostsLoading;
  const isError = isUserError || isPostsError;
  const errorMessage = userError?.response?.data?.message || userError?.message || postsError?.response?.data?.message || postsError?.message;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-slate-50">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (isError || !user) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-slate-50 p-4">
        <div className="alert alert-error max-w-md shadow-lg mb-4">
          <span>Error loading user details: {errorMessage || "User not found"}</span>
        </div>
        <Link to="/admin/users" className="btn btn-primary btn-sm">Back to Users</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-tr from-slate-200 via-fuchsia-50 to-cyan-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Back navigation */}
        <div className="flex justify-between items-center">
          <Link to="/admin/users" className="btn btn-ghost btn-sm gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Users
          </Link>
          <button
            onClick={handleDeleteUser}
            className="btn btn-error btn-sm gap-2 text-white shadow hover:shadow-lg transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Delete User
          </button>
        </div>

        {/* User Card */}
        <section className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 p-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="avatar">
              <div className="rounded-full w-32 h-32 ring-4 ring-indigo-500/20 shadow-lg">
                <img src={user.avatar?.url} alt={user.name} className="object-cover" />
              </div>
            </div>
            <div className="flex-grow text-center md:text-left space-y-4">
              <div>
                <h1 className="text-3xl font-extrabold text-slate-800">{user.name}</h1>
                <p className="text-slate-500 font-medium mt-1">{user.email}</p>
                <p className="text-xs text-slate-400 mt-0.5">ID: {user._id}</p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                <div className="form-control w-full max-w-xs">
                  <label className="label pt-0">
                    <span className="label-text font-bold text-slate-600">User Role</span>
                  </label>
                  <select
                    className="select select-bordered select-sm w-full font-semibold"
                    value={user.role}
                    onChange={handleRoleChange}
                    disabled={updatingRole}
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div className="stats stats-horizontal bg-slate-50 border border-slate-100 rounded-xl mt-4 sm:mt-0">
                  <div className="stat py-2 px-4 text-center">
                    <div className="stat-title text-xs font-semibold">Artworks</div>
                    <div className="stat-value text-xl font-extrabold text-indigo-600">{userPosts.length}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Artworks List */}
        <section className="space-y-6">
          <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight border-b border-slate-200 pb-4">
            User's Artworks ({userPosts.length})
          </h2>

          {userPosts.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
              <p className="text-slate-500">This user hasn't uploaded any artworks yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {userPosts.map((post) => (
                <div key={post._id} className="card bg-white shadow-lg overflow-hidden border border-slate-100 hover:shadow-xl transition-all duration-300 group rounded-2xl">
                  <figure className="relative h-48 overflow-hidden bg-slate-100">
                    <img
                      src={post.image?.url}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-semibold text-slate-700 shadow-sm flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      {post.reqTimes || 0}
                    </div>
                  </figure>
                  <div className="card-body p-5 justify-between">
                    <div>
                      <h3 className="card-title text-base font-bold text-slate-800 line-clamp-1 first-letter:capitalize">{post.title}</h3>
                      <p className="text-slate-500 text-xs mt-1 line-clamp-2">{post.discription}</p>
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
          )}
        </section>
      </div>
    </div>
  );
};

export default UserDetails;
