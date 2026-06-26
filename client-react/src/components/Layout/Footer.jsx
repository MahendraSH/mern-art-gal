import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="relative bg-slate-900 text-slate-400 overflow-hidden mt-auto border-t border-slate-800">
      {/* Decorative top gradient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand section */}
          <div className="space-y-4 md:col-span-1">
            <Link to="/" className="inline-flex items-center gap-2 group">
              <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400 tracking-tight transition-all duration-300 group-hover:scale-105">
                ArtGal
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              A curated platform for digital artists, sculptors, painters, and creative visionaries from around the globe to display and discover breathtaking art.
            </p>
            {/* Social / Portfolio Links */}
            <div className="flex gap-4 pt-2">
              <a
                href="https://mahendrash.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-slate-800 hover:bg-indigo-600 hover:text-white transition-all duration-300 shadow-sm"
                title="Creator's Resume & Portfolio"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-slate-800 hover:bg-indigo-600 hover:text-white transition-all duration-300 shadow-sm"
              >
                <svg
                  fill="currentColor"
                  className="w-4.5 h-4.5"
                  viewBox="0 0 24 24"
                >
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                </svg>
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-slate-800 hover:bg-indigo-600 hover:text-white transition-all duration-300 shadow-sm"
              >
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4.5 h-4.5"
                  viewBox="0 0 24 24"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-sm tracking-wider uppercase">Explore</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/galary" className="hover:text-white hover:underline transition-all">
                  Gallery Showcase
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white hover:underline transition-all">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white hover:underline transition-all">
                  About Platform
                </Link>
              </li>
            </ul>
          </div>

          {/* Actions */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-sm tracking-wider uppercase">Actions</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/post/create" className="hover:text-white hover:underline transition-all">
                  Upload Artwork
                </Link>
              </li>
              <li>
                <Link to="/myprofile" className="hover:text-white hover:underline transition-all">
                  My Profile
                </Link>
              </li>
              <li>
                <button
                  onClick={() => window.dispatchEvent(new Event("toggle-command-palette"))}
                  className="hover:text-white hover:underline text-left transition-all flex items-center gap-1.5"
                >
                  <span>Command Menu</span>
                  <kbd className="text-[10px] font-sans bg-slate-800 border border-slate-700 px-1 py-0.2 rounded text-slate-400">⌘K</kbd>
                </button>
              </li>
            </ul>
          </div>

          {/* Creator Info */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-sm tracking-wider uppercase">Developer</h3>
            <div className="p-4 bg-slate-800/40 border border-slate-800 rounded-xl space-y-3">
              <p className="text-xs leading-relaxed text-slate-400">
                This project is crafted by <strong className="text-white">Mahendra</strong>. Check out my full resume and portfolio.
              </p>
              <a
                href="https://mahendrash.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 font-bold uppercase tracking-wider group"
              >
                View My Resume
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom border & Copy right */}
        <div className="pt-8 mt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} ArtGal. Built with ❤️ and dedication.</p>
          <div className="flex gap-4">
            <a
              href="https://mahendrash.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-all underline decoration-indigo-500 underline-offset-4"
            >
              Mahendra's Portfolio
            </a>
            <span>•</span>
            <span className="text-slate-500">All Rights Reserved</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
