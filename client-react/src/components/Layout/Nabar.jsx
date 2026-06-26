import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo & Links */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-1.5 transition-transform duration-300 active:scale-95">
              <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 tracking-tight">
                ArtGal
              </span>
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <Link to="/galary" className="text-slate-600 hover:text-slate-800 font-semibold text-sm transition-all">
                Gallery
              </Link>
              <Link to="/blogs" className="text-slate-600 hover:text-slate-800 font-semibold text-sm transition-all">
                Blogs
              </Link>
              <Link to="/contact" className="text-slate-600 hover:text-slate-800 font-semibold text-sm transition-all">
                Contact
              </Link>
            </div>
          </div>

          {/* User Profile & Actions */}
          <div className="flex items-center gap-4">
            {/* Search Trigger */}
            <button
              onClick={() => window.dispatchEvent(new Event("toggle-command-palette"))}
              className="flex items-center gap-2 px-3 py-1.5 text-slate-400 bg-slate-50 hover:bg-slate-100 hover:text-slate-600 rounded-xl border border-slate-200/60 transition-all text-sm group cursor-pointer"
              title="Search (Cmd + K)"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-400 group-hover:text-slate-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="hidden sm:inline text-xs font-semibold text-slate-500 group-hover:text-slate-700">Search...</span>
              <kbd className="hidden md:inline-flex items-center justify-center text-[9px] font-sans bg-white border border-slate-200 px-1.5 py-0.5 rounded shadow-sm leading-none text-slate-400 font-bold">⌘K</kbd>
            </button>

            {isAuthenticated ? (
              <div className="dropdown dropdown-end">
                <label
                  tabIndex={0}
                  className="btn btn-ghost btn-circle avatar online shadow-sm hover:shadow transition-all"
                >
                  <div className="w-10 h-10 rounded-full border border-slate-200">
                    <img src={user?.avatar?.url} alt={user?.name || "avatar"} className="object-cover" />
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="p-2 mt-3 shadow-xl menu menu-compact dropdown-content bg-white border border-slate-100 rounded-2xl w-52 z-[100]"
                >
                  <li className="px-4 py-2 border-b border-slate-50">
                    <span className="block text-slate-800 font-extrabold text-sm line-clamp-1 truncate p-0">
                      {user?.name}
                    </span>
                    <span className="block text-slate-400 text-xs font-medium line-clamp-1 truncate p-0">
                      {user?.email}
                    </span>
                  </li>
                  <li>
                    <Link to="/myprofile" className="font-semibold text-slate-700 hover:text-indigo-600 hover:bg-indigo-50 mt-1">
                      My Profile
                    </Link>
                  </li>
                  {user?.role === "admin" && (
                    <li>
                      <Link to="/admin" className="font-semibold text-slate-700 hover:text-purple-600 hover:bg-purple-50">
                        Admin Dashboard
                      </Link>
                    </li>
                  )}
                  <li>
                    <Link to="/post/create" className="font-semibold text-slate-700 hover:text-indigo-600 hover:bg-indigo-50">
                      Upload Artwork
                    </Link>
                  </li>
                  <li className="border-t border-slate-50 mt-1 pt-1">
                    <Link to="/logout" className="font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50">
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
