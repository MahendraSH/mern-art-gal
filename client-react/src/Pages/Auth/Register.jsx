import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../actions/userActions";
import avatardemo from "../../image/Screenshot 2023-06-05 082130.png";
import Loading from "../../components/Layout/Loading";
import { enqueueSnackbar } from "notistack";
const Registor = () => {
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [avatar, setAvatar] = useState(avatardemo);
  const { name, email, password } = user;

  const registerDataChange = (e) => {
    enqueueSnackbar("avatar size less then 100 kb ", { variant: "info" });
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  const onSubmitRegistoHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("avatar", avatar);
    console.log(avatar);
    dispatch(register(formData));
  };
  const history = useNavigate();
  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch({ type: "clearErrors" });
    }
    if (isAuthenticated) {
      // enqueueSnackbar("Registation Successfull", { variant: "success" });
      // dispatch({ type: "clearErrors" });
      history("/myprofile");
    }
  }, [dispatch, isAuthenticated, error, history]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="min-h-screen hero bg-base-200">
          <div className="flex-col hero-content ">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl font-bold">
                Register now! Welcome to ArtGal
              </h1>
            </div>
            <div className="flex-shrink-0 w-full max-w-sm shadow-2xl card bg-base-100">
              <div className="shadow-xl card-body shadow-base-content">
                <form onSubmit={onSubmitRegistoHandler}>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">name</span>
                    </label>
                    <input
                      type="text"
                      placeholder="name"
                      className="input input-bordered"
                      required={true}
                      value={name}
                      onChange={(e) =>
                        setUser({ ...user, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Email</span>
                    </label>
                    <input
                      type="email"
                      placeholder="email"
                      className="input input-bordered"
                      required={true}
                      value={email}
                      onChange={(e) =>
                        setUser({ ...user, email: e.target.value })
                      }
                    />
                  </div>

                  <div className="form control">
                    <label className="label">
                      <span className="label-text"> avatar</span>
                    </label>{" "}
                    <input
                      type="file"
                      name="avatar"
                      accept="image/*"
                      onChange={registerDataChange}
                      className="w-full max-w-xs file-input file-input-bordered file-input-primary"
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Password</span>
                    </label>
                    <input
                      type="password"
                      placeholder="password"
                      className="input input-bordered"
                      required={true}
                      value={password}
                      onChange={(e) =>
                        setUser({ ...user, password: e.target.value })
                      }
                    />
                    <label className="label">
                      <Link
                        to="/forgot"
                        className="label-text-alt link link-hover"
                      >
                        Forgot password?
                      </Link>
                      <Link
                        to="/login"
                        className="label-text-alt link link-hover"
                      >
                        login user
                      </Link>
                    </label>
                  </div>
                  <div className="mt-6 form-control">
                    <button className="btn btn-primary">register</button>
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

export default Registor;
