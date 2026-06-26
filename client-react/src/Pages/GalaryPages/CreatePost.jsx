import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, createPost } from "../../actions/blogActions";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Layout/Loading";

const CreatePost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, message, loading } = useSelector((state) => state.blogs);
  const [post, setPost] = useState({
    title: "",
    discription: "",
    category: "Digital Art",
  });
  const { title, discription, category } = post;
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const setTargetImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 200 * 1024) {
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
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch(clearErrors());
    }
    if (message) {
      enqueueSnackbar(message, { variant: "success" });
      dispatch(clearErrors());
      navigate("/galary");
    }
  }, [dispatch, error, message, navigate]);

  const onSubmitRegistoHandler = (e) => {
    e.preventDefault();
    if (!file) {
      enqueueSnackbar("Please upload an image", { variant: "error" });
      return;
    }
    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);
    formData.append("discription", discription);
    formData.append("category", category);
    dispatch(createPost(formData));
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="min-h-screen bg-gradient-to-tr from-slate-200 via-fuchsia-50 to-cyan-100 flex justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
            <div className="text-center">
              <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Upload Artwork</h1>
              <p className="text-sm text-slate-500 mt-1">Showcase your creation to the creative community</p>
            </div>
            
            <form onSubmit={onSubmitRegistoHandler} className="space-y-6">
              <div className="form-control">
                <label className="label py-1">
                  <span className="label-text font-bold text-slate-600">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter artwork title"
                  className="input input-bordered w-full rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  value={title}
                  onChange={(e) => setPost({ ...post, title: e.target.value })}
                  required
                />
              </div>

              <div className="form-control">
                <label className="label py-1">
                  <span className="label-text font-bold text-slate-600">Category</span>
                </label>
                <select
                  className="select select-bordered w-full rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  value={category}
                  onChange={(e) => setPost({ ...post, category: e.target.value })}
                >
                  <option value="Digital Art">Digital Art</option>
                  <option value="Painting">Painting</option>
                  <option value="Sculpture">Sculpture</option>
                  <option value="Photography">Photography</option>
                  <option value="Sketch">Sketch</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="form-control">
                <label className="label py-1">
                  <span className="label-text font-bold text-slate-600">Description</span>
                </label>
                <textarea
                  className="textarea textarea-bordered h-28 w-full rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                  placeholder="Tell us about your artwork, inspiration, medium..."
                  value={discription}
                  onChange={(e) => setPost({ ...post, discription: e.target.value })}
                  required
                ></textarea>
              </div>

              <div className="form-control">
                <label className="label py-1">
                  <span className="label-text font-bold text-slate-600">Artwork Image</span>
                </label>
                <div className="flex flex-col items-center gap-4">
                  {imagePreview && (
                    <div className="w-full h-48 rounded-xl overflow-hidden shadow-md border border-slate-200">
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <input
                    type="file"
                    required={!file}
                    accept="image/*"
                    onChange={setTargetImage}
                    className="w-full file-input file-input-bordered file-input-primary rounded-xl"
                  />
                  <span className="text-xs text-slate-400 font-medium">
                    Please use images under 200KB
                  </span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full btn btn-primary py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform active:scale-[0.98]"
              >
                Publish Artwork
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CreatePost;
