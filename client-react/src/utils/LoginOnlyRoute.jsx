import React from "react";
import {  Outlet ,useNavigate } from "react-router-dom";
import Loading from "../components/Layout/Loading";
import { useEffect } from "react";
const LoginOnlyRoute = ({loading, isAuthenticated, checkAdmin, user }) => {
   const history = useNavigate();
   useEffect(() => {
     // if (loading) {
     //   return <div>Loading...</div>;
     // } else {
     if (!isAuthenticated) {
       history("/login");
     }
     if (checkAdmin && loading === false) {
       if (user.user.role !== "admin") history("/");
     }
     // }
   }, [isAuthenticated, loading, checkAdmin, user, history]);

   return <>{loading ? <Loading /> : <Outlet  />}</>;
};

export default LoginOnlyRoute;
