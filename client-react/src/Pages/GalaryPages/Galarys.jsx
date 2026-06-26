import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { enqueueSnackbar } from "notistack";
import Loading from "../../components/Layout/Loading";
import { getAllPosts, clearErrors } from "../../actions/blogActions";
import GalaryCard from "../../components/Galary/GalaryCard";

const Galarys = () => {
  const { error, loading, posts } = useSelector((state) => state.blogs);
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch(clearErrors());
    }
    dispatch(getAllPosts());
  }, [dispatch, error]);

  const categories = ["All", "Digital Art", "Painting", "Sculpture", "Photography", "Sketch", "Other"];

  const filteredPosts = posts?.galary?.filter((item) => {
    const matchesSearch =
      item.title?.toLowerCase().includes(search.toLowerCase()) ||
      item.discription?.toLowerCase().includes(search.toLowerCase()) ||
      item.user?.name?.toLowerCase().includes(search.toLowerCase());
    
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <section className="min-h-screen text-gray-600 dark:text-slate-300 bg-gradient-to-tr from-slate-200 via-fuchsia-50 to-cyan-100 dark:from-slate-950 dark:via-slate-900 dark:to-neutral-950 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
          <div className="max-w-7xl mx-auto space-y-10">
            {/* Header & Search */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 border-b border-slate-200 dark:border-slate-800 pb-8">
              <div>
                <h1 className="text-3xl font-extrabold text-slate-800 dark:text-white tracking-tight">Art Gallery</h1>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Explore creative masterpieces from artists worldwide</p>
              </div>

              {/* Search Bar */}
              <div className="relative w-full md:max-w-xs">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </span>
                <input
                  type="text"
                  placeholder="Search titles, descriptions, artists..."
                  className="input input-bordered w-full pl-10 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-sm bg-white dark:bg-slate-850 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            {/* Category Filter Chips */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`btn btn-sm rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm transition-all duration-300 ${
                    selectedCategory === category
                      ? "btn-primary hover:btn-primary text-white"
                      : "btn-ghost bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Cards Grid */}
            {filteredPosts?.length === 0 ? (
              <div className="text-center py-20 bg-white/50 dark:bg-slate-900/50 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800 shadow-sm p-8 max-w-md mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-slate-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-lg font-bold text-slate-700 dark:text-slate-200">No Artworks Found</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">We couldn't find any artwork matching your filter or search query.</p>
                <button
                  onClick={() => { setSearch(""); setSelectedCategory("All"); }}
                  className="btn btn-primary btn-sm rounded-xl mt-4 shadow"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <main className="flex flex-wrap -mx-4">
                {filteredPosts?.map((item, index) => (
                  <GalaryCard key={index} item={item} />
                ))}
              </main>
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default Galarys;
