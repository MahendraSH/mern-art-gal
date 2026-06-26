import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../../components/Layout/Loading";
import { useSelector } from "react-redux";
import { enqueueSnackbar } from "notistack";

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const api = import.meta.env.VITE_APP_API_URL;
  axios.defaults.withCredentials = true;

  const { user, isAuthenticated } = useSelector((state) => state.user);
  const [commentText, setCommentText] = useState("");
  const [liking, setLiking] = useState(false);

  const { isLoading, data, isError, error, refetch } = useQuery(["blogDetails", id], () =>
    axios.get(`${api}/blog/${id}`).then((res) => res.data)
  );

  const blog = data?.blog;
  const isLiked = blog?.likes?.includes(user?._id);

  const handleLike = async () => {
    if (!isAuthenticated) {
      enqueueSnackbar("Please login to like this article", { variant: "info" });
      return;
    }
    setLiking(true);
    try {
      await axios.put(`${api}/blog/${id}/like`);
      refetch();
    } catch (err) {
      enqueueSnackbar("Failed to toggle like", { variant: "error" });
    } finally {
      setLiking(false);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    try {
      await axios.post(`${api}/blog/${id}/comment`, { text: commentText });
      setCommentText("");
      refetch();
      enqueueSnackbar("Comment added!", { variant: "success" });
    } catch (err) {
      enqueueSnackbar("Failed to add comment", { variant: "error" });
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm("Delete this comment?")) return;

    try {
      await axios.delete(`${api}/blog/${id}/comment`, { data: { commentId } });
      refetch();
      enqueueSnackbar("Comment deleted", { variant: "success" });
    } catch (err) {
      enqueueSnackbar("Failed to delete comment", { variant: "error" });
    }
  };

  const handleDeleteArticle = async () => {
    if (!window.confirm("Are you sure you want to delete this article?")) return;

    try {
      await axios.delete(`${api}/blog/${id}`);
      enqueueSnackbar("Article deleted successfully", { variant: "success" });
      navigate("/blogs");
    } catch (err) {
      enqueueSnackbar("Failed to delete article", { variant: "error" });
    }
  };

  if (isLoading) return <Loading />;

  if (isError || !blog) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-slate-50 p-4">
        <div className="alert alert-error max-w-md shadow-lg mb-4">
          <span>Error loading article: {error?.response?.data?.message || "Article not found"}</span>
        </div>
        <Link to="/blogs" className="btn btn-primary btn-sm">Back to Blogs</Link>
      </div>
    );
  }

  const isOwnerOrAdmin = user && (blog.user?._id === user._id || user.role === "admin");

  return (
    <div className="min-h-screen bg-gradient-to-tr from-slate-200 via-fuchsia-50 to-cyan-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8 bg-white p-6 sm:p-10 rounded-3xl shadow-xl border border-slate-100">
        
        {/* Back Link & Delete controls */}
        <div className="flex justify-between items-center pb-4 border-b border-slate-100">
          <Link to="/blogs" className="btn btn-ghost btn-sm gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Articles
          </Link>
          
          {isOwnerOrAdmin && (
            <button onClick={handleDeleteArticle} className="btn btn-error btn-xs sm:btn-sm text-white rounded-xl shadow">
              Delete Article
            </button>
          )}
        </div>

        {/* Content Title */}
        <div className="space-y-4">
          <span className="badge badge-primary font-bold">{blog.category}</span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-800 leading-tight tracking-tight">
            {blog.title}
          </h1>
          
          {/* Author Badge */}
          <div className="flex items-center gap-3 pt-2">
            <div className="avatar">
              <div className="w-10 h-10 rounded-full border">
                <img src={blog.user?.avatar?.url} alt={blog.user?.name} className="object-cover" />
              </div>
            </div>
            <div>
              <p className="text-sm font-bold text-slate-700">{blog.user?.name}</p>
              <p className="text-xs text-slate-400">Published on {new Date(blog.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        {/* Cover Image */}
        <div className="rounded-3xl overflow-hidden shadow-md max-h-[450px] bg-slate-100">
          <img src={blog.image?.url} alt={blog.title} className="w-full h-full object-cover" />
        </div>

        {/* Article Content */}
        <article className="prose prose-slate max-w-none text-slate-700 leading-relaxed text-lg whitespace-pre-line py-4 border-b border-slate-100">
          {blog.content}
        </article>

        {/* Actions bar (Likes) */}
        <div className="flex items-center gap-4 py-2">
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
            <span>{blog.likes?.length || 0} Likes</span>
          </button>
        </div>

        {/* Comments Section */}
        <section className="space-y-6 pt-4">
          <h3 className="text-xl font-bold text-slate-800 tracking-tight">Comments ({blog.comments?.length || 0})</h3>

          {/* Add Comment Form */}
          {isAuthenticated ? (
            <form onSubmit={handleCommentSubmit} className="flex gap-4 items-start">
              <div className="avatar hidden sm:block">
                <div className="w-10 h-10 rounded-full border">
                  <img src={user?.avatar?.url} alt={user?.name} className="object-cover" />
                </div>
              </div>
              <div className="flex-grow space-y-2">
                <textarea
                  className="textarea textarea-bordered w-full rounded-xl h-20 resize-none text-slate-700"
                  placeholder="Share your thoughts on this article..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  required
                ></textarea>
                <div className="flex justify-end">
                  <button type="submit" className="btn btn-primary btn-sm rounded-xl px-5 text-white">
                    Comment
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <div className="bg-slate-50 p-4 rounded-xl text-center text-slate-500 text-sm border border-slate-100">
              Please <Link to="/login" className="text-indigo-600 font-bold hover:underline">login</Link> to post comments.
            </div>
          )}

          {/* Comments List */}
          <div className="space-y-4">
            {blog.comments?.length === 0 ? (
              <p className="text-slate-400 text-sm text-center py-4">No comments yet. Be the first to comment!</p>
            ) : (
              blog.comments.map((comment) => (
                <div key={comment._id} className="flex gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100 relative group">
                  <div className="avatar">
                    <div className="w-8 h-8 rounded-full border">
                      <img src={comment.user?.avatar?.url} alt={comment.user?.name} className="object-cover" />
                    </div>
                  </div>
                  <div className="flex-grow space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-slate-700">{comment.user?.name}</span>
                      <span className="text-[10px] text-slate-400">{new Date(comment.createdAt).toLocaleDateString()}</span>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">{comment.text}</p>
                  </div>

                  {/* Delete comment */}
                  {user && (comment.user?._id === user._id || user.role === "admin") && (
                    <button
                      onClick={() => handleDeleteComment(comment._id)}
                      className="absolute right-4 bottom-4 text-xs font-bold text-rose-500 hover:text-rose-700 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      Delete
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default BlogDetail;
