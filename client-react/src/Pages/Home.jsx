import { Link } from "react-router-dom";


const Home = () => {
  return (
    <>
      <section className="text-gray-600 bg-gradient-to-tr from-slate-300 via-fuchsia-50 to-cyan-100 ">
        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium  bg-clip-text text-transparent bg-gradient-to-l from-slate-400 to-violet-600">
              {" "}
              Art Gal
              <br className="hidden lg:inline-block" />- A Gallery for the
              Curious and Creative
            </h1>
            <p className="mb-8 leading-relaxed  text-lg">
              Discover Your Inner Artist And showcase your work to world
            </p>
            <div className="flex justify-center">
              <Link
                to="/post/create"
                className="btn btn-secondary bg-origin-border"
              >
                Get Started
              </Link>
            </div>
          </div>
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
            <img
              className="object-cover object-center rounded"
              alt="hero"
              src="https://res.cloudinary.com/dranaclni/image/upload/v1685855048/cenIN/Recording_2023-06-04_102525_AdobeExpress_ybwclf.gif"
              width={720}
              height={600}
            />
          </div>
        </div>
      </section>{" "}
    </>
  );
};

export default Home;
