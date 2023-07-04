import GalaryCard from "../../components/Galary/GalaryCard";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import Loading from "../../components/Layout/Loading";
import { getAllPosts, clearErrors } from "../../actions/blogActions";
const Galarys = () => {
  const { error, loading, posts } = useSelector((state) => state.blogs);
  const dispatch = useDispatch();
  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch(clearErrors());
    }
    dispatch(getAllPosts());
  }, [dispatch, error]);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <section className="text-gray-600 body-font   bg-gradient-to-tr from-slate-300 via-fuchsia-50 to-cyan-100">
          <div className="container px-5 py-24 mx-auto">
            <main className="flex flex-wrap -m-4">
              {posts?.galary?.map((item, index) => {
                return <GalaryCard key={index} item={item} />;
              })}
            </main>
          </div>
        </section>
      )}
    </>
  );
};

export default Galarys;
