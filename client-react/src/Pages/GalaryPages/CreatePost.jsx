import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, createPost } from "../../actions/blogActions";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Layout/Loading";

const CreatePost = () => {
  const dispatch = useDispatch();

  const { error, message, loading } = useSelector((state) => state.blogs);
  const [post, setPost] = useState({
    title: "",
    discription: "",
  });
  const { title, discription } = post;
  const [file, setFile] = useState(null);
  const setTargetImage = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) setFile(reader.result);
    };

    reader.readAsDataURL(e.target.files[0]);
  };
  const history = useNavigate();
  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch(clearErrors());
      history("/post/create");
    }
    if (message) {
      enqueueSnackbar(message, { variant: "success" });
      dispatch(clearErrors());

      history("/");
    }
  }, [dispatch, error, history]);

  const onSubmitRegistoHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);
    formData.append("discription", discription);
    dispatch(createPost(formData));
    history("/galary");
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="w-full min-h-screen shadow-xl hero bg-base-200 shadow-base-content">
          <div className="flex-col w-full hero-content ">
            <div className="text-center lg:text-left ">
              <h1 className="text-4xl font-bold para ">Create Post</h1>
            </div>
            <div className="flex justify-center p-0mt-2 card bg-base-100">
              <div className="shadow-xl card-body shadow-base-content">
                <form onSubmit={onSubmitRegistoHandler}>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Title :</span>
                    </label>
                    <input
                      type="text"
                      placeholder="title"
                      className="input input-bordered"
                      value={title}
                      onChange={(e) =>
                        setPost({ ...post, title: e.target.value })
                      }
                      required={true}
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Discription:</span>
                    </label>
                    {/* <input
                    type="text"
                    placeholder="Discription of post .....   "
                    className="input input-bordered"
                    value={discription}
                    required={true}
                    onChange={(e) =>
                      setPost({ ...post, discription: e.target.value })
                    }
                  /> */}
                    <textarea
                      className="textarea textarea-primary"
                      placeholder="Discription of post .....   "
                      value={discription}
                      required={true}
                      onChange={(e) =>
                        setPost({ ...post, discription: e.target.value })
                      }
                    ></textarea>
                  </div>

                  <div className="form control">
                    <label className="label">
                    
                      <span className="label-text"> Image :</span>
                    </label>{" "}
                    <input
                      type="file"
                      required={true}
                      accept="image/*"
                      name="file"
                      onChange={setTargetImage}
                      className="w-full max-w-xs file-input file-input-bordered file-input-primary"
                    />{" "}
                  
                    <span className="p-2 rounded-full btext-white bg-info badge">
                      {" "}
                      image less than 200kb
                    </span>
                  </div>

                  <div className="mt-6 form-control">
                    <button type="submit" className="btn btn-primary">
                      create Post
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreatePost;
