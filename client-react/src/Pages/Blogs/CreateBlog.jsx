import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import axios from "axios";

const CreateBlog = () => {
  const navigate = useNavigate();
  const api = import.meta.env.VITE_APP_API_URL;
  axios.defaults.withCredentials = true;

  const [blog, setBlog] = useState({
    title: "",
    content: "",
    category: "Art Guide",
  });
  const { title, content, category } = blog;
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    if (selectedFile.size > 200 * 1024) {
      enqueueSnackbar("Image size should be less than 200KB", { variant: "warning" });
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setFile(reader.result);
        setImagePreview(reader.result);
      }
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      enqueueSnackbar("Please upload a cover image", { variant: "error" });
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${api}/blog/create`, {
        title,
        content,
        category,
        file
      });
      enqueueSnackbar(response.data.message || "Blog article published!", { variant: "success" });
      navigate("/blogs");
    } catch (err) {
      enqueueSnackbar(err.response?.data?.message || "Failed to publish article", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-slate-200 via-fuchsia-50 to-cyan-100 flex justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8 bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Write Article</h1>
          <p className="text-sm text-slate-500 mt-1">Publish an art guide, tutorial, news, or blog post</p>
        </div>

        {loading ? (
          <div className="flex flex-col justify-center items-center h-64 space-y-4">
            <span className="loading loading-spinner loading-lg text-primary"></span>
            <span className="text-sm font-semibold text-slate-500">Uploading cover artwork and content...</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label py-1">
                <span className="label-text font-bold text-slate-600">Title</span>
              </label>
              <input
                type="text"
                placeholder="Enter article title"
                className="input input-bordered w-full rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-semibold text-slate-800"
                value={title}
                onChange={(e) => setBlog({ ...blog, title: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label py-1">
                  <span className="label-text font-bold text-slate-600">Category</span>
                </label>
                <select
                  className="select select-bordered w-full rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-semibold"
                  value={category}
                  onChange={(e) => setBlog({ ...blog, category: e.target.value })}
                >
                  <option value="Art Guide">Art Guide</option>
                  <option value="Tutorial">Tutorial</option>
                  <option value="Exhibition">Exhibition</option>
                  <option value="News">News</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="form-control">
                <label className="label py-1">
                  <span className="label-text font-bold text-slate-600">Cover Image</span>
                </label>
                <input
                  type="file"
                  required
                  accept="image/*"
                  onChange={handleImageChange}
                  className="file-input file-input-bordered file-input-primary w-full rounded-xl"
                />
              </div>
            </div>

            {imagePreview && (
              <div className="w-full h-64 rounded-2xl overflow-hidden shadow-md border border-slate-200">
                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}

            <div className="form-control">
              <label className="label py-1">
                <span className="label-text font-bold text-slate-600">Content</span>
              </label>
              <textarea
                className="textarea textarea-bordered h-60 w-full rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none text-slate-700"
                placeholder="Write your article here..."
                value={content}
                onChange={(e) => setBlog({ ...blog, content: e.target.value })}
                required
              ></textarea>
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => navigate("/blogs")}
                className="btn btn-outline flex-1 rounded-xl py-3 border-slate-300 text-slate-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary flex-1 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                Publish Article
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default CreateBlog;
