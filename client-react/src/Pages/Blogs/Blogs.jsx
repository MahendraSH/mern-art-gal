import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../../components/Layout/Loading";
import { useSelector } from "react-redux";

const Blogs = () => {
  axios.defaults.withCredentials = true;
  const api = import.meta.env.VITE_APP_API_URL;
  const { isAuthenticated } = useSelector((state) => state.user);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const { isLoading, data, isError, error } = useQuery(["allBlogs"], () =>
    axios.get(`${api}/blog/all`).then((res) => res.data)
  );

  const categories = ["All", "Art Guide", "Tutorial", "Exhibition", "News", "Other"];

  const filteredBlogs = data?.blogs?.filter((blog) => {
    const matchesSearch =
      blog.title?.toLowerCase().includes(search.toLowerCase()) ||
      blog.content?.toLowerCase().includes(search.toLowerCase()) ||
      blog.user?.name?.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || blog.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  if (isLoading) return <Loading />;

  return (
    <section className="min-h-screen text-gray-600 bg-gradient-to-tr from-slate-200 via-fuchsia-50 to-cyan-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 border-b border-slate-200 pb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Art Articles & Blogs</h1>
            <p className="text-sm text-slate-500 mt-1">Read the latest guides, tutorials, and exhibition reviews</p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:max-w-md justify-end">
            {/* Search Input */}
            <div className="relative w-full sm:max-w-xs">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Search articles..."
                className="input input-bordered w-full pl-10 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-sm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Write Button */}
            {isAuthenticated && (
              <Link
                to="/blog/create"
                className="btn btn-primary btn-sm rounded-xl py-2 shadow-md hover:shadow-lg transition-all text-white w-full sm:w-auto"
              >
                Write Article
              </Link>
            )}
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`btn btn-sm rounded-xl border border-slate-200 shadow-sm transition-all duration-300 ${
                selectedCategory === category
                  ? "btn-primary hover:btn-primary text-white"
                  : "btn-ghost bg-white hover:bg-slate-100 text-slate-600"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Blog Grid */}
        {isError ? (
          <div className="alert alert-error max-w-md mx-auto shadow">
            <span>Failed to load articles: {error?.response?.data?.message || error.message}</span>
          </div>
        ) : filteredBlogs?.length === 0 ? (
          <div className="text-center py-20 bg-white/50 rounded-3xl border-2 border-dashed border-slate-200 shadow-sm p-8 max-w-md mx-auto">
            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-slate-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-lg font-bold text-slate-700">No Articles Found</h3>
            <p className="text-sm text-slate-500 mt-1">We couldn't find any articles matching your search criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((blog) => (
              <div key={blog._id} className="card bg-white shadow-lg overflow-hidden border border-slate-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 rounded-2xl group flex flex-col justify-between">
                <div>
                  <figure className="relative h-48 overflow-hidden bg-slate-100">
                    <img
                      src={blog.image?.url}
                      alt={blog.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-indigo-600 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                      {blog.category}
                    </span>
                  </figure>

                  <div className="card-body p-6 space-y-3">
                    <h2 className="card-title text-xl font-extrabold text-slate-800 line-clamp-2 leading-tight group-hover:text-indigo-600 transition-colors">
                      {blog.title}
                    </h2>
                    <p className="text-slate-500 text-sm line-clamp-3">
                      {blog.content}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-4 border-t border-slate-50 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="avatar">
                      <div className="w-8 h-8 rounded-full">
                        <img src={blog.user?.avatar?.url} alt={blog.user?.name} className="object-cover" />
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-700">{blog.user?.name}</p>
                      <p className="text-[10px] text-slate-400">{new Date(blog.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <Link
                    to={`/blog/${blog._id}`}
                    className="btn btn-ghost btn-sm text-xs font-bold text-indigo-600 hover:bg-indigo-50 rounded-xl"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Blogs;
