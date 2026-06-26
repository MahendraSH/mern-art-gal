import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = () => {
  const { isAuthenticated } = useSelector((state) => state.user);

  return (
    <div className="min-h-screen bg-gradient-to-tr from-slate-200 via-fuchsia-50 to-cyan-100 dark:from-slate-950 dark:via-slate-900 dark:to-neutral-950 flex flex-col justify-between transition-colors duration-300 text-slate-800 dark:text-slate-100">
      {/* Hero Section */}
      <section className="text-gray-600 dark:text-slate-300 py-16 px-4 sm:px-6 lg:px-8 flex-grow flex items-center">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Hero text */}
          <div className="space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/50 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider shadow-sm">
              ✨ Discover and Showcase
            </div>
            <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-800 dark:text-white tracking-tight leading-none">
              Where Art Meets <br className="hidden sm:inline" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400">
                Inspiration
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-500 dark:text-slate-400 max-w-lg mx-auto lg:mx-0 leading-relaxed font-medium">
              Join a global community of creatives. Upload your masterpieces, track your visual metrics, and explore breathtaking artworks.
            </p>
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <Link
                to={isAuthenticated ? "/post/create" : "/login"}
                className="btn btn-primary px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 active:scale-[0.98]"
              >
                Upload Artwork
              </Link>
              <Link
                to="/galary"
                className="btn btn-outline px-8 py-3 rounded-xl border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-800 dark:hover:text-white hover:border-slate-400 dark:hover:border-slate-600 transition-all duration-300"
              >
                Explore Gallery
              </Link>
            </div>
          </div>

          {/* Hero Image Frame */}
          <div className="relative flex justify-center lg:justify-end">
            {/* Background design elements */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-purple-300 dark:bg-purple-900/25 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-pulse"></div>
            <div className="absolute bottom-4 left-4 w-72 h-72 bg-indigo-300 dark:bg-indigo-900/25 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-pulse delay-1000"></div>
            
            <div className="relative max-w-lg w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white/80 dark:border-slate-800/80 backdrop-blur-sm bg-white/10 transition-transform duration-500 hover:scale-[1.01]">
              <img
                className="object-cover object-center w-full h-[400px]"
                alt="Digital art showcase"
                src="https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=800&auto=format&fit=crop"
              />
              <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent text-white">
                <p className="text-xs font-bold uppercase tracking-wider text-indigo-300">Featured Exhibition</p>
                <h3 className="text-xl font-extrabold mt-1">Symphony of Colors</h3>
                <p className="text-sm text-slate-200 mt-1 opacity-90">By Creative Artists</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800/80 py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="text-3xl font-extrabold text-slate-800 dark:text-white tracking-tight">How ArtGal Works</h2>
            <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">Simple steps to kickstart your artistic portfolio showcase</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-slate-50 dark:bg-slate-800/40 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm transition-all duration-300 hover:shadow-md hover:border-slate-200 dark:hover:border-slate-700">
              <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-xl mb-4">
                1
              </div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">Set Up Profile</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">
                Create your account, personalize your profile with a beautiful avatar, and join the creator community.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-slate-50 dark:bg-slate-800/40 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm transition-all duration-300 hover:shadow-md hover:border-slate-200 dark:hover:border-slate-700">
              <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold text-xl mb-4">
                2
              </div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">Upload Artworks</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">
                Instantly upload high-quality snapshots of your work. Tag them with categories so curators can discover them.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-slate-50 dark:bg-slate-800/40 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm transition-all duration-300 hover:shadow-md hover:border-slate-200 dark:hover:border-slate-700">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-xl mb-4">
                3
              </div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">Track Visual Analytics</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">
                Keep track of your artworks' performance. Watch page visits and user views update in real-time.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
