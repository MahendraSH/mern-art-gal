import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../../actions/blogActions";

const CommandPalette = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.blogs);
  const { isAuthenticated } = useSelector((state) => state.user);

  const inputRef = useRef(null);
  const paletteRef = useRef(null);

  // Toggle Command Palette
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    const handleCustomToggle = () => {
      setIsOpen((prev) => !prev);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("toggle-command-palette", handleCustomToggle);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("toggle-command-palette", handleCustomToggle);
    };
  }, []);

  // Fetch posts if they are not loaded when palette opens
  useEffect(() => {
    if (isOpen) {
      setSearchQuery("");
      setSelectedIndex(0);
      // Auto-focus input
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);

      if (!posts || !posts.galary) {
        dispatch(getAllPosts());
      }
    }
  }, [isOpen, posts, dispatch]);

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (paletteRef.current && !paletteRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Define static actions/pages
  const navigationItems = [
    {
      title: "Go to Home",
      description: "Return to the main homepage",
      path: "/",
      category: "Navigation",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    {
      title: "Browse Gallery",
      description: "Explore all artworks and designs",
      path: "/galary",
      category: "Navigation",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: "Contact Us",
      description: "Get in touch with the creator",
      path: "/contact",
      category: "Navigation",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L22 8m-2 5v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4z" />
        </svg>
      )
    },
    ...(isAuthenticated
      ? [
          {
            title: "Upload Artwork",
            description: "Share your masterpiece with the world",
            path: "/post/create",
            category: "Actions",
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )
          },
          {
            title: "My Profile",
            description: "View and edit your profile settings",
            path: "/myprofile",
            category: "Actions",
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            )
          },
          {
            title: "Logout",
            description: "Sign out of your account",
            path: "/logout",
            category: "Actions",
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            )
          }
        ]
      : [
          {
            title: "Login",
            description: "Sign in to access gallery features",
            path: "/login",
            category: "Actions",
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            )
          }
        ]),
    {
      title: "View Creator Resume",
      description: "Visit Mahendra's professional resume portfolio",
      url: "https://mahendrash.vercel.app/",
      category: "Developer Info",
      external: true,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      )
    }
  ];

  // Dynamic Artwork Items from Redux
  const artworkItems = (posts?.galary || []).map((post) => ({
    title: post.title || "Untitled Artwork",
    description: `Artwork by ${post.user?.name || "Artist"} • Category: ${post.category || "General"}`,
    path: `/galary/${post._id}`,
    category: "Artworks",
    img: post.images?.[0]?.url || "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=150&auto=format&fit=crop",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    )
  }));

  // Combine items for searching
  const allItems = [...navigationItems, ...artworkItems];

  // Filter items based on query
  const filteredItems = allItems.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Navigate or execute selection
  const handleSelect = (item) => {
    setIsOpen(false);
    if (item.external) {
      window.open(item.url, "_blank", "noopener,noreferrer");
    } else {
      navigate(item.path);
    }
  };

  // Keyboard navigation inside list
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredItems.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          handleSelect(filteredItems[selectedIndex]);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredItems, selectedIndex]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-start justify-center pt-[15vh] px-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={() => setIsOpen(false)}
      />

      {/* Palette Container */}
      <div
        ref={paletteRef}
        className="relative w-full max-w-xl bg-white/95 rounded-2xl shadow-2xl border border-slate-100/80 overflow-hidden transform transition-all duration-300 flex flex-col max-h-[50vh] dark:bg-slate-900 dark:border-slate-800"
      >
        {/* Search Input */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-100 dark:border-slate-800">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            className="w-full bg-transparent border-0 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-0 text-base dark:text-slate-100"
            placeholder="Type a command or search artworks..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setSelectedIndex(0);
            }}
          />
          <span className="text-[10px] font-medium text-slate-400 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-1.5 py-0.5 rounded shadow-sm">
            ESC
          </span>
        </div>

        {/* Search Results */}
        <div className="flex-1 overflow-y-auto py-2 scrollbar-thin">
          {filteredItems.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-slate-400 text-sm font-medium">No results found for "{searchQuery}"</p>
            </div>
          ) : (
            <div>
              {/* Group items by category */}
              {Object.entries(
                filteredItems.reduce((acc, item) => {
                  if (!acc[item.category]) acc[item.category] = [];
                  acc[item.category].push(item);
                  return acc;
                }, {})
              ).map(([category, items]) => (
                <div key={category} className="mb-2">
                  <div className="px-4 py-1.5 text-[11px] font-bold text-indigo-500 uppercase tracking-wider bg-slate-50/50 dark:bg-slate-800/30">
                    {category}
                  </div>
                  <div className="px-2 mt-1 space-y-0.5">
                    {items.map((item) => {
                      const absoluteIndex = filteredItems.indexOf(item);
                      const isSelected = absoluteIndex === selectedIndex;
                      return (
                        <button
                          key={item.path || item.url}
                          onClick={() => handleSelect(item)}
                          onMouseEnter={() => setSelectedIndex(absoluteIndex)}
                          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-150 ${
                            isSelected
                              ? "bg-indigo-50 text-indigo-900 dark:bg-indigo-950/40 dark:text-indigo-200 border-l-4 border-indigo-500"
                              : "text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800/50 border-l-4 border-transparent"
                          }`}
                        >
                          <div className={`p-1.5 rounded-lg flex-shrink-0 ${
                            isSelected 
                              ? "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/60 dark:text-indigo-400" 
                              : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                          }`}>
                            {item.img ? (
                              <img src={item.img} alt={item.title} className="w-5 h-5 object-cover rounded-md" />
                            ) : (
                              item.icon
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-sm truncate">{item.title}</div>
                            <div className={`text-xs truncate ${isSelected ? "text-indigo-500/80" : "text-slate-400"}`}>
                              {item.description}
                            </div>
                          </div>
                          {item.external && (
                            <span className="text-[10px] text-indigo-500 font-bold bg-indigo-50 dark:bg-indigo-950 px-2 py-0.5 rounded-full uppercase tracking-wider">
                              Resume
                            </span>
                          )}
                          {isSelected && (
                            <span className="text-xs text-indigo-400 font-medium hidden sm:inline">
                              Enter ↵
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 flex items-center justify-between text-xs text-slate-400 font-medium">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <kbd className="bg-white dark:bg-slate-800 px-1 py-0.5 rounded border border-slate-200 dark:border-slate-700">↑↓</kbd> Navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="bg-white dark:bg-slate-800 px-1 py-0.5 rounded border border-slate-200 dark:border-slate-700">Enter</kbd> Select
            </span>
          </div>
          <a
            href="https://mahendrash.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-indigo-600 hover:text-indigo-700 hover:underline transition-all"
          >
            Developed by Mahendra
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;
