import { Link } from "react-router-dom";


const PageNotFound = () => {
  return (
    <>
      {/*  page  not found */}
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <Link to="/" className=" font-normal btn  bg-slate-100 capitalize">
              404 |<span>This page could not be found</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageNotFound;
