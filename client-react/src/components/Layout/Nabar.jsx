import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  return (
    <>
      <nav>
        <div className="navbar bg-base-200   shadow-base-content  mb-[0.37rem] shadow-md box-border    pb-0 pt-0 mt-0 ">
          <div className="flex-1">
            <div className="dropdown  z-50">
              <label tabIndex={0} className="btn btn-ghost ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </label>
              <ul
                tabIndex={0}
                className="shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link to="/contact">Contact</Link>
                </li>

                <li>
                  <Link to="/galary">Gallery</Link>
                </li>
              </ul>
            </div>

            <Link to="/" className="normal-case btn btn-ghost ">
              <span className="text-lg font-medium text-secondary">ArtGal</span>
            </Link>
            <div className="hidden navbar-end lg:flex">
              <ul className="px-1 menu menu-horizontal">
                <li>
                  <Link to="/contact">Contact</Link>
                </li>

                <li>
                  <Link to="/galary">Gallery</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex-none px-3" id="login profile ">
            {isAuthenticated ? (
              <div className="dropdown dropdown-end z-50">
                <label
                  tabIndex={0}
                  className="btn btn-ghost btn-circle avatar online "
                >
                  <div className="w-10 rounded-full">
                    <img src={user.avatar.url} alt="avtar" />
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="p-2 mt-3 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
                >
                  <li>
                    <Link to="/myprofile" className="justify-between">
                      Profile
                      <span className="badge">New</span>
                    </Link>
                  </li>
                  {user.role === "admin" ? (
                    <li>
                      <Link to="/admin">Admin dashboard</Link>
                    </li>
                  ) : null}
                  <li>
                    <Link to="/post/create"> Create post</Link>
                  </li>
                  <li>
                    <Link to="/logout">Logout</Link>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="navbar-end">
                <Link to="/login" className="lowercase btn btn-sm ">
                  login
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
