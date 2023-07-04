import { Link, useNavigate, useLocation, redirect } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { login, clearErrors } from "../../actions/userActions";
import Loading from "../../components/Layout/Loading";
import { useEffect } from "react";
import { enqueueSnackbar } from "notistack";
const Login = () => {
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const schema = yup.object().shape({
    email: yup.string().email().required("Email is required"),
    password: yup.string().min(6).max(20).required("Password is required"),
  });
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    dispatch(login(data.email, data.password));
  };

  const history = useNavigate();
 const location = useLocation();
  const redirect = location.search
    ? location.search.split("=")[1]
    : "/myprofile";
  useEffect(() => {

    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
     
      history(redirect);
    }
  }, [dispatch, error, isAuthenticated, history,redirect]);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="min-h-screen shadow-xl hero bg-base-200 shadow-base-content">
            <div className="flex-col hero-content ">
              <div className="text-center lg:text-left ">
                <h1 className="text-5xl font-bold para ">Welcome Again !!</h1>
              </div>
              <div className="flex-shrink-0 w-full max-w-sm card bg-base-100">
                <div className="shadow-xl card-body shadow-base-content">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Email</span>
                      </label>
                      <input
                        type="email"
                        placeholder="email"
                        className="input input-bordered"
                        {...register("email")}
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
                        {...register("password")}
                      />
                      <label className="label">
                        <Link
                          to="/forgot"
                          className="label-text-alt link link-hover"
                        >
                          Forgot password?
                        </Link>
                      </label>
                    </div>
                    <div className="mt-6 form-control">
                      <button type="submit" className="btn btn-primary">
                        Login
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Login;
