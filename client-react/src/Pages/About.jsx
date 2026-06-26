import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-slate-200 via-fuchsia-50 to-cyan-100 dark:from-slate-950 dark:via-slate-900 dark:to-neutral-950 py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300 text-slate-800 dark:text-slate-100 flex flex-col justify-between">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/50 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider shadow-sm">
            ✨ Our Story
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-800 dark:text-white tracking-tight">
            About <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-650 dark:from-indigo-400 dark:to-purple-400">ArtGal</span>
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Bridging the gap between creative expression, technical innovation, and global art curation.
          </p>
        </div>

        {/* Story Card */}
        <section className="bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-100 dark:border-slate-800 transition-colors duration-300 space-y-6">
          <h2 className="text-2xl font-extrabold text-slate-800 dark:text-white">Our Vision</h2>
          <p className="text-slate-600 dark:text-slate-350 leading-relaxed font-medium">
            ArtGal was created as a virtual sanctuary for contemporary creators to share their work, build portfolios, and obtain insight into how audiences interact with their art. Whether you are a digital illustrator, a classical painter, or a sculptor, ArtGal provides a state-of-the-art canvas to showcase your expressions and track your popularity in real-time.
          </p>
          <p className="text-slate-600 dark:text-slate-350 leading-relaxed font-medium">
            We believe that art has the power to inspire, provoke thought, and bring people together. By providing a clean, distraction-free environment, we allow the art to take center stage, creating a premium viewing experience.
          </p>
        </section>

        {/* Feature Highlights */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl transition-colors duration-300 space-y-3">
            <h3 className="text-lg font-bold text-indigo-600 dark:text-indigo-400">For Artists</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
              Upload your high-fidelity artworks, add custom descriptions and tags, curate a personal profile, and review real-time view analytics to understand how viewers interact with your content.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl transition-colors duration-300 space-y-3">
            <h3 className="text-lg font-bold text-purple-600 dark:text-purple-400">For Curators</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
              Explore a curated stream of artworks categorized by styles, leave insightful comments, save favorites to your personalized list, and discover rising artists in our global community.
            </p>
          </div>
        </section>

        {/* CTA */}
        <div className="text-center pt-4">
          <Link to="/galary" className="btn btn-primary px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
            Explore the Gallery
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
