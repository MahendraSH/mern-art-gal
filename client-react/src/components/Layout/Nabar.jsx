import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [theme, setTheme] = useState(
    typeof window !== "undefined" ? localStorage.getItem("theme") || "winter" : "winter"
  );

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "winter" ? "night" : "winter"));
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800/80 shadow-sm text-slate-800 dark:text-slate-100 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo & Links */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-1.5 transition-transform duration-300 active:scale-95">
              <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 tracking-tight">
                ArtGal
              </span>
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <Link to="/galary" className="text-slate-600 hover:text-slate-800 dark:text-slate-300 dark:hover:text-white font-semibold text-sm transition-all">
                Gallery
              </Link>
              <Link to="/blogs" className="text-slate-600 hover:text-slate-800 dark:text-slate-300 dark:hover:text-white font-semibold text-sm transition-all">
                Blogs
              </Link>
              <Link to="/contact" className="text-slate-600 hover:text-slate-800 dark:text-slate-300 dark:hover:text-white font-semibold text-sm transition-all">
                Contact
              </Link>
            </div>
          </div>

          {/* User Profile & Actions */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="btn btn-ghost btn-circle text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-all duration-300"
              title={theme === "winter" ? "Switch to Dark Mode" : "Switch to Light Mode"}
            >
              {theme === "winter" ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m2.828 9.9a5 5 0 117.072 0l-.707-.707M6.343 6.343l-.707-.707m12.728 12.728l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                </svg>
              )}
            </button>

            {/* Search Trigger */}
            <button
              onClick={() => window.dispatchEvent(new Event("toggle-command-palette"))}
              className="flex items-center gap-2 px-3 py-1.5 text-slate-400 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-700/80 hover:text-slate-600 dark:hover:text-slate-200 rounded-xl border border-slate-200/60 dark:border-slate-700/50 transition-all text-sm group cursor-pointer"
              title="Search (Cmd + K)"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="hidden sm:inline text-xs font-semibold text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200">Search...</span>
              <kbd className="hidden md:inline-flex items-center justify-center text-[9px] font-sans bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-1.5 py-0.5 rounded shadow-sm leading-none text-slate-400 font-bold">⌘K</kbd>
            </button>

            {isAuthenticated ? (
              <div className="dropdown dropdown-end">
                <label
                  tabIndex={0}
                  className="btn btn-ghost btn-circle avatar online shadow-sm hover:shadow transition-all"
                >
                  <div className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-700">
                    <img src={user?.avatar?.url} alt={user?.name || "avatar"} className="object-cover" />
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="p-2 mt-3 shadow-xl menu menu-compact dropdown-content bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl w-52 z-[100] text-slate-800 dark:text-slate-200"
                >
                  <li className="px-4 py-2 border-b border-slate-50 dark:border-slate-700">
                    <span className="block text-slate-800 dark:text-slate-100 font-extrabold text-sm line-clamp-1 truncate p-0">
                      {user?.name}
                    </span>
                    <span className="block text-slate-400 dark:text-slate-400 text-xs font-medium line-clamp-1 truncate p-0">
                      {user?.email}
                    </span>
                  </li>
                  <li>
                    <Link to="/myprofile" className="font-semibold text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 mt-1">
                      My Profile
                    </Link>
                  </li>
                  {user?.role === "admin" && (
                    <li>
                      <Link to="/admin" className="font-semibold text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950/40">
                        Admin Dashboard
                      </Link>
                    </li>
                  )}
                  <li>
                    <Link to="/post/create" className="font-semibold text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/40">
                      Upload Artwork
                    </Link>
                  </li>
                  <li className="border-t border-slate-50 dark:border-slate-700 mt-1 pt-1">
                    <Link to="/logout" className="font-semibold text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 hover:bg-rose-50 dark:hover:bg-rose-950/40">
                      Logout
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <Link
                to="/login"
                className="btn btn-primary btn-sm px-5 py-2 rounded-xl shadow-md hover:shadow-lg transition-all"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
