import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../../components/Layout/Loading";
import { useSelector } from "react-redux";
import { enqueueSnackbar } from "notistack";

const GalaryByid = () => {
  const { id } = useParams();
  const api = import.meta.env.VITE_APP_API_URL;
  axios.defaults.withCredentials = true;

  const { user, isAuthenticated } = useSelector((state) => state.user);
  const [commentText, setCommentText] = useState("");
  const [liking, setLiking] = useState(false);
  const [saving, setSaving] = useState(false);

  const { isLoading, data, isError, error, refetch } = useQuery(["galaryDetails", id], () =>
    axios.get(`${api}/post/${id}`).then((res) => res.data)
  );

  const galary = data?.galary;
  const isSaved = data?.isSaved;
  const isLiked = galary?.likes?.includes(user?._id);

  const handleLike = async () => {
    if (!isAuthenticated) {
      enqueueSnackbar("Please login to like this artwork", { variant: "info" });
      return;
    }
    setLiking(true);
    try {
      await axios.put(`${api}/post/${id}/like`);
      refetch();
    } catch (err) {
      enqueueSnackbar("Failed to toggle like", { variant: "error" });
    } finally {
      setLiking(false);
    }
  };

  const handleSave = async () => {
    if (!isAuthenticated) {
      enqueueSnackbar("Please login to save this artwork", { variant: "info" });
      return;
    }
    setSaving(true);
    try {
      const response = await axios.put(`${api}/post/${id}/favorite`);
      refetch();
      enqueueSnackbar(response.data.message, { variant: "success" });
    } catch (err) {
      enqueueSnackbar("Failed to save artwork", { variant: "error" });
    } finally {
      setSaving(false);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    try {
      await axios.post(`${api}/post/${id}/comment`, { text: commentText });
      setCommentText("");
      refetch();
      enqueueSnackbar("Comment posted!", { variant: "success" });
    } catch (err) {
      enqueueSnackbar("Failed to post comment", { variant: "error" });
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm("Are you sure you want to delete this comment?")) return;

    try {
      await axios.delete(`${api}/post/${id}/comment`, { data: { commentId } });
      refetch();
      enqueueSnackbar("Comment deleted", { variant: "success" });
    } catch (err) {
      enqueueSnackbar("Failed to delete comment", { variant: "error" });
    }
  };

  if (isLoading) return <Loading />;

  if (isError || !galary) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-slate-50 p-4">
        <div className="alert alert-error max-w-md shadow-lg mb-4">
          <span>Error loading artwork: {error?.response?.data?.message || "Artwork not found"}</span>
        </div>
        <Link to="/galary" className="btn btn-primary btn-sm">Back to Gallery</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-tr from-slate-200 via-fuchsia-50 to-cyan-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Back Link */}
        <div className="flex justify-between items-center pb-2">
          <Link to="/galary" className="btn btn-ghost btn-sm gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Gallery
          </Link>
        </div>

        {/* Presentation Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white p-6 sm:p-8 rounded-3xl shadow-xl border border-slate-100 items-start">
          
          {/* Artwork Image */}
          <div className="lg:col-span-7 space-y-4">
            <div className="rounded-2xl overflow-hidden shadow-md max-h-[600px] bg-slate-50 border">
              <img src={galary.image?.url} alt={galary.title} className="w-full h-full object-contain mx-auto" />
            </div>
            
            {/* Action buttons */}
            <div className="flex items-center gap-3">
              {/* Like Button */}
              <button
                onClick={handleLike}
                disabled={liking}
                className={`btn btn-sm gap-2 rounded-xl border border-slate-200 shadow-sm ${
                  isLiked ? "btn-primary text-white" : "btn-ghost bg-slate-50 text-slate-600 hover:bg-slate-100"
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
                <span>{galary.likes?.length || 0} Likes</span>
              </button>

              {/* Save/Favorite Button */}
              <button
                onClick={handleSave}
                disabled={saving}
                className={`btn btn-sm gap-2 rounded-xl border border-slate-200 shadow-sm ${
                  isSaved ? "btn-secondary text-white" : "btn-ghost bg-slate-50 text-slate-600 hover:bg-slate-100"
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                </svg>
                <span>{isSaved ? "Saved" : "Save Artwork"}</span>
              </button>
            </div>
          </div>

          {/* Details & Comments */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="flex items-center justify-between">
                <span className="badge badge-primary font-bold">{galary.category || "Digital Art"}</span>
                <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  {galary.reqTimes || 0} views
                </span>
              </div>
              
              <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight mt-2 first-letter:capitalize">
                {galary.title}
              </h1>

              {/* Creator details */}
              <div className="flex items-center gap-3 mt-4 p-3 bg-slate-50 border border-slate-100 rounded-2xl">
                <div className="avatar">
                  <div className="w-10 h-10 rounded-full border">
                    <img src={galary.user?.avatar?.url} alt={galary.user?.name} className="object-cover" />
                  </div>
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Created By</p>
                  <p className="text-sm font-bold text-slate-700">{galary.user?.name}</p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-extrabold text-slate-800 text-sm uppercase tracking-wider text-slate-400">Description</h3>
              <p className="text-slate-600 leading-relaxed text-sm bg-slate-50 border border-slate-100 p-4 rounded-2xl whitespace-pre-wrap">
                {galary.discription}
              </p>
            </div>

            {/* Comments block */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <h3 className="font-bold text-slate-800">Comments ({galary.comments?.length || 0})</h3>
              
              {/* Comment submission form */}
              {isAuthenticated ? (
                <form onSubmit={handleCommentSubmit} className="space-y-2">
                  <textarea
                    className="textarea textarea-bordered w-full rounded-xl h-16 text-sm resize-none text-slate-700"
                    placeholder="Write a comment..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    required
                  ></textarea>
                  <div className="flex justify-end">
                    <button type="submit" className="btn btn-primary btn-sm rounded-xl px-4 text-white text-xs">
                      Post Comment
                    </button>
                  </div>
                </form>
              ) : (
                <div className="bg-slate-50 p-3 rounded-xl text-center text-xs text-slate-500 border border-slate-100">
                  Please <Link to="/login" className="text-indigo-600 font-bold hover:underline">login</Link> to write comments.
                </div>
              )}

              {/* Comments listing */}
              <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                {galary.comments?.length === 0 ? (
                  <p className="text-slate-400 text-xs text-center py-4">No comments on this artwork yet.</p>
                ) : (
                  galary.comments.map((comment) => (
                    <div key={comment._id} className="flex gap-2.5 bg-slate-50 p-3 rounded-xl border border-slate-100 relative group">
                      <div className="avatar">
                        <div className="w-7 h-7 rounded-full border">
                          <img src={comment.user?.avatar?.url} alt={comment.user?.name} className="object-cover" />
                        </div>
                      </div>
                      <div className="flex-grow space-y-0.5">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-bold text-slate-700">{comment.user?.name}</span>
                          <span className="text-[10px] text-slate-400">{new Date(comment.createdAt).toLocaleDateString()}</span>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed">{comment.text}</p>
                      </div>

                      {user && (comment.user?._id === user._id || user.role === "admin") && (
                        <button
                          onClick={() => handleDeleteComment(comment._id)}
                          className="absolute right-3 bottom-3 text-[10px] font-bold text-rose-500 hover:text-rose-700 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default GalaryByid;
