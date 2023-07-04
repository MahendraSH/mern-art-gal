import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { clearErrors, getPostDetails } from "../../actions/blogActions";
import { enqueueSnackbar } from "notistack";
import Loading from "../../components/Layout/Loading";
const GalaryByid = () => {
  const { id } = useParams();

  const { error, loading, post } = useSelector((state) => state.blogs);

  const dispatch = useDispatch();
  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch(clearErrors());
    }
    dispatch(getPostDetails(id));
  }, [dispatch, error, id]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div>
          {console.log(post?.galary.image.url)}
          <div
            className="hero min-h-screen"
            style={{ backgroundImage: `url(${post?.galary.image.url})` }}
          >
            <div className="hero-overlay bg-gradient-to-br from-black  opacity-10"></div>
            <div className="hero-content text-center text-neutral-content">
              <div className="max-w-md">

              </div>
            </div>
          </div>
          <h1 className="text-5xl text-center my-4 bg-base-200 p-2 rounded-sm shadow-sm shadow-gray-700 first-letter:capitalize">
            {post?.galary.title}
          </h1>

          <div className="container mx-auto px-10 rounded-lg bg-orange-200  py-3 my-10 shadow-lg shadow-gray-900 ">
            <p>{post?.galary.discription}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default GalaryByid;
