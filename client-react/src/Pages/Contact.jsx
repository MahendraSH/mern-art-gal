import { useState } from "react";
import { Link } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import modernArtGallery from "../image/modern_art_gallery.jpg";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [copiedText, setCopiedText] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Full Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+?[0-9\s-]{8,15}$/.test(formData.phone.replace(/\s+/g, ""))) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      enqueueSnackbar("Please correct the errors in the form.", { variant: "error" });
      return;
    }

    setIsSubmitting(true);

    // Simulate API request to backend
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      enqueueSnackbar("Thank you! Your message has been sent successfully.", {
        variant: "success",
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
      setErrors({});
    }, 1500);
  };

  const handleCopy = (text, label) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    enqueueSnackbar(`${label} copied to clipboard!`, {
      variant: "info",
      autoHideDuration: 2000,
    });
    setTimeout(() => setCopiedText(""), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-fuchsia-50/20 to-indigo-100/40 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden flex flex-col justify-center animate-fade-in">
      {/* Background Decorative Blobs */}
      <div className="absolute top-1/4 -left-36 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-1/4 -right-36 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100/60 text-indigo-600 text-xs font-bold uppercase tracking-wider shadow-sm">
            🎨 Connect With Us
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-800 tracking-tight">
            Let's Talk About{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
              Art & Inspiration
            </span>
          </h1>
          <p className="text-lg text-slate-500 font-medium leading-relaxed">
            Have questions about a masterpiece, interested in showcasing your art, or just want to say hello? Drop us a line.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Info & Artwork Showcase (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            {/* Info Cards */}
            <div className="space-y-4">
              {/* Email Card */}
              <div className="flex items-center p-4 bg-white/70 backdrop-blur-md rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group">
                <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mr-4 transition-transform group-hover:scale-110">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex-grow min-w-0">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Email Us</p>
                  <a href="mailto:hello@artgal.com" className="text-sm sm:text-base font-bold text-slate-700 hover:text-indigo-600 transition-colors block truncate">
                    hello@artgal.com
                  </a>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy("hello@artgal.com", "Email")}
                  className="p-2 text-slate-400 hover:text-indigo-600 rounded-lg hover:bg-indigo-50/50 transition-colors mr-2 cursor-pointer"
                  title="Copy email to clipboard"
                >
                  {copiedText === "Email" ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                  )}
                </button>
              </div>

              {/* Phone Card */}
              <div className="flex items-center p-4 bg-white/70 backdrop-blur-md rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group">
                <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mr-4 transition-transform group-hover:scale-110">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div className="flex-grow min-w-0">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Call Us</p>
                  <a href="tel:+18005550199" className="text-sm sm:text-base font-bold text-slate-700 hover:text-purple-600 transition-colors block truncate">
                    +1 (800) 555-0199
                  </a>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy("+18005550199", "Phone")}
                  className="p-2 text-slate-400 hover:text-purple-600 rounded-lg hover:bg-purple-50/50 transition-colors mr-2 cursor-pointer"
                  title="Copy phone to clipboard"
                >
                  {copiedText === "Phone" ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                  )}
                </button>
              </div>

              {/* Location Card */}
              <div className="flex items-center p-4 bg-white/70 backdrop-blur-md rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group">
                <div className="w-12 h-12 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center mr-4 transition-transform group-hover:scale-110">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="flex-grow min-w-0">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Visit Gallery</p>
                  <p className="text-sm sm:text-base font-bold text-slate-700 truncate">
                    742 Creative Blvd, New York, NY
                  </p>
                </div>
              </div>
            </div>

            {/* Premium Art Frame Showcase */}
            <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white backdrop-blur-sm bg-white/20 transition-all duration-500 hover:scale-[1.02] group">
              <img
                src={modernArtGallery}
                alt="ArtGal Showroom Interior"
                className="object-cover w-full h-[280px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex flex-col justify-end p-6 text-white opacity-90 transition-opacity duration-300 group-hover:opacity-100">
                <p className="text-xs font-bold uppercase tracking-wider text-pink-300">ArtGal Central Exhibition</p>
                <h3 className="text-lg font-extrabold mt-1">Our Showcase Space</h3>
                <p className="text-xs text-slate-200 mt-0.5 font-medium">Experience physical masterpieces in our Soho showroom.</p>
              </div>
            </div>
          </div>

          {/* Right Column: Glassmorphic Interactive Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white/80 backdrop-blur-md border border-white/50 shadow-xl rounded-3xl p-6 sm:p-8 lg:p-10 transition-all duration-300">
              {isSuccess ? (
                <div className="text-center py-12 space-y-6">
                  <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-emerald-500 border border-emerald-100 shadow-sm animate-bounce">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-slate-800">Message Received!</h3>
                    <p className="text-slate-500 font-medium max-w-sm mx-auto">
                      Thank you for reaching out to ArtGal. A gallery curator will respond to your inquiry via email shortly.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
                    <button
                      onClick={() => setIsSuccess(false)}
                      className="btn btn-outline border-slate-200 hover:bg-slate-50 text-slate-600 hover:text-slate-800 font-bold px-6 py-2.5 rounded-xl transition-all text-sm cursor-pointer"
                    >
                      Send Another Message
                    </button>
                    <Link
                      to="/galary"
                      className="btn btn-primary bg-indigo-600 hover:bg-indigo-700 border-none text-white font-bold px-6 py-2.5 rounded-xl transition-all text-sm flex items-center justify-center cursor-pointer shadow-md hover:shadow-lg"
                    >
                      Explore Gallery
                    </Link>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-1.5">
                    <h3 className="text-xl font-bold text-slate-800">Send us a Message</h3>
                    <p className="text-sm text-slate-500 font-medium">Fill out the details below and we will get back to you.</p>
                  </div>

                  {/* Name Input */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                      Full Name
                    </label>
                    <div className="relative rounded-xl shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Vincent van Gogh"
                        disabled={isSubmitting}
                        className={`w-full pl-11 pr-4 py-3 bg-slate-50/50 hover:bg-slate-100/50 focus:bg-white rounded-xl border ${
                          errors.name ? "border-red-400 focus:ring-red-400 focus:border-red-400" : "border-slate-200 focus:ring-indigo-500 focus:border-indigo-500"
                        } focus:outline-none focus:ring-2 transition-all text-slate-800 font-medium placeholder-slate-400 text-sm`}
                      />
                    </div>
                    {errors.name && (
                      <p className="text-xs text-red-500 font-bold flex items-center gap-1 mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email Input */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                      Email Address
                    </label>
                    <div className="relative rounded-xl shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="e.g. vincent@starrynight.com"
                        disabled={isSubmitting}
                        className={`w-full pl-11 pr-4 py-3 bg-slate-50/50 hover:bg-slate-100/50 focus:bg-white rounded-xl border ${
                          errors.email ? "border-red-400 focus:ring-red-400 focus:border-red-400" : "border-slate-200 focus:ring-indigo-500 focus:border-indigo-500"
                        } focus:outline-none focus:ring-2 transition-all text-slate-800 font-medium placeholder-slate-400 text-sm`}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-xs text-red-500 font-bold flex items-center gap-1 mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Phone Input */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                      Phone Number
                    </label>
                    <div className="relative rounded-xl shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="e.g. +1 (555) 839-2041"
                        disabled={isSubmitting}
                        className={`w-full pl-11 pr-4 py-3 bg-slate-50/50 hover:bg-slate-100/50 focus:bg-white rounded-xl border ${
                          errors.phone ? "border-red-400 focus:ring-red-400 focus:border-red-400" : "border-slate-200 focus:ring-indigo-500 focus:border-indigo-500"
                        } focus:outline-none focus:ring-2 transition-all text-slate-800 font-medium placeholder-slate-400 text-sm`}
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-xs text-red-500 font-bold flex items-center gap-1 mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* Message Input */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                      Message
                    </label>
                    <div className="relative rounded-xl shadow-sm">
                      <div className="absolute top-3.5 left-3.5 pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                      </div>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Describe your inquiry, request, or comment here..."
                        disabled={isSubmitting}
                        className={`w-full pl-11 pr-4 py-3 bg-slate-50/50 hover:bg-slate-100/50 focus:bg-white rounded-xl border ${
                          errors.message ? "border-red-400 focus:ring-red-400 focus:border-red-400" : "border-slate-200 focus:ring-indigo-500 focus:border-indigo-500"
                        } focus:outline-none focus:ring-2 transition-all text-slate-800 font-medium placeholder-slate-400 text-sm resize-none`}
                      />
                    </div>
                    {errors.message && (
                      <p className="text-xs text-red-500 font-bold flex items-center gap-1 mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full relative flex justify-center items-center py-3.5 px-4 border border-transparent rounded-xl shadow-lg hover:shadow-xl text-sm font-extrabold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all transform hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-85 disabled:cursor-not-allowed group cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending Inquiry...
                      </>
                    ) : (
                      <>
                        Send Message
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1.5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
