import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import {  logout } from "../../actions/userActions";
import Loading from "../../components/Layout/Loading";
const Logout = () => {
  const history = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(logout());
    history("/");
  }, [dispatch, history]);
  return (
    <div>
      <Loading />
    </div>
  );
};

export default Logout;
